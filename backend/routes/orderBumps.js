import { Router } from 'express';
import { db } from '../db/index.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// GET /api/db/order-bumps — exige admin (lista completa).
router.get('/order-bumps', requireAdmin, (req, res) => {
  const rows = db.all(`
    SELECT ob.*, p.nome as produto_nome, p.imagem as produto_imagem
    FROM order_bumps ob
    LEFT JOIN produtos p ON p.id = ob.produto_id
    ORDER BY ob.id DESC
  `);
  res.json(rows);
});

// GET /api/db/order-bumps/active
router.get('/order-bumps/active', (req, res) => {
  const rows = db.all(`
    SELECT ob.*, p.nome as produto_nome, p.imagem as produto_imagem
    FROM order_bumps ob
    LEFT JOIN produtos p ON p.id = ob.produto_id
    WHERE ob.ativo = 1
  `);
  res.json(rows);
});

// GET /api/db/order-bumps/:id
router.get('/order-bumps/:id', requireAdmin, (req, res) => {
  const row = db.get('SELECT * FROM order_bumps WHERE id = ?', [req.params.id]);
  if (!row) return res.status(404).json({ error: 'Order bump não encontrado' });
  res.json(row);
});

// POST /api/db/order-bumps
router.post('/order-bumps', requireAdmin, (req, res) => {
  const b = req.body || {};
  
  // Validações
  if (!b.produto_id || b.produto_id <= 0) {
    return res.status(400).json({ error: 'produto_id é obrigatório' });
  }
  
  // Verificar se produto existe
  const produto = db.get('SELECT id FROM produtos WHERE id = ?', [b.produto_id]);
  if (!produto) {
    return res.status(400).json({ error: 'Produto não encontrado' });
  }
  
  // Validar desconto percentual (0-100)
  const desconto = Number(b.desconto_percentual) || 0;
  if (desconto < 0 || desconto > 100) {
    return res.status(400).json({ error: 'Desconto deve estar entre 0 e 100%' });
  }
  
  const result = db.prepare(`
    INSERT INTO order_bumps (produto_id, titulo_customizado, descricao_customizada, desconto_percentual, imagem, ativo, categorias_ids)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    b.produto_id,
    b.titulo_customizado ?? '',
    b.descricao_customizada ?? '',
    desconto,
    b.imagem ?? null,
    b.ativo !== 0 ? 1 : 0,
    Array.isArray(b.categorias_ids) ? b.categorias_ids.join(',') : (b.categorias_ids || null)
  );
  const row = db.get('SELECT * FROM order_bumps WHERE id = ?', [result.lastInsertRowid]);
  res.status(201).json(row);
});

// PUT /api/db/order-bumps/:id
router.put('/order-bumps/:id', requireAdmin, (req, res) => {
  const b = req.body || {};
  
  // Validações
  if (b.produto_id && b.produto_id > 0) {
    const produto = db.get('SELECT id FROM produtos WHERE id = ?', [b.produto_id]);
    if (!produto) {
      return res.status(400).json({ error: 'Produto não encontrado' });
    }
  }
  
  // Validar desconto percentual (0-100)
  const desconto = Number(b.desconto_percentual) || 0;
  if (desconto < 0 || desconto > 100) {
    return res.status(400).json({ error: 'Desconto deve estar entre 0 e 100%' });
  }
  
  db.prepare(`
    UPDATE order_bumps SET
      produto_id = ?, titulo_customizado = ?, descricao_customizada = ?, desconto_percentual = ?, imagem = ?, ativo = ?, categorias_ids = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(
    b.produto_id ?? 0,
    b.titulo_customizado ?? '',
    b.descricao_customizada ?? '',
    desconto,
    b.imagem ?? null,
    b.ativo !== 0 ? 1 : 0,
    Array.isArray(b.categorias_ids) ? b.categorias_ids.join(',') : (b.categorias_ids || null),
    req.params.id
  );
  const row = db.get('SELECT * FROM order_bumps WHERE id = ?', [req.params.id]);
  res.json(row);
});

// DELETE /api/db/order-bumps/:id
router.delete('/order-bumps/:id', requireAdmin, (req, res) => {
  db.prepare('DELETE FROM order_bumps WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// PATCH /api/db/order-bumps/:id/toggle
router.patch('/order-bumps/:id/toggle', requireAdmin, (req, res) => {
  db.run('UPDATE order_bumps SET ativo = 1 - ativo, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [req.params.id]);
  const row = db.get('SELECT * FROM order_bumps WHERE id = ?', [req.params.id]);
  res.json(row);
});

export default router;
