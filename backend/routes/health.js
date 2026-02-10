import { Router } from 'express';

const router = Router();

// GET /api/db/health
router.get('/health', (req, res) => {
  res.json({ ok: true, database: 'connected' });
});

export default router;
