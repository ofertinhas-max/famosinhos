import { Router } from 'express';
import { db } from '../db/index.js';
import { requireAdmin } from '../middleware/auth.js';
import { sendTikTokConversion } from '../services/tiktokEventsApi.js';
import { getIpInfo, normalizeEstado } from '../services/ipInfoService.js';

const router = Router();

// POST /api/db/pedidos — checkout da loja (sem requireAdmin)
router.post('/pedidos', async (req, res) => {
  const b = req.body || {};
  const total = Number(b.total) ?? 0;
  const subtotal = Number(b.subtotal) ?? 0;
  const valor_frete = Number(b.valor_frete) ?? 0;
  const desconto = Number(b.desconto) ?? 0;
  const itens = Array.isArray(b.itens) ? b.itens : [];
  const pix_payment_id = b.pix_payment_id || null; // transaction_id do gateway
  
  // Capturar IP do cliente
  const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() 
    || req.headers['x-real-ip'] 
    || req.connection.remoteAddress 
    || req.socket.remoteAddress 
    || null;
  
  console.log('[Pedidos] 🌐 IP do cliente:', clientIp);
  
  // Buscar geolocalização por IP (não bloqueante)
  let ipInfo = null;
  let estadoReal = b.estado_entrega || null;
  
  if (clientIp) {
    try {
      ipInfo = await getIpInfo(clientIp);
      if (ipInfo && ipInfo.region) {
        estadoReal = normalizeEstado(ipInfo.region);
        console.log('[Pedidos] 📍 Estado detectado por IP:', estadoReal);
      }
    } catch (err) {
      console.error('[Pedidos] ⚠️ Erro ao buscar geolocalização:', err);
    }
  }
  
  // Se não conseguiu detectar por IP, usa o que foi enviado no formulário
  if (!estadoReal && b.estado_entrega) {
    estadoReal = normalizeEstado(b.estado_entrega);
  }
  
  // Validações
  if (total <= 0) {
    return res.status(400).json({ success: false, error: 'Total do pedido deve ser maior que zero' });
  }
  
  if (itens.length === 0) {
    return res.status(400).json({ success: false, error: 'Carrinho vazio' });
  }
  
  console.log('[Pedidos] 📦 Criando pedido:', {
    total,
    subtotal,
    valor_frete,
    desconto,
    itens_count: itens.length,
    cliente: b.cliente_nome,
    estado: estadoReal,
    pix_payment_id
  });
  
  const result = db.prepare(`
    INSERT INTO pedidos (
      cliente_nome, cliente_email, cliente_cpf, cliente_telefone,
      endereco_entrega, numero_entrega, complemento_entrega, bairro_entrega,
      cidade_entrega, estado_entrega, cep_entrega,
      status, total, subtotal, valor_frete, total_pago, desconto,
      pix_payment_id, pix_code, pix_qrcode, payment_method,
      utm_source, utm_medium, utm_campaign, utm_term, utm_content,
      tracking_ttp, tracking_ttclid, tracking_fbp, tracking_fbc,
      tracking_user_agent, tracking_ip, url_origem, ip_info
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pendente', ?, ?, ?, 0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    b.cliente_nome ?? '',
    b.cliente_email ?? '',
    b.cliente_cpf ?? '',
    b.cliente_telefone ?? '',
    b.endereco_entrega ?? '',
    b.numero_entrega ?? '',
    b.complemento_entrega ?? null,
    b.bairro_entrega ?? '',
    b.cidade_entrega ?? '',
    estadoReal ?? '', // Usa estado normalizado da geolocalização
    b.cep_entrega ?? '',
    total,
    subtotal,
    valor_frete,
    desconto,
    pix_payment_id,
    b.pix_code ?? null,
    b.pix_qrcode ?? null,
    b.payment_method ?? null,
    b.utm_source ?? null,
    b.utm_medium ?? null,
    b.utm_campaign ?? null,
    b.utm_term ?? null,
    b.utm_content ?? null,
    b.tracking_ttp ?? null,
    b.tracking_ttclid ?? null,
    b.tracking_fbp ?? null,
    b.tracking_fbc ?? null,
    b.tracking_user_agent ?? null,
    clientIp ?? null, // IP real do cliente
    b.url_origem ?? null,
    ipInfo ? JSON.stringify(ipInfo) : null // Dados completos da geolocalização
  );
  
  const pedidoId = result.lastInsertRowid;
  
  // Salvar itens do pedido
  for (const item of itens) {
    db.prepare(`
      INSERT INTO pedido_itens (pedido_id, produto_id, nome, preco, quantidade)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      pedidoId, 
      item.id ?? null, 
      item.nome ?? '', 
      Number(item.preco) ?? 0, 
      Number(item.quantidade) || 1
    );
  }
  
  // Se tiver pix_payment_id (transaction_id), criar/atualizar registro em transacoes_pix
  if (pix_payment_id) {
    try {
      db.prepare(`
        INSERT INTO transacoes_pix (pedido_id, transaction_id, status, created_at, updated_at)
        VALUES (?, ?, 'enviado', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        ON CONFLICT(transaction_id) DO UPDATE SET pedido_id = excluded.pedido_id, updated_at = CURRENT_TIMESTAMP
      `).run(pedidoId, pix_payment_id);
      
      console.log('[Pedidos] 🔗 Transação vinculada ao pedido:', {
        pedido_id: pedidoId,
        transaction_id: pix_payment_id
      });
    } catch (err) {
      console.error('[Pedidos] ⚠️ Erro ao vincular transação (não crítico):', err);
    }
  }
  
  console.log('[Pedidos] ✅ Pedido criado:', {
    pedido_id: pedidoId,
    total,
    itens_salvos: itens.length
  });

  // Enviar evento de conversão para TikTok Events API (server-side)
  if (b.payment_method === 'pix' && total > 0) {
    // Extrair UTMs do locationsearch (query params)
    let utmParams = {};
    if (b.locationsearch) {
      try {
        const searchParams = new URLSearchParams(b.locationsearch);
        utmParams.utm_source = searchParams.get('utm_source') || null;
        utmParams.utm_medium = searchParams.get('utm_medium') || null;
        utmParams.utm_campaign = searchParams.get('utm_campaign') || null;
        utmParams.utm_term = searchParams.get('utm_term') || null;
        utmParams.utm_content = searchParams.get('utm_content') || null;
      } catch (err) {
        console.warn('[Pedidos] Erro ao parsear UTMs:', err);
      }
    }

    const trackingData = {
      event_source_url: b.url_origem || '',
      user_agent: b.tracking_user_agent || req.headers['user-agent'] || '',
      utm_source: utmParams.utm_source || b.utm_source || null,
      utm_medium: utmParams.utm_medium || b.utm_medium || null,
      utm_campaign: utmParams.utm_campaign || b.utm_campaign || null,
      utm_term: utmParams.utm_term || b.utm_term || null,
      utm_content: utmParams.utm_content || b.utm_content || null,
      ttclid: b.tracking_ttclid || null,
      ttp: b.tracking_ttp || null,
      fbp: b.tracking_fbp || null,
      fbc: b.tracking_fbc || null,
      tracking_ip: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || null,
      tracking_user_agent: b.tracking_user_agent || req.headers['user-agent'] || ''
    };

    const customerData = {
      name: b.cliente_nome || '',
      email: b.cliente_email || '',
      phone: b.cliente_telefone || '',
      document: b.cliente_cpf || '',
      address: b.endereco_entrega || '',
      city: b.cidade_entrega || '',
      state: b.estado_entrega || '',
      zipcode: b.cep_entrega || '',
      country: 'BR'
    };

    const productNames = itens.map(item => item.nome).filter(Boolean).join(', ');

    const orderData = {
      amount: total,
      product_name: productNames,
      order_id: `ORDER_${pedidoId}_${Date.now()}`
    };

    // REMOVIDO: Não enviar conversão aqui pois o pagamento ainda não foi confirmado.
    // O evento será enviado quando o webhook do gateway confirmar o pagamento em escalaPayApi.js
    // sendTikTokConversion(db, {
    //   customerData,
    //   orderData,
    //   trackingData,
    //   eventId: `conversion_${pedidoId}_${Date.now()}`,
    //   timestamp: Math.floor(Date.now() / 1000)
    // }).then(results => {
    //   console.log('[Pedidos] TikTok conversion results:', results);
    // }).catch(err => {
    //   console.error('[Pedidos] Erro ao enviar conversão TikTok:', err);
    // });
  }

  res.status(201).json({ success: true, id: pedidoId });
});

