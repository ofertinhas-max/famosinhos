import "dotenv/config";
import { db } from "../db/index.js";
import { sendTikTokConversion } from "./tiktokEventsApi.js";

/**
 * Serviço de integração com EscalaPay Gateway
 * Documentação: https://snnesnxqxclvcpsezafm.supabase.cobureputercdnaw
 *
 * Gera pagamentos PIX e processa webhooks de confirmação
 */

/**
 * Busca a API Key configurada no admin ou usa a padrão do .env
 */
function getApiKey() {
  try {
    const config = db.get("SELECT valor FROM configuracoes WHERE chave = ?", [
      "escalapay_api_key",
    ]);
    if (config && config.valor && config.valor.trim()) {
      return config.valor.trim();
    }
  } catch (err) {
    console.warn("[EscalaPay] Erro ao buscar API key do banco:", err);
  }

  // Fallback para .env
  return process.env.ESCALAPAY_API_KEY || "";
}

/** URL base para consulta de status (check-payment-status) */
const DEFAULT_BASE_URL_CHECK = "https://snnesnxqxclvcpsezafm.supabase.co";
/** URL base para criar transação (transactions-create) — nova doc usa host diferente */
const DEFAULT_BASE_URL_CREATE = "https://fsgfjnnidyxqhfrhxijv.supabase.co";

/**
 * Busca a URL base para consulta de status (check)
 */
function getBaseUrl() {
  try {
    const config = db.get("SELECT valor FROM configuracoes WHERE chave = ?", [
      "escalapay_base_url",
    ]);
    if (config && config.valor && config.valor.trim()) {
      return config.valor.trim();
    }
  } catch (err) {
    console.warn("[EscalaPay] Erro ao buscar base URL do banco:", err);
  }
  return process.env.ESCALAPAY_BASE_URL || DEFAULT_BASE_URL_CHECK;
}

/**
 * Busca a URL base para criar transação PIX (nova doc: host diferente do check)
 */
function getBaseUrlCreate() {
  try {
    const config = db.get("SELECT valor FROM configuracoes WHERE chave = ?", [
      "escalapay_base_url_create",
    ]);
    if (config && config.valor && config.valor.trim()) {
      return config.valor.trim();
    }
  } catch (err) {
    console.warn("[EscalaPay] Erro ao buscar base URL create do banco:", err);
  }
  return process.env.ESCALAPAY_BASE_URL_CREATE || DEFAULT_BASE_URL_CREATE;
}

/**
 * Cria uma transação PIX no gateway EscalaPay
 *
 * @param {Object} params - Parâmetros da transação
 * @param {number} params.valor - Valor total em reais (ex: 100.50)
 * @param {string} params.descricao - Descrição do pedido (ex: "Pedido #123")
 * @param {string} params.cliente_nome - Nome completo do cliente
 * @param {string} params.cliente_email - Email do cliente
 * @param {string} params.cliente_documento - CPF do cliente (apenas números)
 * @param {number} params.pedidoId - ID do pedido no banco local
 * @param {string} [params.utmQuery] - JSON string com UTMs (ex: "{\"utm_source\":\"tiktok\",\"utm_medium\":\"cpc\"}")
 *
 * @returns {Promise<Object>} Resposta do gateway com QR Code
 */
