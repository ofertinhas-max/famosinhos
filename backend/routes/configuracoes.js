import { Router } from 'express';
import { db } from '../db/index.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

const PUBLIC_KEYS = ['nome_loja', 'logo_loja', 'vendas_loja', 'tema', 'cpf_obrigatorio', 'categorias_ativas'];

// GET /api/db/configuracoes/loja — público (só chaves da loja: tema, nome, logo, etc.)
router.get('/configuracoes/loja', (req, res) => {
  const rows = db.all('SELECT chave, valor FROM configuracoes WHERE chave IN (' + PUBLIC_KEYS.map(() => '?').join(',') + ')', PUBLIC_KEYS);
  const obj = {};
  rows.forEach(r => { obj[r.chave] = r.valor; });
  res.json(obj);
});

// GET /api/db/configuracoes — exige admin (dados sensíveis).
router.get('/configuracoes', requireAdmin, (req, res) => {
  const rows = db.all('SELECT chave, valor FROM configuracoes');
  res.json(rows.map(r => ({ chave: r.chave, valor: r.valor })));
});

// GET /api/db/configuracoes/admin
router.get('/configuracoes/admin', requireAdmin, (req, res) => {
  const rows = db.all('SELECT chave, valor FROM configuracoes');
  const obj = {};
  rows.forEach(r => { obj[r.chave] = r.valor; });
  res.json(obj);
});

// GET /api/db/configuracoes/admin-full
router.get('/configuracoes/admin-full', requireAdmin, (req, res) => {
  const rows = db.all('SELECT chave, valor FROM configuracoes');
  const obj = {};
  rows.forEach(r => { obj[r.chave] = r.valor; });
  res.json(obj);
});

// GET /api/db/configuracoes/:chave — exige admin.
router.get('/configuracoes/:chave', requireAdmin, (req, res) => {
  const row = db.get('SELECT valor FROM configuracoes WHERE chave = ?', [req.params.chave]);
  if (!row) return res.status(404).json({ error: 'Configuração não encontrada' });
  res.json({ chave: req.params.chave, valor: row.valor });
});

// PUT /api/db/configuracoes/:chave
router.put('/configuracoes/:chave', requireAdmin, (req, res) => {
  const { valor } = req.body || {};
  db.prepare(`
    INSERT INTO configuracoes (chave, valor) VALUES (?, ?)
    ON CONFLICT(chave) DO UPDATE SET valor = excluded.valor
  `).run(req.params.chave, valor ?? '');
  const row = db.get('SELECT chave, valor FROM configuracoes WHERE chave = ?', [req.params.chave]);
  res.json(row);
});

export default router;