// GET /api/db/pedidos
router.get('/pedidos', requireAdmin, (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 100, 999999);
  const pedidos = db.all(`
    SELECT * FROM pedidos ORDER BY id DESC LIMIT ?
  `, [limit]);
  
  // Buscar itens de cada pedido
  const pedidosComItens = pedidos.map(pedido => {
    const itens = db.all('SELECT * FROM pedido_itens WHERE pedido_id = ?', [pedido.id]);
    return {
      ...pedido,
      itens
    };
  });
  
  res.json(pedidosComItens);
});

// GET /api/db/pedidos/:id — exige admin (dados sensíveis do pedido).
router.get('/pedidos/:id', requireAdmin, (req, res) => {
  const ped = db.get('SELECT * FROM pedidos WHERE id = ?', [req.params.id]);
  if (!ped) return res.status(404).json({ error: 'Pedido não encontrado' });
  const itens = db.all('SELECT * FROM pedido_itens WHERE pedido_id = ?', [req.params.id]);
  ped.itens = itens;
  res.json(ped);
});

// PUT /api/db/pedidos/:id/status
router.put('/pedidos/:id/status', requireAdmin, (req, res) => {
  const { status } = req.body || {};
  if (!status) return res.status(400).json({ success: false, error: 'Status obrigatório' });
  db.run('UPDATE pedidos SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [status, req.params.id]);
  res.json({ success: true });
});

// PUT /api/db/pedidos/:id/apply-recovery-discount — link de recuperação (público)
router.put('/pedidos/:id/apply-recovery-discount', (req, res) => {
  const id = req.params.id;
  const ped = db.get('SELECT * FROM pedidos WHERE id = ?', [id]);
  if (!ped) return res.status(404).json({ success: false, error: 'Pedido não encontrado' });
  if (ped.status !== 'pendente') return res.status(400).json({ success: false, error: 'Pedido já foi pago ou não está pendente' });
  const totalOriginal = Number(ped.total) || 0;
  const desconto = Math.round(totalOriginal * 0.1 * 100) / 100;
  const novoTotal = Math.round((totalOriginal - desconto) * 100) / 100;
  db.run('UPDATE pedidos SET total = ?, desconto = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [novoTotal, desconto, id]);
  const updated = db.get('SELECT * FROM pedidos WHERE id = ?', [id]);
  const itens = db.all('SELECT * FROM pedido_itens WHERE pedido_id = ?', [id]);
  updated.itens = itens;
  res.json({ success: true, pedido: { ...updated, totalOriginal } });
});

export default router;