export async function createPixTransaction({
  valor,
  descricao,
  cliente_nome,
  cliente_email,
  cliente_documento,
  pedidoId,
  utmQuery,
}) {
  const apiKey = getApiKey();

  if (!apiKey) {
    throw new Error(
      "API Key do EscalaPay não configurada. Configure em Configurações > Gateway de Pagamento",
    );
  }

  // Validações
  if (!valor || valor <= 0) {
    throw new Error("Valor da transação deve ser maior que zero");
  }

  if (!cliente_nome || !cliente_email || !cliente_documento) {
    throw new Error("Dados do cliente incompletos");
  }

  // Remove caracteres não numéricos do CPF
  const cpfLimpo = String(cliente_documento).replace(/\D/g, "");

  if (cpfLimpo.length !== 11) {
    throw new Error("CPF inválido");
  }

  const payload = {
    valor: Number(valor),
    descricao: descricao || `Pedido #${pedidoId}`,
    cliente_nome: String(cliente_nome).trim(),
    cliente_email: String(cliente_email).trim().toLowerCase(),
    cliente_documento: cpfLimpo,
  };
  if (typeof utmQuery === "string" && utmQuery.trim()) {
    payload.utmQuery = utmQuery.trim();
  }

  const baseUrlCreate = getBaseUrlCreate();

  console.log("[EscalaPay] 📤 Criando transação PIX:", {
    pedidoId,
    valor: payload.valor,
    descricao: payload.descricao,
    cliente: payload.cliente_nome,
    host: baseUrlCreate,
  });

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    const response = await fetch(
      `${baseUrlCreate}/functions/v1/transactions-create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      },
    );
    clearTimeout(timeoutId);

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("[EscalaPay] ❌ Resposta não é JSON:", text?.slice(0, 200));
      throw new Error("Resposta inválida do gateway de pagamento");
    }

    if (!response.ok) {
      console.error("[EscalaPay] ❌ Erro na resposta do gateway:", {
        status: response.status,
        statusText: response.statusText,
        data,
      });

      // Tratamento de erros específicos
      if (response.status === 400) {
        throw new Error(
          "Dados inválidos enviados ao gateway. Verifique os campos obrigatórios.",
        );
      } else if (response.status === 401) {
        throw new Error(
          "API Key inválida ou ausente. Verifique as configurações do gateway.",
        );
      } else if (response.status === 403) {
        throw new Error(
          "Conta inativa no gateway. Entre em contato com o suporte.",
        );
      } else if (response.status >= 500) {
        throw new Error(
          "Erro interno do gateway. Tente novamente em alguns instantes.",
        );
      } else {
        throw new Error(
          data.error || data.message || "Erro ao processar pagamento",
        );
      }
    }

    // Nova doc: sucesso, transacao.transaction_id, qr em transacao ou provedor_response
    const sucesso = data.sucesso === true || data.success === true;
    const transacao = data.transacao || data.transaction || {};
    const provedor_response =
      data.provedor_response || data.provedorResponse || {};
    if (!sucesso && !transacao.transaction_id) {
      console.error("[EscalaPay] ❌ Resposta inválida do gateway:", data);
      throw new Error("Resposta inválida do gateway de pagamento");
    }

    const transaction_id =
      transacao.transaction_id ||
      provedor_response.transaction_id ||
      data.transaction_id;
    const qrcode =
      provedor_response.qrcode ||
      provedor_response.qr_code ||
      transacao.pix_copia_cola ||
      transacao.qr_code;
    if (!qrcode) {
      console.error(
        "[EscalaPay] ❌ Dados essenciais faltando na resposta:",
        data,
      );
      throw new Error("QR Code não gerado pelo gateway");
    }

    console.log("[EscalaPay] ✅ Transação criada com sucesso:", {
      transaction_id,
      status: transacao.status,
      valor: transacao.valor,
    });

    // Salvar transação no banco local SOMENTE se tiver pedido_id
    if (pedidoId && transaction_id) {
      try {
        db.prepare(
          `
          INSERT INTO transacoes_pix (pedido_id, transaction_id, status, created_at, updated_at)
          VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        `,
        ).run(pedidoId, transaction_id, transacao.status || "enviado");

        console.log(
          "[EscalaPay] 💾 Transação vinculada ao pedido #" + pedidoId,
        );
      } catch (dbErr) {
        console.error(
          "[EscalaPay] ⚠️ Erro ao salvar transação no banco (não crítico):",
          dbErr,
        );
      }
    } else {
      console.log(
        "[EscalaPay] ℹ️ Transação criada sem pedido_id (será vinculado posteriormente)",
      );
    }

    const qr_code_image =
      provedor_response.qrcode_image ||
      provedor_response.qr_code ||
      transacao.qr_code ||
      null;
    return {
      success: true,
      transaction_id: transaction_id || transacao.transaction_id,
      qr_code: qrcode,
      qr_code_base64: qr_code_image || provedor_response.qrcode_base64 || null,
      valor: transacao.valor,
      status: transacao.status || "pendente",
      gateway_response: data,
    };
  } catch (error) {
    const msg = error?.message || String(error);
    const cause = error?.cause?.message || error?.cause || "";
    // Se for erro de rede/fetch (fetch falha, timeout, DNS, etc.)
    if (
      error.name === "TypeError" ||
      error.name === "FetchError" ||
      error.name === "AbortError" ||
      error.code === "ECONNREFUSED" ||
      error.code === "ENOTFOUND" ||
      error.code === "ETIMEDOUT"
    ) {
      console.error("[EscalaPay] ❌ Erro de conexão com o gateway:", {
        message: msg,
        code: error?.code,
        cause,
        baseUrl: getBaseUrlCreate(),
      });
      throw new Error(
        "Erro ao conectar com o gateway de pagamento. Verifique sua conexão. Detalhe: " +
          (error?.code || msg),
      );
    }
    // Propaga outros erros
    console.error("[EscalaPay] ❌ Erro ao criar transação PIX:", error);
    throw error;
  }
}

/**
 * Processa webhook de confirmação de pagamento do EscalaPay
 *
 * Payload esperado:
 * {
 *   "transaction_id": "TXN-1737283456789-A1B2C3",
 *   "status": "confirmado",
 *   "valor": 100.50,
 *   "descricao": "Pedido #123",
 *   "data_confirmacao": "2024-01-20T10:30:00Z"
 * }
 *
 * @param {Object} webhookData - Dados recebidos do webhook
 * @returns {Promise<Object>} Resultado do processamento
 */
export async function processWebhook(webhookData) {
  console.log("[EscalaPay Webhook] 📥 Processando webhook:", webhookData);

  const { transaction_id, status, valor, descricao, data_confirmacao } =
    webhookData;

  // Validação 1: transaction_id obrigatório
  if (!transaction_id || typeof transaction_id !== "string") {
    throw new Error("transaction_id não informado ou inválido no webhook");
  }

  // Validação 2: status obrigatório
  if (!status || typeof status !== "string") {
    throw new Error("status não informado ou inválido no webhook");
  }

  // Validação 3: valor deve ser número positivo
  if (valor && (typeof valor !== "number" || valor <= 0)) {
    console.warn("[EscalaPay Webhook] ⚠️ Valor inválido recebido:", valor);
  }

  // Buscar transação no banco local
  const tx = db.get("SELECT * FROM transacoes_pix WHERE transaction_id = ?", [
    transaction_id,
  ]);

  if (!tx) {
    // Tentar buscar pedido diretamente pelo pix_payment_id
    const pedido = db.get("SELECT * FROM pedidos WHERE pix_payment_id = ?", [
      transaction_id,
    ]);

    if (!pedido) {
      console.error(
        "[EscalaPay Webhook] ❌ Transação e pedido não encontrados:",
        transaction_id,
      );
      throw new Error("Transação não encontrada no sistema");
    }

    console.log("[EscalaPay Webhook] 📦 Pedido encontrado diretamente:", {
      pedido_id: pedido.id,
      status_atual: pedido.status,
      total: pedido.total,
      cliente: pedido.cliente_nome,
    });

    // Processar confirmação direto no pedido
    if (status === "confirmado") {
      console.log(
        "[EscalaPay Webhook] ✅ PAGAMENTO CONFIRMADO - Atualizando pedido",
      );

      db.prepare(
        `
        UPDATE pedidos 
        SET status = 'pago', total_pago = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
      `,
      ).run(valor || pedido.total, pedido.id);

      console.log(
        "[EscalaPay Webhook] 💰 Pedido #" + pedido.id + " marcado como PAGO",
      );

      // Buscar itens do pedido para enviar ao TikTok
      const itens = db.all("SELECT * FROM pedido_itens WHERE pedido_id = ?", [
        pedido.id,
      ]);
      const productNames = itens
        .map((item) => item.nome)
        .filter(Boolean)
        .join(", ");

      // Enviar evento de conversão para TikTok (CRITICAL!)
      sendTikTokConversion(db, {
        customerData: {
          name: pedido.cliente_nome || "",
          email: pedido.cliente_email || "",
          phone: pedido.cliente_telefone || "",
          document: pedido.cliente_cpf || "",
          address: pedido.endereco_entrega || "",
          city: pedido.cidade_entrega || "",
          state: pedido.estado_entrega || "",
          zipcode: pedido.cep_entrega || "",
          country: "BR",
        },
        orderData: {
          amount: valor || pedido.total,
          product_name: productNames,
          order_id: `ORDER_${pedido.id}_${Date.now()}`,
        },
        trackingData: {
          event_source_url:
            pedido.url_origem || `${process.env.SITE_URL}/checkout`,
          user_agent: pedido.tracking_user_agent || "Webhook-Server",
          utm_source: pedido.utm_source || null,
          utm_medium: pedido.utm_medium || null,
          utm_campaign: pedido.utm_campaign || null,
          utm_term: pedido.utm_term || null,
          utm_content: pedido.utm_content || null,
          ttclid: pedido.tracking_ttclid || null,
          ttp: pedido.tracking_ttp || null,
          fbp: pedido.tracking_fbp || null,
          fbc: pedido.tracking_fbc || null,
          tracking_ip: pedido.tracking_ip || null,
          tracking_user_agent:
            pedido.tracking_user_agent || "EscalaPay-Webhook",
        },
        eventId: `webhook_conversion_${pedido.id}_${Date.now()}`,
        timestamp: Math.floor(Date.now() / 1000),
      })
        .then((results) => {
          console.log(
            "[EscalaPay Webhook] 🎯 TikTok conversion results:",
            results,
          );
        })
        .catch((err) => {
          console.error(
            "[EscalaPay Webhook] ❌ Erro ao enviar conversão TikTok:",
            err,
          );
        });

      const upsellUrl = getUpsellRedirectUrl(pedido);

      return {
        success: true,
        message: "Pagamento confirmado e pedido atualizado",
        pedido_id: pedido.id,
        transaction_id,
        status: "pago",
        valor_pago: valor || pedido.total,
        upsell_url: upsellUrl,
      };
    } else {
      return {
        success: true,
        message: `Status atualizado para: ${status}`,
        pedido_id: pedido.id,
        transaction_id,
        status,
        upsell_url: null,
      };
    }
  }

  // Buscar pedido relacionado à transação
  const pedido = db.get("SELECT * FROM pedidos WHERE id = ?", [tx.pedido_id]);

  if (!pedido) {
    console.error(
      "[EscalaPay Webhook] ❌ Pedido não encontrado para transação:",
      tx.pedido_id,
    );
    throw new Error("Pedido não encontrado");
  }

  console.log("[EscalaPay Webhook] 📦 Pedido encontrado:", {
    pedido_id: pedido.id,
    status_atual: pedido.status,
    total: pedido.total,
    cliente: pedido.cliente_nome,
  });

  // Verificar se status é "confirmado" (pagamento aprovado)
  if (status === "confirmado") {
    console.log(
      "[EscalaPay Webhook] ✅ PAGAMENTO CONFIRMADO - Atualizando pedido e transação",
    );

    // Atualizar status da transação
    db.prepare(
      `
      UPDATE transacoes_pix 
      SET status = 'paid', updated_at = CURRENT_TIMESTAMP 
      WHERE transaction_id = ?
    `,
    ).run(transaction_id);

    // Atualizar pedido para "pago"
    db.prepare(
      `
      UPDATE pedidos 
      SET status = 'pago', total_pago = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `,
    ).run(valor || pedido.total, pedido.id);

    console.log(
      "[EscalaPay Webhook] 💰 Pedido #" + pedido.id + " marcado como PAGO",
    );

    // Buscar itens do pedido para enviar ao TikTok
    const itens = db.all("SELECT * FROM pedido_itens WHERE pedido_id = ?", [
      pedido.id,
    ]);
    const productNames = itens
      .map((item) => item.nome)
      .filter(Boolean)
      .join(", ");

    // Enviar evento de conversão para TikTok (CRITICAL!)
    sendTikTokConversion(db, {
      customerData: {
        name: pedido.cliente_nome || "",
        email: pedido.cliente_email || "",
        phone: pedido.cliente_telefone || "",
        document: pedido.cliente_cpf || "",
        address: pedido.endereco_entrega || "",
        city: pedido.cidade_entrega || "",
        state: pedido.estado_entrega || "",
        zipcode: pedido.cep_entrega || "",
        country: "BR",
      },
      orderData: {
        amount: valor || pedido.total,
        product_name: productNames,
        order_id: `ORDER_${pedido.id}_${Date.now()}`,
      },
      trackingData: {
        event_source_url:
          pedido.url_origem || `${process.env.SITE_URL}/checkout`,
        user_agent: pedido.tracking_user_agent || "Webhook-Server",
        utm_source: pedido.utm_source || null,
        utm_medium: pedido.utm_medium || null,
        utm_campaign: pedido.utm_campaign || null,
        utm_term: pedido.utm_term || null,
        utm_content: pedido.utm_content || null,
        ttclid: pedido.tracking_ttclid || null,
        ttp: pedido.tracking_ttp || null,
        fbp: pedido.tracking_fbp || null,
        fbc: pedido.tracking_fbc || null,
        tracking_ip: pedido.tracking_ip || null,
        tracking_user_agent: pedido.tracking_user_agent || "EscalaPay-Webhook",
      },
      eventId: `webhook_conversion_${pedido.id}_${Date.now()}`,
      timestamp: Math.floor(Date.now() / 1000),
    })
      .then((results) => {
        console.log(
          "[EscalaPay Webhook] 🎯 TikTok conversion results:",
          results,
        );
      })
      .catch((err) => {
        console.error(
          "[EscalaPay Webhook] ❌ Erro ao enviar conversão TikTok:",
          err,
        );
      });

    // Buscar taxas/upsells ativos para redirecionamento
    const upsellUrl = getUpsellRedirectUrl(pedido);

    return {
      success: true,
      message: "Pagamento confirmado e pedido atualizado",
      pedido_id: pedido.id,
      transaction_id,
      status: "pago",
      valor_pago: valor || pedido.total,
      upsell_url: upsellUrl,
    };
  } else {
    // Outros status (cancelado, expirado, etc)
    console.log("[EscalaPay Webhook] ⚠️ Status recebido:", status);

    // Atualizar apenas o status da transação
    db.prepare(
      `
      UPDATE transacoes_pix 
      SET status = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE transaction_id = ?
    `,
    ).run(status, transaction_id);

    return {
      success: true,
      message: `Status da transação atualizado para: ${status}`,
      pedido_id: pedido.id,
      transaction_id,
      status,
      upsell_url: null,
    };
  }
}

/**
 * Busca URL de upsell ativo para redirecionar após pagamento confirmado
 *
 * @param {Object} pedido - Dados do pedido
 * @returns {string|null} URL do primeiro upsell ativo ou null
 */
function getUpsellRedirectUrl(pedido) {
  try {
    // Buscar configuração de incluirQueryParams
    const incluirParams = db.get(
      "SELECT valor FROM taxas_links WHERE chave = ?",
      ["incluirQueryParams"],
    );
    const incluirQueryParams = incluirParams && incluirParams.valor === "1";

    // Buscar taxas ativas (taxa1 a taxa5)
    for (let i = 1; i <= 5; i++) {
      const taxaKey = `taxa${i}`;
      const taxaConfig = db.get(
        "SELECT valor FROM taxas_links WHERE chave = ?",
        [taxaKey],
      );

      if (taxaConfig && taxaConfig.valor) {
        try {
          const taxa = JSON.parse(taxaConfig.valor);

          // Verificar se taxa está ativa e tem URL
          if (taxa.ativo && taxa.url && taxa.url.trim()) {
            let url = taxa.url.trim();

            // Adicionar query params se configurado
            if (incluirQueryParams) {
              const params = new URLSearchParams();
              params.append("order", pedido.id);
              params.append("ref", `pedido:${pedido.id}|taxa${i}`);
              params.append("nome", pedido.cliente_nome || "");
              params.append(
                "documento",
                (pedido.cliente_cpf || "").replace(/\D/g, ""),
              );
              params.append(
                "telefone",
                (pedido.cliente_telefone || "").replace(/\D/g, ""),
              );
              params.append("loja", process.env.SITE_URL || "");

              // Adicionar params à URL
              const separator = url.includes("?") ? "&" : "?";
              url = `${url}${separator}${params.toString()}`;
            }

            console.log("[EscalaPay] 🎯 Upsell ativo encontrado:", {
              taxa: taxaKey,
              url,
            });
            return url;
          }
        } catch (err) {
          console.warn(
            "[EscalaPay] Erro ao parsear taxa " + taxaKey + ":",
            err,
          );
        }
      }
    }

    console.log("[EscalaPay] ℹ️ Nenhum upsell ativo configurado");
    return null;
  } catch (error) {
    console.error("[EscalaPay] ❌ Erro ao buscar upsell:", error);
    return null;
  }
}

export default { createPixTransaction, processWebhook };
