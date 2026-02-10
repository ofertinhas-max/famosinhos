import { Router } from 'express';
import { db } from '../db/index.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// GET /api/db/tracking-scripts (admin: lista todos; retorna tipo, codigo, ordem)
router.get('/tracking-scripts', requireAdmin, (req, res) => {
  const rows = db.all('SELECT * FROM tracking_scripts ORDER BY ordem ASC, id ASC');
  res.json(rows);
});

// GET /api/db/tracking-scripts/active (público: só ativos, ordenado; usado pela loja para injetar pixels)
router.get('/tracking-scripts/active', (req, res) => {
  const rows = db.all('SELECT * FROM tracking_scripts WHERE ativo = 1 ORDER BY ordem ASC, id ASC');
  res.json(rows);
});

// GET /api/db/tracking-scripts/:id
router.get('/tracking-scripts/:id', (req, res) => {
  const row = db.get('SELECT * FROM tracking_scripts WHERE id = ?', [req.params.id]);
  if (!row) return res.status(404).json({ error: 'Script não encontrado' });
  res.json(row);
});

// POST /api/db/tracking-scripts (admin: aceita nome, tipo, codigo, access_token, script, ativo, ordem)
router.post('/tracking-scripts', requireAdmin, (req, res) => {
  const b = req.body || {};
  const nome = b.nome || '';
  const tipo = (b.tipo || 'tiktok').toLowerCase();
  const codigo = typeof b.codigo === 'string' ? b.codigo.trim() : '';
  const access_token = typeof b.access_token === 'string' ? b.access_token.trim() : '';
  const script = b.script || '';
  const ativo = b.ativo !== 0 ? 1 : 0;
  const ordem = parseInt(b.ordem, 10);
  const ordemVal = Number.isFinite(ordem) ? ordem : 0;
  const result = db.prepare(`
    INSERT INTO tracking_scripts (nome, tipo, codigo, access_token, script, ativo, ordem) VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(nome, tipo, codigo || null, access_token || null, script || null, ativo, ordemVal);
  const row = db.get('SELECT * FROM tracking_scripts WHERE id = ?', [result.lastInsertRowid]);
  res.status(201).json(row);
});

// PUT /api/db/tracking-scripts/:id
router.put('/tracking-scripts/:id', requireAdmin, (req, res) => {
  const b = req.body || {};
  const nome = b.nome ?? '';
  const tipo = (b.tipo || 'tiktok').toLowerCase();
  const codigo = typeof b.codigo === 'string' ? b.codigo.trim() : (b.codigo ?? '');
  const access_token = typeof b.access_token === 'string' ? b.access_token.trim() : (b.access_token ?? '');
  const script = b.script ?? '';
  const ativo = b.ativo !== 0 ? 1 : 0;
  const ordem = parseInt(b.ordem, 10);
  const ordemVal = Number.isFinite(ordem) ? ordem : 0;
  db.prepare(`
    UPDATE tracking_scripts SET nome = ?, tipo = ?, codigo = ?, access_token = ?, script = ?, ativo = ?, ordem = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
  `).run(nome, tipo, codigo || null, access_token || null, script || null, ativo, ordemVal, req.params.id);
  const row = db.get('SELECT * FROM tracking_scripts WHERE id = ?', [req.params.id]);
  res.json(row);
});

// DELETE /api/db/tracking-scripts/:id
router.delete('/tracking-scripts/:id', requireAdmin, (req, res) => {
  db.run('DELETE FROM tracking_scripts WHERE id = ?', [req.params.id]);
  res.json({ success: true });
});

// PATCH /api/db/tracking-scripts/:id/toggle
router.patch('/tracking-scripts/:id/toggle', requireAdmin, (req, res) => {
  db.run('UPDATE tracking_scripts SET ativo = 1 - ativo WHERE id = ?', [req.params.id]);
  const row = db.get('SELECT * FROM tracking_scripts WHERE id = ?', [req.params.id]);
  res.json(row);
});

export default router;
