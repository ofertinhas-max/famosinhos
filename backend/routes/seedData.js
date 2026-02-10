import { Router } from 'express';
import { db } from '../db/index.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// POST /api/db/seed/categorias - Criar categorias de exemplo
router.post('/seed/categorias', requireAdmin, (req, res) => {
  try {
    const categoriasExemplo = [
      { nome: 'Eletrônicos', slug: 'eletronicos' },
      { nome: 'Roupas', slug: 'roupas' },
      { nome: 'Calçados', slug: 'calcados' },
      { nome: 'Acessórios', slug: 'acessorios' },
      { nome: 'Casa e Decoração', slug: 'casa-e-decoracao' }
    ];

    const inserted = [];
    for (const cat of categoriasExemplo) {
      // Verifica se já existe
      const exists = db.get('SELECT id FROM categorias WHERE slug = ?', [cat.slug]);
      if (!exists) {
        const result = db.prepare('INSERT INTO categorias (nome, slug, ativo) VALUES (?, ?, 1)').run(cat.nome, cat.slug);
        inserted.push({ id: result.lastInsertRowid, ...cat });
      }
    }

    res.json({
      success: true,
      message: `${inserted.length} categorias criadas`,
      categorias: inserted
    });
  } catch (error) {
    console.error('[Seed] Erro ao criar categorias:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/db/seed/modals - Criar modals custom de exemplo
router.post('/seed/modals', requireAdmin, (req, res) => {
  try {
    const modalsExemplo = [
      {
        rota: '/',
        html_css: `
<style>
  .popup-welcome {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.3);
    z-index: 9999;
  }
</style>
<div class="popup-welcome">
  <h2>Bem-vindo à nossa loja!</h2>
  <p>Aproveite 10% de desconto na primeira compra</p>
  <button onclick="this.parentElement.remove()">Fechar</button>
</div>
        `.trim()
      },
      {
        rota: '/checkout',
        html_css: `
<style>
  .popup-checkout {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 15px;
    border-radius: 5px;
    z-index: 9999;
  }
</style>
<div class="popup-checkout">
  <p>🎉 Parabéns! Você está a um passo de finalizar sua compra!</p>
</div>
        `.trim()
      }
    ];

    const inserted = [];
    for (const modal of modalsExemplo) {
      const result = db.prepare('INSERT INTO modals_custom (rota, html_css, ativo) VALUES (?, ?, 1)').run(modal.rota, modal.html_css);
      inserted.push({ id: result.lastInsertRowid, ...modal });
    }

    res.json({
      success: true,
      message: `${inserted.length} modals criados`,
      modals: inserted
    });
  } catch (error) {
    console.error('[Seed] Erro ao criar modals:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/db/seed/all - Criar todos os dados de exemplo
router.post('/seed/all', requireAdmin, (req, res) => {
  try {
    const results = {
      categorias: 0,
      modals: 0
    };

    // Categorias
    const categoriasExemplo = [
      { nome: 'Eletrônicos', slug: 'eletronicos' },
      { nome: 'Roupas', slug: 'roupas' },
      { nome: 'Calçados', slug: 'calcados' },
      { nome: 'Acessórios', slug: 'acessorios' },
      { nome: 'Casa e Decoração', slug: 'casa-e-decoracao' }
    ];

    for (const cat of categoriasExemplo) {
      const exists = db.get('SELECT id FROM categorias WHERE slug = ?', [cat.slug]);
      if (!exists) {
        db.prepare('INSERT INTO categorias (nome, slug, ativo) VALUES (?, ?, 1)').run(cat.nome, cat.slug);
        results.categorias++;
      }
    }

    // Modals
    const modalsExemplo = [
      {
        rota: '/',
        html_css: `<style>.popup-welcome{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:white;padding:30px;border-radius:10px;box-shadow:0 5px 20px rgba(0,0,0,0.3);z-index:9999;}</style><div class="popup-welcome"><h2>Bem-vindo!</h2><p>10% OFF na primeira compra</p><button onclick="this.parentElement.remove()">Fechar</button></div>`
      }
    ];

    for (const modal of modalsExemplo) {
      db.prepare('INSERT INTO modals_custom (rota, html_css, ativo) VALUES (?, ?, 1)').run(modal.rota, modal.html_css);
      results.modals++;
    }

    res.json({
      success: true,
      message: 'Dados de exemplo criados',
      results
    });
  } catch (error) {
    console.error('[Seed] Erro ao criar dados:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/db/seed/status - Verificar status do banco
router.get('/seed/status', requireAdmin, (req, res) => {
  try {
    const status = {
      categorias: db.get('SELECT COUNT(*) as count FROM categorias').count,
      categorias_ativas: db.get('SELECT COUNT(*) as count FROM categorias WHERE ativo = 1').count,
      modals_custom: db.get('SELECT COUNT(*) as count FROM modals_custom').count,
      modals_custom_ativos: db.get('SELECT COUNT(*) as count FROM modals_custom WHERE ativo = 1').count,
      produtos: db.get('SELECT COUNT(*) as count FROM produtos').count,
      produtos_ativos: db.get('SELECT COUNT(*) as count FROM produtos WHERE ativo = 1').count,
      pedidos: db.get('SELECT COUNT(*) as count FROM pedidos').count,
      tracking_scripts: db.get('SELECT COUNT(*) as count FROM tracking_scripts').count,
      tracking_scripts_ativos: db.get('SELECT COUNT(*) as count FROM tracking_scripts WHERE ativo = 1').count
    };

    res.json({
      success: true,
      status,
      message: 'Status do banco de dados'
    });
  } catch (error) {
    console.error('[Seed] Erro ao verificar status:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
