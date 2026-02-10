/**
 * Stubs para rotas desativadas: cartões (captura) e chat (painel backend).
 * - Cartões: não capturamos; retorna vazio / pagamento por cartão desativado.
 * - Chat: só existe no front (loja); backend não armazena nem painel. Retorna vazio.
 */

import { Router } from 'express';

const router = Router();

// ---- Cartões (desconectado: não capturamos cartões) ----
router.get('/cartoes/:cpf', (req, res) => {
  res.json({ success: true, cartoes: [] });
});

router.post('/cartoes', (req, res) => {
  res.status(200).json({ success: true });
});

router.post('/create-card-payment', (req, res) => {
  res.status(400).json({
    success: false,
    error: 'Pagamento por cartão desativado. Use PIX.'
  });
});

// ---- Chat (apenas front na loja; sem backend/painel) ----
router.get('/chat/sessoes', (req, res) => {
  res.json({ success: true, sessoes: [] });
});

router.get('/chat/mensagens/:id', (req, res) => {
  res.json({ success: true, mensagens: [] });
});

router.post('/chat/sessao', (req, res) => {
  res.json({ success: true, sessao: { id: 'stub', status: 'ativo' } });
});

router.post('/chat/mensagem', (req, res) => {
  res.json({ success: true });
});

router.patch('/chat/marcar-lidas/:id', (req, res) => {
  res.json({ success: true });
});
router.post('/chat/marcar-lidas/:id', (req, res) => {
  res.json({ success: true });
});

router.post('/chat/verificar-email', (req, res) => {
  res.json({ success: true });
});

export default router;
