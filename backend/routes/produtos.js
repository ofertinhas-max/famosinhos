import { Router } from 'express';
import { db } from '../db/index.js';
import { requireAdmin, optionalAdmin } from '../middleware/auth.js';

const router = Router();

// GET /api/db/produtos (loja e admin)
router.get('/produtos', optionalAdmin, (req, res) => {
  const rows = db.all(`
    SELECT p.*,
      (SELECT GROUP_CONCAT(c.id) FROM produto_categorias pc JOIN categorias c ON c.id = pc.categoria_id WHERE pc.produto_id = p.id) as categoria_ids
    FROM produtos p
    WHERE p.ativo = 1
    ORDER BY p.id DESC
  `);
  const withCategoria = rows.map(p => {
    const catIds = p.categoria_ids ? p.categoria_ids.split(',').filter(Boolean) : [];
    const cat = catIds[0] ? db.get('SELECT nome FROM categorias WHERE id = ?', [catIds[0]]) : null;

    // Parsear campo imagem (de string JSON para array)
    if (p.imagem && typeof p.imagem === 'string') {
      try {
        p.imagem = JSON.parse(p.imagem);
      } catch {
        // Manter como está
      }
    }

    // Parsear campo variacoes (de string JSON para objeto)
    if (p.variacoes && typeof p.variacoes === 'string') {
      try {
        p.variacoes = JSON.parse(p.variacoes);
      } catch {
        p.variacoes = null;
      }
    }

    // Adicionar alias vendidos para compatibilidade com frontend
    p.vendidos = p.vendas;

    return { ...p, categoria: cat?.nome || '', categoria_ids: p.categoria_ids };
  });
  res.json(withCategoria);
});

// GET /api/db/produtos/top-vendidos
router.get('/produtos/top-vendidos', optionalAdmin, (req, res) => {
  const rows = db.all(`
    SELECT p.*, COALESCE(SUM(pi.quantidade), 0) as total_vendido
    FROM produtos p
    LEFT JOIN pedido_itens pi ON pi.produto_id = p.id
    LEFT JOIN pedidos ped ON ped.id = pi.pedido_id AND ped.status IN ('pago', 'entregue')
    WHERE p.ativo = 1
    GROUP BY p.id
    ORDER BY total_vendido DESC
    LIMIT 20
  `);
  res.json(rows);
});

// GET /api/db/produtos/:id
router.get('/produtos/:id', (req, res) => {
  const p = db.get('SELECT * FROM produtos WHERE id = ?', [req.params.id]);
  if (!p) return res.status(404).json({ error: 'Produto não encontrado' });
  const cats = db.all('SELECT categoria_id FROM produto_categorias WHERE produto_id = ?', [req.params.id]);
  p.categorias_ids = cats.map(c => c.categoria_id);

  // Parsear campo imagem (de string JSON para array)
  if (p.imagem && typeof p.imagem === 'string') {
    try {
      p.imagem = JSON.parse(p.imagem);
    } catch {
      // Se não for JSON válido, manter como está
    }
  }

  // Parsear campo variacoes (de string JSON para objeto)
  if (p.variacoes && typeof p.variacoes === 'string') {
    try {
      p.variacoes = JSON.parse(p.variacoes);
    } catch {
      p.variacoes = null;
    }
  }

  // Adicionar alias vendidos para compatibilidade com frontend
  p.vendidos = p.vendas;

  res.json(p);
});

// GET /api/db/produtos/:id/categorias
router.get('/produtos/:id/categorias', (req, res) => {
  const rows = db.all(`
    SELECT c.* FROM categorias c
    JOIN produto_categorias pc ON pc.categoria_id = c.id
    WHERE pc.produto_id = ?
  `, [req.params.id]);
  res.json(rows);
});

