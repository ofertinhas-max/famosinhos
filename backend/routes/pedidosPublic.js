import { Router } from 'express';
import { db } from '../db/index.js';

const router = Router();

// GET /api/pedidos/recovery/:id — pedido pendente para página de recuperação (público)
router.get('/recovery/:id', (req, res) => {
  const ped = db.get('SELECT * FROM pedidos WHERE id = ? AND status = ?', [req.params.id, 'pendente']);
  if (!ped) {
    return res.json({ success: false, error: 'Pedido não encontrado ou já pago' });
  }
  const itens = db.all('SELECT * FROM pedido_itens WHERE pedido_id = ?', [req.params.id]);
  ped.itens = itens;
  res.json({ success: true, pedido: ped });
});

// GET /api/pedidos/sucesso/:id — pedido para página de sucesso (público)
router.get('/sucesso/:id', (req, res) => {
  const ped = db.get('SELECT * FROM pedidos WHERE id = ?', [req.params.id]);
  if (!ped) {
    return res.status(404).json({ error: 'Pedido não encontrado' });
  }
  const itens = db.all('SELECT * FROM pedido_itens WHERE pedido_id = ?', [req.params.id]);
  ped.itens = itens;
  res.json(ped);
});

export default router;
