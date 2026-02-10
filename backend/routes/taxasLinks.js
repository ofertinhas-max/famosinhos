import { Router } from 'express';
import { db } from '../db/index.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// Helper para buscar valor de configuração
const getConfig = (chave, defaultValue = null) => {
  const row = db.get('SELECT valor FROM taxas_links WHERE chave = ?', [chave]);
  return row ? row.valor : defaultValue;
};

// Helper para salvar/atualizar configuração
const setConfig = (chave, valor) => {
  const existing = db.get('SELECT id FROM taxas_links WHERE chave = ?', [chave]);
  if (existing) {
    db.prepare('UPDATE taxas_links SET valor = ?, updated_at = CURRENT_TIMESTAMP WHERE chave = ?')
      .run(valor, chave);
  } else {
    db.prepare('INSERT INTO taxas_links (chave, valor) VALUES (?, ?)')
      .run(chave, valor);
  }
};

// GET /api/taxas-links - Buscar configurações de taxas/upsells
router.get('/', (req, res) => {
  try {
    // Buscar incluirQueryParams
    const incluirQueryParams = getConfig('incluirQueryParams', '0') === '1';
    
    // Buscar configurações de cada taxa (taxa1 a taxa5)
    const taxas = {};
    for (let i = 1; i <= 5; i++) {
      const taxaKey = `taxa${i}`;
      const configStr = getConfig(taxaKey, null);
      
      if (configStr) {
        try {
          taxas[taxaKey] = JSON.parse(configStr);
        } catch {
          // Se não for JSON válido, criar estrutura padrão
          taxas[taxaKey] = { url: '', ativo: false, exigir: false };
        }
      } else {
        // Se não existir, criar estrutura padrão
        taxas[taxaKey] = { url: '', ativo: false, exigir: false };
      }
    }
    
    res.json({ success: true, taxas, incluirQueryParams });
  } catch (error) {
    console.error('[Taxas Links] Erro ao buscar:', error);
    res.status(500).json({ success: false, error: 'Erro ao buscar configurações' });
  }
});

// PUT /api/taxas-links - Salvar configurações de taxas/upsells
router.put('/', requireAdmin, (req, res) => {
  try {
    const { taxas, incluirQueryParams } = req.body;
    
    // Validar dados
    if (!taxas || typeof taxas !== 'object') {
      return res.status(400).json({ success: false, error: 'Dados inválidos' });
    }
    
    // Salvar incluirQueryParams
    setConfig('incluirQueryParams', incluirQueryParams ? '1' : '0');
    
    // Salvar cada taxa (taxa1 a taxa5)
    for (let i = 1; i <= 5; i++) {
      const taxaKey = `taxa${i}`;
      if (taxas[taxaKey]) {
        // Validar estrutura da taxa
        const taxa = taxas[taxaKey];
        const config = {
          url: taxa.url || '',
          ativo: Boolean(taxa.ativo),
          exigir: Boolean(taxa.exigir)
        };
        
        // Salvar como JSON
        setConfig(taxaKey, JSON.stringify(config));
      }
    }
    
    res.json({ success: true, message: 'Configurações salvas com sucesso' });
  } catch (error) {
    console.error('[Taxas Links] Erro ao salvar:', error);
    res.status(500).json({ success: false, error: 'Erro ao salvar configurações' });
  }
});

export default router;
