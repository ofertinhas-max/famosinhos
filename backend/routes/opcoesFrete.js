import { Router } from 'express';
import { db } from '../db/index.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// GET /api/db/opcoes-frete - Lista todas (requireAdmin)
router.get('/opcoes-frete', requireAdmin, (req, res) => {
  const rows = db.all('SELECT * FROM opcoes_frete ORDER BY ordem ASC, id ASC');
  // Parse JSON fields
  const parsed = rows.map(row => ({
    ...row,
    categorias_ids: row.categorias_ids ? JSON.parse(row.categorias_ids) : [],
    produtos_ids: row.produtos_ids ? JSON.parse(row.produtos_ids) : []
  }));
  res.json(parsed);
});

// GET /api/db/opcoes-frete/ativas - Público (para checkout)
router.get('/opcoes-frete/ativas', (req, res) => {
  const rows = db.all('SELECT * FROM opcoes_frete WHERE ativo = 1 ORDER BY ordem ASC, id ASC');
  const parsed = rows.map(row => ({
    ...row,
    categorias_ids: row.categorias_ids ? JSON.parse(row.categorias_ids) : [],
    produtos_ids: row.produtos_ids ? JSON.parse(row.produtos_ids) : []
  }));
  res.json(parsed);
});

// GET /api/db/opcoes-frete/:id
router.get('/opcoes-frete/:id', requireAdmin, (req, res) => {
  const row = db.get('SELECT * FROM opcoes_frete WHERE id = ?', [req.params.id]);
  if (!row) return res.status(404).json({ error: 'Opção não encontrada' });
  const parsed = {
    ...row,
    categorias_ids: row.categorias_ids ? JSON.parse(row.categorias_ids) : [],
    produtos_ids: row.produtos_ids ? JSON.parse(row.produtos_ids) : []
  };
  res.json(parsed);
});

