import { Router } from 'express';
import { db } from '../db/index.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// GET /api/db/brindes — exige admin (lista completa).
router.get('/brindes', requireAdmin, (req, res) => {
  const rows = db.all('SELECT * FROM brindes ORDER BY id');
  res.json(rows);
});

// GET /api/db/brindes/active
router.get('/brindes/active', (req, res) => {
  const row = db.get('SELECT * FROM brindes WHERE ativo = 1 LIMIT 1');
  res.json(row || null);
});

// GET /api/db/brindes/:id
router.get('/brindes/:id', requireAdmin, (req, res) => {
  const row = db.get('SELECT * FROM brindes WHERE id = ?', [req.params.id]);
  if (!row) return res.status(404).json({ error: 'Brinde não encontrado' });
  res.json(row);
});

// POST /api/db/brindes
router.post('/brindes', requireAdmin, (req, res) => {
  const b = req.body || {};
  const result = db.prepare(`
    INSERT INTO brindes (nome, descricao, imagem, ativo) VALUES (?, ?, ?, ?)
  `).run(b.nome || '', b.descricao || '', b.imagem || null, b.ativo !== 0 ? 1 : 0);
  const row = db.get('SELECT * FROM brindes WHERE id = ?', [result.lastInsertRowid]);
  res.status(201).json(row);
});

// PUT /api/db/brindes/:id
router.put('/brindes/:id', requireAdmin, (req, res) => {
  const b = req.body || {};
  db.prepare(`
    UPDATE brindes SET nome = ?, descricao = ?, imagem = ?, ativo = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
  `).run(b.nome ?? '', b.descricao ?? '', b.imagem ?? null, b.ativo !== 0 ? 1 : 0, req.params.id);
  const row = db.get('SELECT * FROM brindes WHERE id = ?', [req.params.id]);
  res.json(row);
});

// DELETE /api/db/brindes/:id
router.delete('/brindes/:id', requireAdmin, (req, res) => {
  db.prepare('DELETE FROM brindes WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// PATCH /api/db/brindes/:id/toggle
router.patch('/brindes/:id/toggle', requireAdmin, (req, res) => {
  const row = db.get('SELECT * FROM brindes WHERE id = ?', [req.params.id]);
  if (!row) return res.status(404).json({ error: 'Brinde não encontrado' });
  const novoAtivo = row.ativo === 1 ? 0 : 1;
  db.prepare('UPDATE brindes SET ativo = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(novoAtivo, req.params.id);
  const updated = db.get('SELECT * FROM brindes WHERE id = ?', [req.params.id]);
  res.json(updated);
});

export default router;
