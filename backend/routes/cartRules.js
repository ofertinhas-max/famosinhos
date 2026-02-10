import { Router } from 'express';
import { db } from '../db/index.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// GET /api/db/cart-rules/active — SEM auth: uso da loja no checkout (único GET público em /api/db).
router.get('/cart-rules/active', (req, res) => {
  const rows = db.all('SELECT * FROM cart_rules WHERE ativo = 1');
  res.json(rows);
});

// GET /api/db/cart-rules — exige admin (lista completa).
router.get('/cart-rules', requireAdmin, (req, res) => {
  const rows = db.all('SELECT * FROM cart_rules ORDER BY id');
  res.json(rows);
});

// POST /api/db/cart-rules
router.post('/cart-rules', requireAdmin, (req, res) => {
  const b = req.body || {};
  
  // Validações
  const quantidadeMinima = parseInt(b.quantidade_minima) || null;
  const valorFixo = parseFloat(b.valor_fixo) || null;
  const prioridade = parseInt(b.prioridade) || 0;
  
  if (quantidadeMinima !== null && quantidadeMinima <= 0) {
    return res.status(400).json({ error: 'Quantidade mínima deve ser maior que zero' });
  }
  if (valorFixo !== null && valorFixo <= 0) {
    return res.status(400).json({ error: 'Valor fixo deve ser maior que zero' });
  }
  
  const result = db.prepare(`
    INSERT INTO cart_rules (nome, regra, quantidade_minima, valor_fixo, prioridade, ativo) 
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    b.nome || '', 
    b.regra || '', 
    quantidadeMinima,
    valorFixo,
    prioridade,
    b.ativo !== 0 ? 1 : 0
  );
  const row = db.get('SELECT * FROM cart_rules WHERE id = ?', [result.lastInsertRowid]);
  res.status(201).json(row);
});

// PUT /api/db/cart-rules/:id
router.put('/cart-rules/:id', requireAdmin, (req, res) => {
  const b = req.body || {};
  
  // Validações
  const quantidadeMinima = b.quantidade_minima !== undefined ? parseInt(b.quantidade_minima) : null;
  const valorFixo = b.valor_fixo !== undefined ? parseFloat(b.valor_fixo) : null;
  const prioridade = parseInt(b.prioridade) || 0;
  
  if (quantidadeMinima !== null && quantidadeMinima <= 0) {
    return res.status(400).json({ error: 'Quantidade mínima deve ser maior que zero' });
  }
  if (valorFixo !== null && valorFixo <= 0) {
    return res.status(400).json({ error: 'Valor fixo deve ser maior que zero' });
  }
  
  db.prepare(`
    UPDATE cart_rules 
    SET nome = ?, regra = ?, quantidade_minima = ?, valor_fixo = ?, prioridade = ?, ativo = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(
    b.nome ?? '', 
    b.regra ?? '', 
    quantidadeMinima,
    valorFixo,
    prioridade,
    b.ativo !== 0 ? 1 : 0, 
    req.params.id
  );
  const row = db.get('SELECT * FROM cart_rules WHERE id = ?', [req.params.id]);
  res.json(row);
});

// DELETE /api/db/cart-rules/:id
router.delete('/cart-rules/:id', requireAdmin, (req, res) => {
  db.prepare('DELETE FROM cart_rules WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// PATCH /api/db/cart-rules/:id/toggle
router.patch('/cart-rules/:id/toggle', requireAdmin, (req, res) => {
  const row = db.get('SELECT * FROM cart_rules WHERE id = ?', [req.params.id]);
  if (!row) return res.status(404).json({ error: 'Regra não encontrada' });
  const novoAtivo = row.ativo === 1 ? 0 : 1;
  db.prepare('UPDATE cart_rules SET ativo = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(novoAtivo, req.params.id);
  const updated = db.get('SELECT * FROM cart_rules WHERE id = ?', [req.params.id]);
  res.json(updated);
});

export default router;
