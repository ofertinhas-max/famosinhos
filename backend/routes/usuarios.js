import { Router } from 'express';
import { db } from '../db/index.js';

const router = Router();

function normalizeLogin(login) {
  if (typeof login !== 'string') return '';
  return login.replace(/\D/g, '').trim() || login.trim();
}

// POST /api/usuarios/login — body { login } (CPF/email/telefone)
router.post('/login', (req, res) => {
  const login = normalizeLogin(req.body?.login || '');
  if (!login) return res.json({ success: false, error: 'Login obrigatório' });
  let usuario = db.get('SELECT * FROM usuarios WHERE cpf = ? OR email = ? OR telefone = ?', [login, login, login]);
  if (!usuario) {
    const cpf = /^\d+$/.test(login) ? login : null;
    const email = login.includes('@') ? login : null;
    const telefone = cpf && login.length >= 10 ? login : null;
    const result = db.prepare('INSERT INTO usuarios (cpf, nome, email, telefone) VALUES (?, ?, ?, ?)').run(cpf || null, '', email || '', telefone || login);
    usuario = db.get('SELECT * FROM usuarios WHERE id = ?', [result.lastInsertRowid]);
  }
  res.json({
    success: true,
    usuario: {
      id: usuario.id,
      cpf: usuario.cpf,
      nome: usuario.nome,
      email: usuario.email,
      telefone: usuario.telefone
    }
  });
});

// Rotas mais específicas primeiro (:id/enderecos, :id/pedidos)
// GET /api/usuarios/:id/enderecos
router.get('/:id/enderecos', (req, res) => {
  const id = req.params.id;
  const usuario = db.get('SELECT * FROM usuarios WHERE id = ? OR cpf = ?', [id, id]);
  if (!usuario) return res.status(404).json({ success: false, error: 'Usuário não encontrado' });
  const rows = db.all('SELECT * FROM enderecos WHERE usuario_id = ? ORDER BY id', [usuario.id]);
  res.json({ success: true, enderecos: rows });
});

// POST /api/usuarios/:id/enderecos
router.post('/:id/enderecos', (req, res) => {
  const id = req.params.id;
  const usuario = db.get('SELECT * FROM usuarios WHERE id = ? OR cpf = ?', [id, id]);
  if (!usuario) return res.status(404).json({ success: false, error: 'Usuário não encontrado' });
  const b = req.body || {};
  db.prepare(`
    INSERT INTO enderecos (usuario_id, nome, endereco, numero, complemento, bairro, cidade, estado, cep, padrao)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    usuario.id,
    b.nome ?? '',
    b.endereco ?? '',
    b.numero ?? '',
    b.complemento ?? null,
    b.bairro ?? '',
    b.cidade ?? '',
    b.estado ?? '',
    b.cep ?? '',
    b.padrao ? 1 : 0
  );
  const rows = db.all('SELECT * FROM enderecos WHERE usuario_id = ? ORDER BY id', [usuario.id]);
  res.status(201).json({ success: true, enderecos: rows });
});

// GET /api/usuarios/:id/pedidos — checkout usa para obter usuario_id
router.get('/:id/pedidos', (req, res) => {
  const id = req.params.id;
  const usuario = db.get('SELECT * FROM usuarios WHERE id = ? OR cpf = ?', [id, id]);
  if (!usuario) return res.json({ success: false });
  res.json({ success: true, usuario_id: usuario.id });
});

// GET /api/usuarios/:id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const usuario = db.get('SELECT * FROM usuarios WHERE id = ? OR cpf = ?', [id, id]);
  if (!usuario) return res.status(404).json({ success: false, error: 'Usuário não encontrado' });
  res.json({ success: true, ...usuario });
});

// PUT /api/usuarios/:id
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const b = req.body || {};
  const usuario = db.get('SELECT * FROM usuarios WHERE id = ? OR cpf = ?', [id, id]);
  if (!usuario) return res.status(404).json({ success: false, error: 'Usuário não encontrado' });
  db.prepare('UPDATE usuarios SET nome = ?, email = ?, telefone = ? WHERE id = ?').run(
    b.nome ?? usuario.nome,
    b.email ?? usuario.email,
    b.telefone ?? usuario.telefone,
    usuario.id
  );
  const updated = db.get('SELECT * FROM usuarios WHERE id = ?', [usuario.id]);
  res.json({ success: true, ...updated });
});

export default router;
