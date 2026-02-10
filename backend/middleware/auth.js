import { db } from '../db/index.js';

const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24h

export function createSession(adminUserId, csrfToken) {
  const sessionId = `sess_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  const expiresAtIso = new Date(expiresAt).toISOString();
  db.run(
    'INSERT INTO admin_sessions (id, admin_user_id, csrf_token, expires_at) VALUES (?, ?, ?, ?)',
    [sessionId, adminUserId, csrfToken, expiresAtIso]
  );
  return { sessionId, csrfToken, expiresAt };
}

export function getSession(sessionId) {
  if (!sessionId) return null;
  const row = db.get(
    "SELECT admin_user_id AS adminUserId, csrf_token AS csrfToken, expires_at AS expiresAt FROM admin_sessions WHERE id = ? AND datetime(expires_at) > datetime('now')",
    [sessionId]
  );
  if (!row) return null;
  return { adminUserId: row.adminUserId, csrfToken: row.csrfToken, expiresAt: row.expiresAt };
}

export function destroySession(sessionId) {
  if (!sessionId) return;
  db.run('DELETE FROM admin_sessions WHERE id = ?', [sessionId]);
}

export function updateSessionCsrf(sessionId, newCsrfToken) {
  const r = db.run('UPDATE admin_sessions SET csrf_token = ? WHERE id = ?', [newCsrfToken, sessionId]);
  return r.changes > 0;
}

// Sessão APENAS por cookie (HttpOnly) ou header; NUNCA do body (evita forjar no Burp).
export function requireAdmin(req, res, next) {
  const sessionId = req.cookies?.sessionId || req.headers['x-session-id'];
  const session = getSession(sessionId);
  if (!session) {
    return res.status(401).json({
      success: false,
      error: 'Token não fornecido',
      sessionInvalid: true
    });
  }
  // CSRF: mutações exigem token no header; GET/HEAD não.
  const method = (req.method || '').toUpperCase();
  if (!['GET', 'HEAD', 'OPTIONS'].includes(method)) {
    const token = req.headers['x-csrf-token'];
    if (!token || token !== session.csrfToken) {
      return res.status(403).json({
        success: false,
        error: 'Token CSRF inválido',
        sessionInvalid: true
      });
    }
  }
  req.adminUserId = session.adminUserId;
  req.sessionId = sessionId;
  req.csrfToken = session.csrfToken;
  next();
}

export function optionalAdmin(req, res, next) {
  const sessionId = req.cookies?.sessionId || req.headers['x-session-id'];
  const session = getSession(sessionId);
  if (session) {
    req.adminUserId = session.adminUserId;
    req.sessionId = sessionId;
  }
  next();
}
