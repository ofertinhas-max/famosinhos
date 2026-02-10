import { Router } from 'express';
import { db } from '../db/index.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// POST /api/db/carrinhos-abandonados (público - frontend salva quando usuário adiciona ao carrinho)
router.post('/carrinhos-abandonados', (req, res) => {
  const b = req.body || {};
  const itens = Array.isArray(b.itens) ? b.itens : [];
  
  if (itens.length === 0) {
    return res.status(400).json({ success: false, error: 'Carrinho vazio' });
  }
  
  const total = itens.reduce((sum, item) => sum + (Number(item.preco) || 0) * (Number(item.quantidade) || 1), 0);
  
  try {
    const result = db.prepare(`
      INSERT INTO carrinhos_abandonados (
        cliente_email, cliente_telefone, itens, total
      ) VALUES (?, ?, ?, ?)
    `).run(
      b.cliente_email || null,
      b.cliente_telefone || null,
      JSON.stringify(itens),
      total
    );
    
    res.status(201).json({ success: true, id: result.lastInsertRowid });
  } catch (err) {
    console.error('[Carrinhos] Erro ao salvar carrinho abandonado:', err);
    res.status(500).json({ success: false, error: 'Erro ao salvar carrinho' });
  }
});

// GET /api/db/carrinhos-abandonados
router.get('/carrinhos-abandonados', requireAdmin, (req, res) => {
  const rows = db.all(`
    SELECT * FROM carrinhos_abandonados ORDER BY id DESC
  `);
  const parsed = rows.map(r => ({
    ...r,
    itens: typeof r.itens === 'string' ? JSON.parse(r.itens || '[]') : (r.itens || [])
  }));
  res.json(parsed);
});

// DELETE /api/db/carrinhos-abandonados/:id
router.delete('/carrinhos-abandonados/:id', requireAdmin, (req, res) => {
  db.run('DELETE FROM carrinhos_abandonados WHERE id = ?', [req.params.id]);
  res.json({ success: true });
});

// DELETE /api/db/carrinhos-abandonados/:id/converter — cliente remove carrinho após compra (público)
router.delete('/carrinhos-abandonados/:id/converter', (req, res) => {
  const car = db.get('SELECT id FROM carrinhos_abandonados WHERE id = ?', [req.params.id]);
  if (!car) return res.json({ success: true, changes: 0 });
  const result = db.prepare('DELETE FROM carrinhos_abandonados WHERE id = ?').run(req.params.id);
  res.json({ success: true, changes: result.changes });
});

// POST /api/db/carrinhos-abandonados/:id/converter (criar pedido a partir do carrinho — admin)
router.post('/carrinhos-abandonados/:id/converter', requireAdmin, (req, res) => {
  const car = db.get('SELECT * FROM carrinhos_abandonados WHERE id = ?', [req.params.id]);
  if (!car) return res.status(404).json({ success: false, error: 'Carrinho não encontrado' });
  const itens = typeof car.itens === 'string' ? JSON.parse(car.itens || '[]') : (car.itens || []);
  const result = db.prepare(`
    INSERT INTO pedidos (cliente_nome, cliente_email, status, total, total_pago)
    VALUES (?, ?, 'pendente', ?, 0)
  `).run(car.cliente_email || '', car.cliente_email || '', car.total || 0);
  const pedidoId = result.lastInsertRowid;
  for (const item of itens) {
    db.prepare(`
      INSERT INTO pedido_itens (pedido_id, produto_id, nome, preco, quantidade)
      VALUES (?, ?, ?, ?, ?)
    `).run(pedidoId, item.produto_id || item.id, item.nome || '', item.preco || 0, item.quantidade || 1);
  }
  db.run('DELETE FROM carrinhos_abandonados WHERE id = ?', [req.params.id]);
  res.json({ success: true, pedido_id: pedidoId });
});

export default router;
