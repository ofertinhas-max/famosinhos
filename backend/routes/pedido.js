import { Router } from 'express';
import { db } from '../db/index.js';
import { createPixTransaction, processWebhook } from '../services/escalaPayApi.js';

// Gera CPF válido (algoritmo oficial módulo 11) - sem dependência externa
function gerarCpfValido() {
  const d = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
  let s = 0;
  for (let i = 0; i < 9; i++) s += d[i] * (10 - i);
  d[9] = (s % 11) < 2 ? 0 : 11 - (s % 11);
  s = 0;
  for (let i = 0; i < 10; i++) s += d[i] * (11 - i);
  d[10] = (s % 11) < 2 ? 0 : 11 - (s % 11);
  return d.join('');
}

function validarCpf(cpf) {
  const n = (cpf || '').replace(/\D/g, '');
  if (n.length !== 11 || /^(\d)\1{10}$/.test(n)) return false;
  let s = 0;
  for (let i = 0; i < 9; i++) s += parseInt(n[i], 10) * (10 - i);
  const d1 = (s % 11) < 2 ? 0 : 11 - (s % 11);
  if (parseInt(n[9], 10) !== d1) return false;
  s = 0;
  for (let i = 0; i < 10; i++) s += parseInt(n[i], 10) * (11 - i);
  const d2 = (s % 11) < 2 ? 0 : 11 - (s % 11);
  return parseInt(n[10], 10) === d2;
}

// GET /api/pedido/status?transaction_id=
const statusRouter = new Router();
statusRouter.get('/status', (req, res) => {
  const transactionId = req.query.transaction_id;
  if (!transactionId) {
    return res.status(400).json({ success: false, error: 'transaction_id obrigatório' });
  }
  
  // Buscar transação
  const tx = db.get('SELECT * FROM transacoes_pix WHERE transaction_id = ?', [transactionId]);
  
  if (!tx) {
    // Fallback: buscar pelo pix_payment_id no pedido
    const ped = db.get('SELECT * FROM pedidos WHERE pix_payment_id = ?', [transactionId]);
    if (ped) {
      const status = ped.status === 'pago' ? 'paid' : ped.status === 'cancelado' ? 'expired' : 'pending';
      return res.json({ success: true, transaction: { status } });
    }
    return res.json({ success: true, transaction: { status: 'pending' } });
  }
  
  // Mapear status do banco para formato do frontend
  const statusMap = {
    'paid': 'paid',
    'confirmado': 'paid',
    'pago': 'paid',
    'expired': 'expired',
    'cancelado': 'expired',
    'expirado': 'expired',
    'pending': 'pending',
    'enviado': 'pending',
    'aguardando': 'pending'
  };
  
  const status = statusMap[tx.status.toLowerCase()] || 'pending';
  res.json({ success: true, transaction: { status } });
});

// GET /api/pedido/status-stream?transaction_id= (SSE - Server-Sent Events)
statusRouter.get('/status-stream', (req, res) => {
  const transactionId = req.query.transaction_id;
  
  if (!transactionId) {
    return res.status(400).json({ success: false, error: 'transaction_id obrigatório' });
  }
  
  // Configurar SSE headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });
  
  // Enviar mensagem de conexão estabelecida
  res.write('data: {"type":"connected"}\n\n');
  
  console.log('[SSE] Cliente conectado:', transactionId);
  
  // Função para verificar status e enviar atualização
  const checkStatus = () => {
    try {
      const tx = db.get('SELECT * FROM transacoes_pix WHERE transaction_id = ?', [transactionId]);
      
      if (!tx) {
        // Fallback: buscar pelo pedido
        const ped = db.get('SELECT * FROM pedidos WHERE pix_payment_id = ?', [transactionId]);
        if (ped) {
          const status = ped.status === 'pago' ? 'paid' : ped.status === 'cancelado' ? 'expired' : 'pending';
          res.write(`data: ${JSON.stringify({ status })}\n\n`);
          
          if (status === 'paid' || status === 'expired') {
            clearInterval(interval);
            res.end();
          }
        }
        return;
      }
      
      // Mapear status
      const statusMap = {
        'paid': 'paid',
        'confirmado': 'paid',
        'pago': 'paid',
        'expired': 'expired',
        'cancelado': 'expired',
        'expirado': 'expired',
        'pending': 'pending',
        'enviado': 'pending',
        'aguardando': 'pending'
      };
      
      const status = statusMap[tx.status.toLowerCase()] || 'pending';
      
      // Enviar atualização
      res.write(`data: ${JSON.stringify({ status })}\n\n`);
      
      // Se pagamento foi confirmado ou expirado, encerrar conexão
      if (status === 'paid' || status === 'expired') {
        console.log('[SSE] Pagamento finalizado, encerrando conexão:', status);
        clearInterval(interval);
        res.end();
      }
    } catch (error) {
      console.error('[SSE] Erro ao verificar status:', error);
      clearInterval(interval);
      res.end();
    }
  };
  
  // Verificar status a cada 3 segundos
  const interval = setInterval(checkStatus, 3000);
  
  // Verificar imediatamente ao conectar
  checkStatus();
  
  // Limpar quando cliente desconectar
  req.on('close', () => {
    console.log('[SSE] Cliente desconectado:', transactionId);
    clearInterval(interval);
  });
});