// POST /api/db/produtos
router.post('/produtos', requireAdmin, (req, res) => {
  const b = req.body || {};
  const result = db.prepare(`
    INSERT INTO produtos (nome, descricao, preco, preco_antigo, imagem, estoque, principal, vendas, ativo, frete_gratis, oculto, rating, tem_variacoes, variacoes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    b.nome || '',
    b.descricao || '',
    Number(b.preco) || 0,
    b.preco_antigo != null ? Number(b.preco_antigo) : null,
    Array.isArray(b.imagem) ? JSON.stringify(b.imagem) : (b.imagem || null),
    Number(b.estoque) ?? 0,
    b.principal ? 1 : 0,
    Number(b.vendas ?? b.vendidos) ?? 0,
    b.ativo !== 0 ? 1 : 0,
    b.frete_gratis ? 1 : 0,
    b.oculto ? 1 : 0,
    Number(b.rating) ?? 0,
    b.tem_variacoes ? 1 : 0,
    b.variacoes || null
  );
  const id = result.lastInsertRowid;
  if (b.categorias_ids && Array.isArray(b.categorias_ids)) {
    for (const cid of b.categorias_ids) {
      db.run('INSERT OR IGNORE INTO produto_categorias (produto_id, categoria_id) VALUES (?, ?)', [id, cid]);
    }
  }
  const prod = db.get('SELECT * FROM produtos WHERE id = ?', [id]);
  res.status(201).json(prod);
});

// PUT /api/db/produtos/:id
router.put('/produtos/:id', requireAdmin, (req, res) => {
  const b = req.body || {};
  db.prepare(`
    UPDATE produtos SET
      nome = ?, descricao = ?, preco = ?, preco_antigo = ?, imagem = ?, estoque = ?, principal = ?, vendas = ?, ativo = ?, frete_gratis = ?, oculto = ?, rating = ?, tem_variacoes = ?, variacoes = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(
    b.nome ?? '',
    b.descricao ?? '',
    Number(b.preco) ?? 0,
    b.preco_antigo != null ? Number(b.preco_antigo) : null,
    Array.isArray(b.imagem) ? JSON.stringify(b.imagem) : (b.imagem ?? null),
    Number(b.estoque) ?? 0,
    b.principal ? 1 : 0,
    Number(b.vendas ?? b.vendidos) ?? 0,
    b.ativo !== 0 ? 1 : 0,
    b.frete_gratis ? 1 : 0,
    b.oculto ? 1 : 0,
    Number(b.rating) ?? 0,
    b.tem_variacoes ? 1 : 0,
    b.variacoes ?? null,
    req.params.id
  );
  if (b.categorias_ids && Array.isArray(b.categorias_ids)) {
    db.run('DELETE FROM produto_categorias WHERE produto_id = ?', [req.params.id]);
    for (const cid of b.categorias_ids) {
      db.run('INSERT OR IGNORE INTO produto_categorias (produto_id, categoria_id) VALUES (?, ?)', [req.params.id, cid]);
    }
  }
  const prod = db.get('SELECT * FROM produtos WHERE id = ?', [req.params.id]);
  res.json(prod);
});

// PUT /api/db/produtos/:id/categorias
router.put('/produtos/:id/categorias', requireAdmin, (req, res) => {
  const { categoria_ids } = req.body || {};
  db.run('DELETE FROM produto_categorias WHERE produto_id = ?', [req.params.id]);
  if (Array.isArray(categoria_ids)) {
    for (const cid of categoria_ids) {
      db.run('INSERT OR IGNORE INTO produto_categorias (produto_id, categoria_id) VALUES (?, ?)', [req.params.id, cid]);
    }
  }
  res.json({ success: true });
});

// DELETE /api/db/produtos/:id
router.delete('/produtos/:id', requireAdmin, (req, res) => {
  try {
    const id = req.params.id;
    const prod = db.get('SELECT id FROM produtos WHERE id = ?', [id]);
    if (!prod) {
      return res.status(404).json({ success: false, error: 'Produto não encontrado' });
    }
    // Desvincula itens de pedidos (mantém histórico com nome/preco)
    db.prepare('UPDATE pedido_itens SET produto_id = NULL WHERE produto_id = ?').run(id);
    // Desconecta order bumps (não exclui): ficam sem produto até o admin vincular outro
    db.prepare('UPDATE order_bumps SET produto_id = NULL WHERE produto_id = ?').run(id);
    db.prepare('DELETE FROM produtos WHERE id = ?').run(id);
    // Se não sobrou nenhum produto, zera o contador para o próximo ter id 1
    const restantes = db.get('SELECT COUNT(*) as c FROM produtos').c;
    if (restantes === 0) {
      try { db.prepare("DELETE FROM sqlite_sequence WHERE name='produtos'").run(); } catch (_) {}
    }
    res.json({ success: true });
  } catch (err) {
    console.error('[Produtos] Erro ao deletar:', err);
    res.status(500).json({ success: false, error: err.message || 'Erro ao deletar produto' });
  }
});

// DELETE /api/db/painelad/produtos/limpar-todos - Apaga todos e zera contadores de id
router.delete('/painelad/produtos/limpar-todos', requireAdmin, (req, res) => {
  try {
    db.prepare('DELETE FROM produto_categorias').run();
    db.prepare('DELETE FROM pedido_itens').run();
    db.prepare('DELETE FROM order_bumps').run();
    db.prepare('DELETE FROM avaliacoes').run();
    db.prepare('DELETE FROM produtos').run();
    // Zera contador AUTOINCREMENT para o próximo produto ter id 1
    const tables = ['produtos', 'produto_categorias', 'pedido_itens', 'order_bumps', 'avaliacoes'];
    for (const name of tables) {
      try { db.prepare("DELETE FROM sqlite_sequence WHERE name=?").run(name); } catch (_) {}
    }
    res.json({ success: true });
  } catch (err) {
    console.error('[Produtos] Erro ao limpar todos:', err);
    res.status(500).json({ success: false, error: err.message || 'Erro ao limpar produtos' });
  }
});

export default router;
