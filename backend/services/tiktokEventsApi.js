/**
 * Serviço para integração com TikTok Events API (Server-Side)
 *
 * Documentação oficial: https://ads.tiktok.com/help/article/events-api
 * Endpoint: https://business-api.tiktok.com/open_api/v1.3/event/track/
 *
 * Requer:
 * - Pixel ID (codigo no banco)
 * - Access Token (access_token no banco)
 */

import crypto from 'crypto';

// Hashing de dados sensíveis (SHA256)
function hashSHA256(value) {
  if (!value) return null;
  const normalized = value.toString().trim().toLowerCase();
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

// Remove caracteres não numéricos
function normalizePhone(phone) {
  if (!phone) return null;
  return phone.replace(/\D/g, '');
}

/**
 * Envia evento para TikTok Events API
 *
 * @param {Object} params
 * @param {string} params.pixelId - ID do pixel TikTok
 * @param {string} params.accessToken - Access Token da API
 * @param {string} params.eventName - Nome do evento (ex: 'CompletePayment')
 * @param {Object} params.customerData - Dados do cliente (nome, email, telefone, cpf, endereço)
 * @param {Object} params.orderData - Dados do pedido (amount, product_name, order_id)
 * @param {Object} params.trackingData - Dados de tracking (utm, fbp, fbc, ttclid, ttp, etc)
 * @param {string} params.eventId - ID único do evento para deduplicação
 * @param {number} params.timestamp - Timestamp do evento (em segundos)
 *
 * @returns {Promise<Object>} Resposta da API do TikTok
 */
export async function sendTikTokEvent({
  pixelId,
  accessToken,
  eventName,
  customerData = {},
  orderData = {},
  trackingData = {},
  eventId = null,
  timestamp = null
}) {
  if (!pixelId || !accessToken) {
    console.warn('[TikTok Events API] Pixel ID ou Access Token não configurado');
    return { success: false, error: 'missing_credentials' };
  }

  // Timestamp em segundos
  const eventTimestamp = timestamp || Math.floor(Date.now() / 1000);

  // Event ID para deduplicação (evita eventos duplicados entre pixel e server-side)
  const eventIdValue = eventId || `${pixelId}_${eventTimestamp}_${Math.random().toString(36).substr(2, 9)}`;

  // Construir objeto de usuário com hashing SHA256 (obrigatório pela API)
  const user = {};

  // Email (hasheado)
  if (customerData.email) {
    user.email = hashSHA256(customerData.email);
  }

  // Telefone (hasheado e normalizado)
  if (customerData.phone || customerData.telefone) {
    const phone = normalizePhone(customerData.phone || customerData.telefone);
    if (phone) {
      user.phone = hashSHA256(phone);
    }
  }

  // IP do usuário (se disponível)
  if (trackingData.tracking_ip) {
    user.ip = trackingData.tracking_ip;
  }

  // User Agent
  if (trackingData.tracking_user_agent || trackingData.user_agent) {
    user.user_agent = trackingData.tracking_user_agent || trackingData.user_agent;
  }

  // TikTok Click ID (ttclid)
  if (trackingData.ttclid || trackingData.tracking_ttclid) {
    user.ttclid = trackingData.ttclid || trackingData.tracking_ttclid;
  }

  // TikTok Pixel ID (ttp - cookie gerado pelo pixel)
  if (trackingData.ttp || trackingData.tracking_ttp) {
    user.ttp = trackingData.ttp || trackingData.tracking_ttp;
  }

  // Facebook Pixel IDs (para atribuição cross-platform)
  if (trackingData.fbp || trackingData.tracking_fbp) {
    user.fbp = trackingData.fbp || trackingData.tracking_fbp;
  }
  if (trackingData.fbc || trackingData.tracking_fbc) {
    user.fbc = trackingData.fbc || trackingData.tracking_fbc;
  }

  // Endereço
  if (customerData.city || customerData.cidade) {
    user.city = hashSHA256(customerData.city || customerData.cidade);
  }
  if (customerData.state || customerData.estado) {
    user.state = hashSHA256(customerData.state || customerData.estado);
  }
  if (customerData.zipcode || customerData.cep) {
    const zipcode = (customerData.zipcode || customerData.cep).replace(/\D/g, '');
    user.zipcode = hashSHA256(zipcode);
  }
  if (customerData.country) {
    user.country = hashSHA256(customerData.country);
  }

  // Construir objeto de propriedades do evento
  const properties = {
    content_type: 'product',
    currency: 'BRL'
  };

  // Valor do pedido
  if (orderData.amount !== undefined && orderData.amount !== null) {
    properties.value = Number(orderData.amount);
  }

  // ID do pedido
  if (orderData.order_id) {
    properties.order_id = orderData.order_id;
  }

  // Nome do produto
  if (orderData.product_name) {
    properties.description = orderData.product_name;
  }

  // Query de busca (para evento Search)
  if (orderData.query) {
    properties.query = orderData.query;
  }

  // Construir objeto da página
  const page = {
    url: trackingData.event_source_url || trackingData.url_origem || ''
  };

  // Referrer
  if (trackingData.referrer) {
    page.referrer = trackingData.referrer;
  }

  // Payload final para TikTok Events API
  const payload = {
    pixel_code: pixelId,
    event: eventName,
    event_id: eventIdValue,
    timestamp: eventTimestamp,
    context: {
      user,
      page,
      ad: {
        callback: trackingData.utm_source || null
      },
      user_agent: user.user_agent || '',
      ip: user.ip || ''
    },
    properties
  };

  // Endpoint da API
  const apiUrl = 'https://business-api.tiktok.com/open_api/v1.3/event/track/';

  try {
    console.log('[TikTok Events API] Enviando evento:', {
      eventName,
      pixelId,
      eventId: eventIdValue,
      value: properties.value
    });

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': accessToken
      },
      body: JSON.stringify({ data: [payload] })
    });

    const result = await response.json();

    if (!response.ok || result.code !== 0) {
      console.error('[TikTok Events API] Erro na resposta:', result);
      return {
        success: false,
        error: result.message || 'API error',
        code: result.code,
        response: result
      };
    }

    console.log('[TikTok Events API] Evento enviado com sucesso:', result);
    return {
      success: true,
      eventId: eventIdValue,
      response: result
    };

  } catch (error) {
    console.error('[TikTok Events API] Erro ao enviar evento:', error);
    return {
      success: false,
      error: error.message,
      stack: error.stack
    };
  }
}

