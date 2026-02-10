import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../db/index.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// POST /api/db/painelad/alterar-senha
router.post('/alterar-senha', requireAdmin, (req, res) => {
  const { senhaAtual, novaSenha } = req.body || {};
  if (!senhaAtual || !novaSenha) {
    return res.status(400).json({ success: false, error: 'Senhas obrigatórias' });
  }
  const admin = db.get('SELECT password_hash FROM admin_users WHERE id = ?', [req.adminUserId]);
  if (!admin || !bcrypt.compareSync(senhaAtual, admin.password_hash)) {
    return res.json({ success: false, error: 'Senha atual incorreta' });
  }
  const hash = bcrypt.hashSync(novaSenha, 10);
  db.run('UPDATE admin_users SET password_hash = ? WHERE id = ?', [hash, req.adminUserId]);
  res.json({ success: true });
});

// POST /api/db/painelad/importar-produtos
router.post('/importar-produtos', requireAdmin, (req, res) => {
  const body = req.body || {};
  const produtos = body.produtos || [];
  const categorias = body.categorias || [];
  const inserted = [];
  for (const c of categorias) {
    const slug = (c.nome || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    try {
      db.prepare('INSERT OR IGNORE INTO categorias (id, nome, slug, ativo) VALUES (?, ?, ?, 1)')
        .run(c.id, c.nome || '', slug);
    } catch (_) {
      db.prepare('INSERT INTO categorias (nome, slug, ativo) VALUES (?, ?, 1)')
        .run(c.nome || '', slug);
    }
  }
  for (const p of produtos) {
    const result = db.prepare(`
      INSERT INTO produtos (nome, descricao, preco, preco_antigo, imagem, estoque, principal, vendas, ativo)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      p.nome || '',
      p.descricao || '',
      Number(p.preco) ?? 0,
      p.preco_antigo != null ? Number(p.preco_antigo) : null,
      p.imagem || null,
      Number(p.estoque) ?? 0,
      p.principal ? 1 : 0,
      Number(p.vendas) ?? 0,
      p.ativo !== 0 ? 1 : 0
    );
    inserted.push(result.lastInsertRowid);
    if (p.categoria_id || (p.categorias_ids && p.categorias_ids[0])) {
      const cid = p.categoria_id || (p.categorias_ids && p.categorias_ids[0]);
      if (cid) {
        db.run('INSERT OR IGNORE INTO produto_categorias (produto_id, categoria_id) VALUES (?, ?)', [result.lastInsertRowid, cid]);
      }
    }
  }
  res.json({ success: true, importados: inserted.length });
});

export default router;
