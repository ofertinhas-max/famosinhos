import { Router } from 'express';
import { db } from '../db/index.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// GET /api/db/funil-conversao
router.get('/funil-conversao', requireAdmin, (req, res) => {
  const carrinhos = db.get('SELECT COUNT(*) as c FROM carrinhos_abandonados')?.c ?? 0;
  const pedidos = db.get('SELECT COUNT(*) as c FROM pedidos')?.c ?? 0;
  const pixGerado = db.get('SELECT COUNT(*) as c FROM pedidos WHERE pix_code IS NOT NULL AND pix_code != \'\'')?.c ?? 0;
  const pagos = db.get('SELECT COUNT(*) as c FROM pedidos WHERE status IN (\'pago\', \'entregue\')')?.c ?? 0;
  res.json({
    carrinhos: Number(carrinhos),
    checkout: Number(pedidos),
    pixGerado: Number(pixGerado),
    pagos: Number(pagos)
  });
});

// GET /api/db/estados-vendas
router.get('/estados-vendas', requireAdmin, (req, res) => {
  const rows = db.all(`
    SELECT 
      estado_entrega as estado,
      COUNT(*) as pedidos_gerados,
      SUM(CASE WHEN status = 'pago' THEN 1 ELSE 0 END) as pedidos_pagos,
      SUM(CASE WHEN status = 'pago' THEN total ELSE 0 END) as receita_total,
      CAST(
        (SUM(CASE WHEN status = 'pago' THEN 1 ELSE 0 END) * 100.0 / COUNT(*))
        AS INTEGER
      ) as taxa_conversao
    FROM pedidos
    WHERE estado_entrega IS NOT NULL AND estado_entrega != ''
    GROUP BY estado_entrega
    ORDER BY receita_total DESC
  `);
  
  // Formatar dados para o frontend
  const formatted = rows.map(row => ({
    estado: row.estado || 'Não Informado',
    pedidos_gerados: row.pedidos_gerados || 0,
    pedidos_pagos: row.pedidos_pagos || 0,
    receita_total: Number(row.receita_total) || 0,
    taxa_conversao: row.taxa_conversao || 0
  }));
  
  res.json(formatted);
});

// GET /api/db/persona-clientes
router.get('/persona-clientes', requireAdmin, (req, res) => {
  res.json({
    success: true,
    generos: [],
    faixasEtarias: []
  });
});

export default router;
