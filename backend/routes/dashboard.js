import { Router } from 'express';
import { db } from '../db/index.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

function zeroStats() {
  return {
    totalPedidos: 0,
    pedidosPagos: 0,
    pedidosPendentes: 0,
    totalVendido: 0,
    totalPago: 0,
    totalPendente: 0
  };
}

// GET /api/db/painelad/dashboard
router.get('/painelad/dashboard', requireAdmin, (req, res) => {
  const hoje = new Date().toISOString().slice(0, 10);
  const inicioSemana = new Date();
  inicioSemana.setDate(inicioSemana.getDate() - 7);
  const inicioSemanaStr = inicioSemana.toISOString().slice(0, 10);

  const pedidosHoje = db.all(`
    SELECT id, total, status, created_at FROM pedidos
    WHERE date(created_at) = date(?)
  `, [hoje]);
  const pedidosSemana = db.all(`
    SELECT id, total, status, created_at FROM pedidos
    WHERE date(created_at) >= date(?)
  `, [inicioSemanaStr]);

  const totalPedidosHoje = pedidosHoje.length;
  const pagosHoje = pedidosHoje.filter(p => p.status === 'pago' || p.status === 'entregue').length;
  const totalVendidoHoje = pedidosHoje.reduce((s, p) => s + (p.total || 0), 0);
  const totalPagoHoje = pedidosHoje
    .filter(p => p.status === 'pago' || p.status === 'entregue')
    .reduce((s, p) => s + (p.total || 0), 0);

  const totalPedidosSemana = pedidosSemana.length;
  const pagosSemana = pedidosSemana.filter(p => p.status === 'pago' || p.status === 'entregue').length;
  const totalSemana = pedidosSemana.reduce((s, p) => s + (p.total || 0), 0);
  const totalPagoSemana = pedidosSemana
    .filter(p => p.status === 'pago' || p.status === 'entregue')
    .reduce((s, p) => s + (p.total || 0), 0);

  const conversaoHoje = totalPedidosHoje > 0 ? (pagosHoje / totalPedidosHoje * 100) : 0;
  const conversaoSemana = totalPedidosSemana > 0 ? (pagosSemana / totalPedidosSemana * 100) : 0;

  const stats = db.get(`
    SELECT
      (SELECT COUNT(*) FROM produtos) as totalProdutos,
      (SELECT COUNT(*) FROM categorias) as totalCategorias,
      (SELECT COUNT(*) FROM avaliacoes) as totalAvaliacoes
  `);

  // ✅ CORRIGIDO: Order Bumps vendidos (via pedido_itens)
  const orderBumpsVendidos = db.get(`
    SELECT 
      COUNT(DISTINCT pi.id) as total,
      SUM(CASE WHEN p.status IN ('pago', 'entregue') THEN 1 ELSE 0 END) as pagos,
      SUM(CASE WHEN p.status NOT IN ('pago', 'entregue', 'cancelado') THEN 1 ELSE 0 END) as pendentes
    FROM pedido_itens pi
    INNER JOIN pedidos p ON p.id = pi.pedido_id
    WHERE pi.tipo_item = 'order_bump'
  `) || { total: 0, pagos: 0, pendentes: 0 };

  // ✅ NOVO: Ranking de produtos mais vendidos
  const produtosMaisVendidos = db.all(`
    SELECT 
      pi.nome as produto,
      SUM(pi.quantidade) as quantidade_vendida,
      SUM(pi.preco * pi.quantidade) as receita_total
    FROM pedido_itens pi
    INNER JOIN pedidos p ON p.id = pi.pedido_id
    WHERE p.status IN ('pago', 'entregue')
    GROUP BY pi.produto_id, pi.nome
    ORDER BY quantidade_vendida DESC
    LIMIT 5
  `);

  // ✅ NOVO: Últimos pedidos
  const ultimosPedidos = db.all(`
    SELECT 
      id,
      cliente_nome,
      cliente_email,
      total,
      status,
      created_at
    FROM pedidos
    ORDER BY created_at DESC
    LIMIT 10
  `);

  const vendasHoje = {
    totalPedidos: totalPedidosHoje,
    pedidosPagos: pagosHoje,
    pedidosPendentes: totalPedidosHoje - pagosHoje,
    totalVendido: totalVendidoHoje,
    totalPago: totalPagoHoje,
    totalPendente: totalVendidoHoje - totalPagoHoje
  };

  const vendasSemana = {
    totalPedidos: totalPedidosSemana,
    pedidosPagos: pagosSemana,
    pedidosPendentes: totalPedidosSemana - pagosSemana,
    total: totalSemana,
    totalPago: totalPagoSemana,
    totalPendente: totalSemana - totalPagoSemana
  };

  const historicoCompleto = {
    ...vendasSemana,
    conversao: conversaoSemana
  };

  // ✅ CORRIGIDO: Order Bumps com dados reais
  const orderBumps = {
    totalVendidos: orderBumpsVendidos?.total || 0,
    pagos: orderBumpsVendidos?.pagos || 0,
    pendentes: orderBumpsVendidos?.pendentes || 0,
    conversao: orderBumpsVendidos?.total > 0 
      ? ((orderBumpsVendidos.pagos / orderBumpsVendidos.total) * 100).toFixed(1)
      : 0
  };

  res.json({
    vendasHoje,
    vendasSemana,
    estatisticas: {
      totalProdutos: stats?.totalProdutos ?? 0,
      totalCategorias: stats?.totalCategorias ?? 0,
      totalAvaliacoes: stats?.totalAvaliacoes ?? 0
    },
    historicoCompleto,
    conversao: conversaoHoje,
    orderBumps,
    produtosMaisVendidos: produtosMaisVendidos || [],
    ultimosPedidos: ultimosPedidos || []
  });
});

export default router;