// GET /api/gerar-cpf - Gera CPF válido (módulo 11) para checkout quando "Exigir CPF" está desativado
const createPixRouter = new Router();
createPixRouter.get('/gerar-cpf', (req, res) => {
  try {
    let cpf = gerarCpfValido();
    if (!validarCpf(cpf)) {
      cpf = gerarCpfValido();
      if (!validarCpf(cpf)) return res.status(500).json({ success: false, error: 'CPF gerado inválido' });
    }
    res.json({ success: true, cpf });
  } catch (err) {
    console.error('[gerar-cpf] Erro:', err);
    res.status(500).json({ success: false, error: err.message || 'Erro ao gerar CPF' });
  }
});

// POST /api/create-pix - Integrado com EscalaPay Gateway
createPixRouter.post('/create-pix', async (req, res) => {
  try {
    const b = req.body || {};
    const customerData = b.customer_data || {};
    const orderData = b.order_data || {};
    
    // Extrair dados do cliente (frontend envia name, document; aceitar nome/documento/cpf também)
    const cliente_nome = (customerData.nome || customerData.name || '').trim();
    const cliente_email = (customerData.email || '').trim();
    const cliente_documento = (customerData.cpf || customerData.documento || customerData.document || '').replace(/\D/g, '');
    
    // Calcular valor total (produtos + frete se houver)
    let valor = Number(orderData.amount) || 0;
    
    // Validações básicas
    if (valor <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Valor do pedido deve ser maior que zero'
      });
    }
    
    if (!cliente_nome || !cliente_email || !cliente_documento) {
      return res.status(400).json({
        success: false,
        error: 'Dados do cliente incompletos (nome, email, CPF são obrigatórios)'
      });
    }
    if (cliente_documento.length !== 11) {
      return res.status(400).json({
        success: false,
        error: 'CPF deve ter 11 dígitos'
      });
    }

    console.log('[create-pix] 📦 Criando transação PIX:', {
      valor,
      cliente: cliente_nome,
      documento: cliente_documento
    });
    
    // Chamar gateway EscalaPay para gerar PIX real (NÃO cria pedido aqui)
    const gatewayResponse = await createPixTransaction({
      valor,
      descricao: orderData.description || `Pedido do cliente ${cliente_nome}`,
      cliente_nome,
      cliente_email,
      cliente_documento,
      pedidoId: null // Pedido será criado pelo frontend
    });
    
    console.log('[create-pix] ✅ PIX gerado com sucesso:', {
      transaction_id: gatewayResponse.transaction_id
    });
    
    // Retornar resposta para o frontend (formato compatível)
    res.status(201).json({
      success: true,
      transaction_id: gatewayResponse.transaction_id,
      qr_code: gatewayResponse.qr_code,
      qr_code_base64: gatewayResponse.qr_code_base64,
      valor: gatewayResponse.valor,
      status: gatewayResponse.status,
      fenix_response_time: null // compatibilidade
    });
    
  } catch (error) {
    console.error('[create-pix] ❌ Erro ao criar PIX:', error);
    
    res.status(500).json({
      success: false,
      error: error.message || 'Erro ao processar pagamento',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// POST /api/webhook/escalapay - Recebe notificações do gateway
const webhookRouter = new Router();
webhookRouter.post('/webhook/escalapay', async (req, res) => {
  try {
    console.log('[webhook] 📥 Webhook recebido do EscalaPay:', req.body);
    
    const result = await processWebhook(req.body);
    
    console.log('[webhook] ✅ Webhook processado com sucesso:', result);
    
    // Retornar 200 OK para o gateway
    res.status(200).json({
      success: true,
      message: 'Webhook processado com sucesso',
      pedido_id: result.pedido_id
    });
    
  } catch (error) {
    console.error('[webhook] ❌ Erro ao processar webhook:', error);
    
    // Retornar erro mas não quebrar o gateway
    res.status(200).json({
      success: false,
      error: error.message,
      message: 'Webhook recebido mas houve erro no processamento'
    });
  }
});

export { statusRouter, createPixRouter, webhookRouter };
export default statusRouter;
