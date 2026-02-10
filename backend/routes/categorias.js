import { Router } from 'express';
import { db } from '../db/index.js';
import { requireAdmin, optionalAdmin } from '../middleware/auth.js';

const router = Router();

// GET /api/db/categorias
router.get('/categorias', optionalAdmin, (req, res) => {
  const rows = db.all('SELECT * FROM categorias ORDER BY nome');
  res.json(rows);
});

// GET /api/db/categorias/ativas
router.get('/categorias/ativas', (req, res) => {
  const rows = db.all('SELECT * FROM categorias WHERE ativo = 1 ORDER BY nome');
  res.json(rows);
});

// GET /api/db/categorias/:id
router.get('/categorias/:id', (req, res) => {
  const row = db.get('SELECT * FROM categorias WHERE id = ?', [req.params.id]);
  if (!row) return res.status(404).json({ error: 'Categoria não encontrada' });
  res.json(row);
});

// GET /api/db/categorias/:id/produtos
router.get('/categorias/:id/produtos', (req, res) => {
  const rows = db.all(`
    SELECT p.* FROM produtos p
    JOIN produto_categorias pc ON pc.produto_id = p.id
    WHERE pc.categoria_id = ? AND p.ativo = 1
  `, [req.params.id]);
  res.json(rows);
});

// POST /api/db/categorias
router.post('/categorias', requireAdmin, (req, res) => {
  const b = req.body || {};
  const slug = (b.nome || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const ordem = parseInt(b.ordem) || 0;
  const result = db.prepare(`
    INSERT INTO categorias (nome, slug, ativo, ordem) VALUES (?, ?, ?, ?)
  `).run(b.nome || '', slug, b.ativo !== 0 ? 1 : 0, ordem);
  const row = db.get('SELECT * FROM categorias WHERE id = ?', [result.lastInsertRowid]);
  res.status(201).json(row);
});

// PUT /api/db/categorias/:id
router.put('/categorias/:id', requireAdmin, (req, res) => {
  const b = req.body || {};
  const slug = (b.nome || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const ordem = parseInt(b.ordem) || 0;
  db.prepare(`
    UPDATE categorias SET nome = ?, slug = ?, ativo = ?, ordem = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
  `).run(b.nome ?? '', slug, b.ativo !== 0 ? 1 : 0, ordem, req.params.id);
  const row = db.get('SELECT * FROM categorias WHERE id = ?', [req.params.id]);
  res.json(row);
});

// PUT /api/db/categorias/:id/produtos
router.put('/categorias/:id/produtos', requireAdmin, (req, res) => {
  const { produto_ids } = req.body || {};
  db.run('DELETE FROM produto_categorias WHERE categoria_id = ?', [req.params.id]);
  if (Array.isArray(produto_ids)) {
    for (const pid of produto_ids) {
      db.run('INSERT OR IGNORE INTO produto_categorias (produto_id, categoria_id) VALUES (?, ?)', [pid, req.params.id]);
    }
  }
  res.json({ success: true });
});

// DELETE /api/db/categorias/:id
router.delete('/categorias/:id', requireAdmin, (req, res) => {
  db.run('DELETE FROM produto_categorias WHERE categoria_id = ?', [req.params.id]);
  db.run('DELETE FROM categorias WHERE id = ?', [req.params.id]);
  res.json({ success: true });
});

// PATCH /api/db/categorias/:id/toggle
router.patch('/categorias/:id/toggle', requireAdmin, (req, res) => {
  db.run('UPDATE categorias SET ativo = 1 - ativo, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [req.params.id]);
  const row = db.get('SELECT * FROM categorias WHERE id = ?', [req.params.id]);
  res.json(row);
});

export default router;
