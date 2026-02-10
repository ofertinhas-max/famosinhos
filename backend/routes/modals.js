import { Router } from 'express';
import { db } from '../db/index.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// ---- Modals custom (popups HTML+CSS por rota) ----
// GET /api/db/modals/custom
router.get('/modals/custom', requireAdmin, (req, res) => {
  const rows = db.all('SELECT id, rota, html_css, ativo, created_at FROM modals_custom ORDER BY id DESC');
  res.json(rows);
});

// GET /api/db/modals/custom/active (público: loja usa para injetar popups)
router.get('/modals/custom/active', (req, res) => {
  const rows = db.all('SELECT id, rota, html_css FROM modals_custom WHERE ativo = 1');
  res.json(rows);
});

// POST /api/db/modals/custom
router.post('/modals/custom', requireAdmin, (req, res) => {
  const { rota = '/', html_css = '' } = req.body || {};
  const result = db.prepare('INSERT INTO modals_custom (rota, html_css, ativo) VALUES (?, ?, 1)').run(String(rota).trim() || '/', String(html_css));
  const row = db.get('SELECT * FROM modals_custom WHERE id = ?', [result.lastInsertRowid]);
  res.status(201).json(row);
});

// PATCH /api/db/modals/custom/:id/toggle
router.patch('/modals/custom/:id/toggle', requireAdmin, (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
  db.run('UPDATE modals_custom SET ativo = 1 - ativo WHERE id = ?', [id]);
  const row = db.get('SELECT * FROM modals_custom WHERE id = ?', [id]);
  if (!row) return res.status(404).json({ error: 'Modal não encontrado' });
  res.json(row);
});

// DELETE /api/db/modals/custom/:id
router.delete('/modals/custom/:id', requireAdmin, (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
  const r = db.prepare('DELETE FROM modals_custom WHERE id = ?').run(id);
  if (r.changes === 0) return res.status(404).json({ error: 'Modal não encontrado' });
  res.json({ success: true });
});

// GET /api/db/modals/welcome-coupons (público: loja usa para modal de primeira visita; evita 404)
router.get('/modals/welcome-coupons', (req, res) => {
  res.json({ success: true, ativo: false });
});

// ---- Modals originais (modal1, modal2, modal3) ----
// GET /api/db/modals
router.get('/modals', requireAdmin, (req, res) => {
  const rows = db.all('SELECT id, ativo FROM modals');
  const list = rows.map(r => ({ ...r, nome: r.id, tipo: r.id }));
  res.json(list);
});

// PATCH /api/db/modals/:id/toggle
router.patch('/modals/:id/toggle', requireAdmin, (req, res) => {
  const modalId = req.params.id;
  
  // Buscar modal
  const modal = db.get('SELECT * FROM modals WHERE id = ?', [modalId]);
  
  if (!modal) {
    // Se não existir, criar com ativo = 0 (desativado por padrão)
    db.prepare('INSERT INTO modals (id, ativo) VALUES (?, 0)').run(modalId);
    return res.json({ id: modalId, ativo: 0 });
  }
  
  // Alternar status
  const novoStatus = modal.ativo === 1 ? 0 : 1;
  db.prepare('UPDATE modals SET ativo = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(novoStatus, modalId);
  
  const updated = db.get('SELECT * FROM modals WHERE id = ?', [modalId]);
  res.json(updated);
});

export default router;
