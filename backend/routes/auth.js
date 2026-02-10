import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../db/index.js';
import { createSession, getSession, updateSessionCsrf } from '../middleware/auth.js';

const router = Router();

// POST /api/user/login
router.post('/login', (req, res) => {
  const { username, senha } = req.body || {};
  if (!username || !senha) {
    return res.status(400).json({ success: false, error: 'Usuário e senha obrigatórios' });
  }
  const admin = db.get('SELECT id, password_hash FROM admin_users WHERE username = ?', [username]);
  if (!admin || !bcrypt.compareSync(senha, admin.password_hash)) {
    return res.json({ success: false, error: 'Credenciais inválidas' });
  }
  const csrfToken = `csrf_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const { sessionId } = createSession(admin.id, csrfToken);
  const isProduction = process.env.NODE_ENV === 'production';
  res.cookie('sessionId', sessionId, {
    httpOnly: true,
    secure: isProduction,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'lax',
    path: '/'
  });
  // sessionId no body só para o front não redirecionar (ele checa localStorage). Autorização = só cookie.
  res.json({
    success: true,
    sessionId,
    csrfToken
  });
});

// POST /api/user/validate — retorna 401 quando inválido (front não pode “enganar” trocando só o body).
router.post('/validate', (req, res) => {
  const sessionId = req.cookies?.sessionId || req.headers['x-session-id'];
  const session = getSession(sessionId);
  if (!session) {
    return res.status(401).json({
      valid: false,
      reason: 'Sessão não encontrada ou expirada',
      sessionInvalid: true
    });
  }
  res.json({ valid: true });
});

// POST /api/user/refresh — renova csrfToken da sessão (cookie já enviado)
router.post('/refresh', (req, res) => {
  const sessionId = req.cookies?.sessionId || req.headers['x-session-id'];
  const session = getSession(sessionId);
  if (!session) {
    return res.status(401).json({ success: false, sessionInvalid: true });
  }
  const newCsrf = `csrf_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  updateSessionCsrf(sessionId, newCsrf);
  res.json({ success: true, csrfToken: newCsrf });
});

export default router;
