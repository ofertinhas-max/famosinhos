/**
 * Serviço de geolocalização por IP usando IPInfo.io
 * 
 * Documentação: https://ipinfo.io/developers
 * Endpoint: https://ipinfo.io/{ip}/json
 */

/**
 * Busca informações de geolocalização por IP
 * 
 * @param {string} ip - Endereço IP do usuário
 * @returns {Promise<Object>} Dados de geolocalização
 */
export async function getIpInfo(ip) {
  if (!ip || ip === '::1' || ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
    console.warn('[IPInfo] IP local ou inválido:', ip);
    return null;
  }
  
  try {
    const response = await fetch(`https://ipinfo.io/${ip}/json`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      console.error('[IPInfo] Erro na requisição:', response.status);
      return null;
    }
    
    const data = await response.json();
    
    console.log('[IPInfo] Dados obtidos para IP', ip, ':', {
      city: data.city,
      region: data.region,
      country: data.country
    });
    
    return {
      ip: data.ip || ip,
      city: data.city || null,           // Ex: "Tramandaí"
      region: data.region || null,       // Ex: "Rio Grande do Sul"
      country: data.country || null,     // Ex: "BR"
      loc: data.loc || null,             // Ex: "-29.9847,-50.1336"
      postal: data.postal || null,       // Ex: "95590-000"
      timezone: data.timezone || null,   // Ex: "America/Sao_Paulo"
      org: data.org || null,             // Ex: "AS53184 VERO S.A"
      hostname: data.hostname || null
    };
    
  } catch (error) {
    console.error('[IPInfo] Erro ao buscar dados de IP:', error);
    return null;
  }
}

/**
 * Normaliza nome do estado (sigla ou nome completo → nome completo)
 * 
 * @param {string} estado - Estado (sigla ou nome)
 * @returns {string} Nome completo do estado
 */
export function normalizeEstado(estado) {
  if (!estado) return 'Não Informado';
  
  const estadoUpper = estado.toUpperCase().trim();
  
  const siglaParaNome = {
    'AC': 'Acre',
    'AL': 'Alagoas',
    'AP': 'Amapá',
    'AM': 'Amazonas',
    'BA': 'Bahia',
    'CE': 'Ceará',
    'DF': 'Distrito Federal',
    'ES': 'Espírito Santo',
    'GO': 'Goiás',
    'MA': 'Maranhão',
    'MT': 'Mato Grosso',
    'MS': 'Mato Grosso do Sul',
    'MG': 'Minas Gerais',
    'PA': 'Pará',
    'PB': 'Paraíba',
    'PR': 'Paraná',
    'PE': 'Pernambuco',
    'PI': 'Piauí',
    'RJ': 'Rio de Janeiro',
    'RN': 'Rio Grande do Norte',
    'RS': 'Rio Grande do Sul',
    'RO': 'Rondônia',
    'RR': 'Roraima',
    'SC': 'Santa Catarina',
    'SP': 'São Paulo',
    'SE': 'Sergipe',
    'TO': 'Tocantins'
  };
  
  // Se for sigla, retorna nome completo
  if (siglaParaNome[estadoUpper]) {
    return siglaParaNome[estadoUpper];
  }
  
  // Se já for nome completo, retorna capitalizado
  return estado.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