// POST /api/db/opcoes-frete
router.post('/opcoes-frete', requireAdmin, (req, res) => {
  const b = req.body || {};
  
  // Validações
  const prazoMin = parseInt(b.prazo_minimo) || 1;
  const prazoMax = parseInt(b.prazo_maximo) || 1;
  
  if (prazoMin > prazoMax) {
    return res.status(400).json({ error: 'Prazo mínimo não pode ser maior que prazo máximo' });
  }
  
  // Serializar arrays como JSON
  const categoriasIds = Array.isArray(b.categorias_ids) ? JSON.stringify(b.categorias_ids) : '[]';
  const produtosIds = Array.isArray(b.produtos_ids) ? JSON.stringify(b.produtos_ids) : '[]';
  
  const result = db.prepare(`
    INSERT INTO opcoes_frete (
      nome, descricao, valor, prazo_minimo, prazo_maximo, tipo, logo, ordem, valor_original, 
      categorias_ids, produtos_ids, ativo
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    b.nome || '',
    b.descricao || null,
    Number(b.valor) || 0,
    prazoMin,
    prazoMax,
    b.tipo || 'pac',
    b.logo || null,
    parseInt(b.ordem) || 0,
    b.valor_original ? Number(b.valor_original) : null,
    categoriasIds,
    produtosIds,
    b.ativo !== 0 ? 1 : 0
  );
  
  const row = db.get('SELECT * FROM opcoes_frete WHERE id = ?', [result.lastInsertRowid]);
  const parsed = {
    ...row,
    categorias_ids: row.categorias_ids ? JSON.parse(row.categorias_ids) : [],
    produtos_ids: row.produtos_ids ? JSON.parse(row.produtos_ids) : []
  };
  res.status(201).json(parsed);
});

// PUT /api/db/opcoes-frete/:id
router.put('/opcoes-frete/:id', requireAdmin, (req, res) => {
  const b = req.body || {};
  
  // Validações
  const prazoMin = b.prazo_minimo !== undefined ? parseInt(b.prazo_minimo) : 1;
  const prazoMax = b.prazo_maximo !== undefined ? parseInt(b.prazo_maximo) : 1;
  
  if (prazoMin > prazoMax) {
    return res.status(400).json({ error: 'Prazo mínimo não pode ser maior que prazo máximo' });
  }
  
  // Serializar arrays como JSON
  const categoriasIds = Array.isArray(b.categorias_ids) ? JSON.stringify(b.categorias_ids) : null;
  const produtosIds = Array.isArray(b.produtos_ids) ? JSON.stringify(b.produtos_ids) : null;
  
  db.prepare(`
    UPDATE opcoes_frete SET 
      nome = ?, descricao = ?, valor = ?, prazo_minimo = ?, prazo_maximo = ?, 
      tipo = ?, logo = ?, ordem = ?, valor_original = ?, categorias_ids = ?, 
      produtos_ids = ?, ativo = ?, updated_at = CURRENT_TIMESTAMP 
    WHERE id = ?
  `).run(
    b.nome ?? '',
    b.descricao ?? null,
    Number(b.valor) ?? 0,
    prazoMin,
    prazoMax,
    b.tipo ?? 'pac',
    b.logo ?? null,
    parseInt(b.ordem) ?? 0,
    b.valor_original ? Number(b.valor_original) : null,
    categoriasIds,
    produtosIds,
    b.ativo !== 0 ? 1 : 0,
    req.params.id
  );
  
  const row = db.get('SELECT * FROM opcoes_frete WHERE id = ?', [req.params.id]);
  const parsed = {
    ...row,
    categorias_ids: row.categorias_ids ? JSON.parse(row.categorias_ids) : [],
    produtos_ids: row.produtos_ids ? JSON.parse(row.produtos_ids) : []
  };
  res.json(parsed);
});

// DELETE /api/db/opcoes-frete/:id
router.delete('/opcoes-frete/:id', requireAdmin, (req, res) => {
  db.prepare('DELETE FROM opcoes_frete WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// PATCH /api/db/opcoes-frete/:id/toggle
router.patch('/opcoes-frete/:id/toggle', requireAdmin, (req, res) => {
  const row = db.get('SELECT * FROM opcoes_frete WHERE id = ?', [req.params.id]);
  if (!row) return res.status(404).json({ error: 'Opção não encontrada' });
  const novoAtivo = row.ativo === 1 ? 0 : 1;
  db.prepare('UPDATE opcoes_frete SET ativo = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
    .run(novoAtivo, req.params.id);
  const updated = db.get('SELECT * FROM opcoes_frete WHERE id = ?', [req.params.id]);
  const parsed = {
    ...updated,
    categorias_ids: updated.categorias_ids ? JSON.parse(updated.categorias_ids) : [],
    produtos_ids: updated.produtos_ids ? JSON.parse(updated.produtos_ids) : []
  };
  res.json(parsed);
});

// PATCH /api/db/opcoes-frete/:id/reorder - Reordenar opções
router.patch('/opcoes-frete/:id/reorder', requireAdmin, (req, res) => {
  const { direction } = req.body; // 'up' ou 'down'
  const id = parseInt(req.params.id);
  
  const current = db.get('SELECT * FROM opcoes_frete WHERE id = ?', [id]);
  if (!current) return res.status(404).json({ error: 'Opção não encontrada' });
  
  const currentOrdem = current.ordem || 0;
  
  if (direction === 'up') {
    // Encontrar opção acima (menor ordem)
    const above = db.get(
      'SELECT * FROM opcoes_frete WHERE ordem < ? ORDER BY ordem DESC LIMIT 1',
      [currentOrdem]
    );
    
    if (above) {
      // Trocar ordens
      db.prepare('UPDATE opcoes_frete SET ordem = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
        .run(above.ordem, id);
      db.prepare('UPDATE opcoes_frete SET ordem = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
        .run(currentOrdem, above.id);
    }
  } else if (direction === 'down') {
    // Encontrar opção abaixo (maior ordem)
    const below = db.get(
      'SELECT * FROM opcoes_frete WHERE ordem > ? ORDER BY ordem ASC LIMIT 1',
      [currentOrdem]
    );
    
    if (below) {
      // Trocar ordens
      db.prepare('UPDATE opcoes_frete SET ordem = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
        .run(below.ordem, id);
      db.prepare('UPDATE opcoes_frete SET ordem = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
        .run(currentOrdem, below.id);
    }
  }
  
  // Retornar lista atualizada
  const rows = db.all('SELECT * FROM opcoes_frete ORDER BY ordem ASC, id ASC');
  const parsed = rows.map(row => ({
    ...row,
    categorias_ids: row.categorias_ids ? JSON.parse(row.categorias_ids) : [],
    produtos_ids: row.produtos_ids ? JSON.parse(row.produtos_ids) : []
  }));
  res.json(parsed);
});

export default router;
