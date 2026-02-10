import { Router } from 'express';
import { db } from '../db/index.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// GET /api/access-stats — estatísticas para o admin
router.get('/access-stats', requireAdmin, (req, res) => {
  try {
    const pedidos = db.get('SELECT COUNT(*) as total FROM pedidos')?.total ?? 0;
    const pagos = db.get('SELECT COUNT(*) as c FROM pedidos WHERE status IN (\'pago\', \'entregue\')')?.c ?? 0;
    const produtos = db.get('SELECT COUNT(*) as c FROM produtos')?.c ?? 0;
    const carrinhos = db.get('SELECT COUNT(*) as c FROM carrinhos_abandonados')?.c ?? 0;
    res.json({
      success: true,
      pedidos,
      pagos,
      produtos,
      carrinhos
    });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

export default router;