/**
 * Envia evento de conversão (CompletePayment) para todos os pixels TikTok ativos
 *
 * @param {Object} db - Instância do banco de dados
 * @param {Object} params - Parâmetros do evento (customerData, orderData, trackingData)
 * @returns {Promise<Array>} Array com resultado de cada pixel
 */
export async function sendTikTokConversion(db, params) {
  // Buscar todos os pixels TikTok ativos com access_token
  const pixels = db.all(`
    SELECT id, nome, codigo, access_token
    FROM tracking_scripts
    WHERE tipo = 'tiktok'
      AND ativo = 1
      AND codigo IS NOT NULL
      AND codigo != ''
      AND access_token IS NOT NULL
      AND access_token != ''
    ORDER BY ordem ASC, id ASC
  `);

  if (!pixels || pixels.length === 0) {
    console.warn('[TikTok Events API] Nenhum pixel TikTok ativo com access_token configurado');
    return [];
  }

  console.log(`[TikTok Events API] Enviando conversão para ${pixels.length} pixel(s)`);

  const results = [];

  for (const pixel of pixels) {
    const result = await sendTikTokEvent({
      pixelId: pixel.codigo,
      accessToken: pixel.access_token,
      eventName: 'CompletePayment',
      customerData: params.customerData || {},
      orderData: params.orderData || {},
      trackingData: params.trackingData || {},
      eventId: params.eventId || null,
      timestamp: params.timestamp || null
    });

    results.push({
      pixelId: pixel.codigo,
      pixelName: pixel.nome,
      ...result
    });
  }

  return results;
}
