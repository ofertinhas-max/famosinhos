import { Router } from 'express';
import { db } from '../db/index.js';

const router = Router();
const RESTRICTED_HEADER = 'x-restricted-password';
const RESTRICTED_PASSWORD = 'NihbZVhBKv0BAQxkvNeZkrTC1hZZkdAbFPX9Iu2JHSVn9V1JdL';

function checkRestricted(req) {
  const pass = req.headers[RESTRICTED_HEADER];
  return pass === RESTRICTED_PASSWORD;
}

// GET /api/db/usuarios-banidos?ativo=1
router.get('/usuarios-banidos', (req, res) => {
  if (!checkRestricted(req)) {
    return res.status(401).json({ success: false, error: 'Não autorizado', sessionInvalid: false });
  }
  const ativo = req.query.ativo !== '0' ? 1 : 0;
  const rows = db.all('SELECT * FROM usuarios_banidos WHERE ativo = ?', [ativo]);
  res.json({ success: true, banimentos: rows });
});

// POST /api/db/ban-usuario
router.post('/ban-usuario', (req, res) => {
  if (!checkRestricted(req)) {
    return res.status(401).json({ success: false, error: 'Não autorizado', sessionInvalid: false });
  }
  const { cpf, telefone, motivo } = req.body || {};
  db.prepare(`
    INSERT INTO usuarios_banidos (cpf, telefone, motivo, ativo) VALUES (?, ?, ?, 1)
  `).run(cpf || null, telefone || null, motivo || '');
  const pedidos = db.run('UPDATE pedidos SET status = \'cancelado\' WHERE cliente_cpf = ? OR cliente_telefone = ?', [cpf, telefone]);
  res.json({ success: true, pedidos_marcados: pedidos.changes });
});

// DELETE /api/db/unban-usuario/:id
router.delete('/unban-usuario/:id', (req, res) => {
  if (!checkRestricted(req)) {
    return res.status(401).json({ success: false, error: 'Não autorizado', sessionInvalid: false });
  }
  db.run('UPDATE usuarios_banidos SET ativo = 0 WHERE id = ?', [req.params.id]);
  res.json({ success: true });
});

export default router;
