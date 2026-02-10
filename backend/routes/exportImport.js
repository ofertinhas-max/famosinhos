import { Router } from 'express';
import { db } from '../db/index.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// GET /api/db/export — query: produtos, regras, configuracoes (valores "true")
router.get('/export', requireAdmin, (req, res) => {
  try {
    const produtos = req.query.produtos === 'true';
    const regras = req.query.regras === 'true';
    const configuracoes = req.query.configuracoes === 'true';

    const out = {};

    if (produtos) {
      out.produtos = db.all('SELECT * FROM produtos ORDER BY id');
      out.categorias = db.all('SELECT * FROM categorias ORDER BY id');
      out.avaliacoes = db.all('SELECT * FROM avaliacoes ORDER BY id');
      out.produto_categorias = db.all('SELECT produto_id, categoria_id FROM produto_categorias');
    }

    if (regras) {
      out.regras = {
        order_bumps: db.all('SELECT * FROM order_bumps ORDER BY id'),
        cart_rules: db.all('SELECT * FROM cart_rules ORDER BY id'),
        brindes: db.all('SELECT * FROM brindes ORDER BY id'),
        opcoes_frete: db.all('SELECT * FROM opcoes_frete ORDER BY id'),
        taxas_links: db.all('SELECT * FROM taxas_links ORDER BY id')
      };
    }

    if (configuracoes) {
      const rows = db.all('SELECT chave, valor FROM configuracoes');
      out.configuracoes = rows.map(r => ({ chave: r.chave, valor: r.valor }));
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(out, null, 2));
  } catch (err) {
    console.error('Export error:', err);
    res.status(500).json({ success: false, error: 'Erro ao exportar dados' });
  }
});

// POST /api/db/import — body: { produtos?, categorias?, avaliacoes?, produto_categorias?, regras?, configuracoes?, manterIdsProdutos? }
router.post('/import', requireAdmin, (req, res) => {
  try {
    const body = req.body || {};
    const manterIdsProdutos = body.manterIdsProdutos === true;
    const resultados = { produtos: { total: 0, sucesso: 0 }, categorias: { criadas: 0 }, regras: { sucesso: 0 }, configuracoes: { sucesso: 0 } };

    // Categorias
    const categorias = Array.isArray(body.categorias) ? body.categorias : [];
    for (const c of categorias) {
      const slug = (c.nome || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      try {
        db.prepare('INSERT OR IGNORE INTO categorias (id, nome, slug, ativo) VALUES (?, ?, ?, ?)')
          .run(c.id != null ? c.id : undefined, c.nome || '', slug, c.ativo !== 0 ? 1 : 0);
      } catch (_) {
        db.prepare('INSERT INTO categorias (nome, slug, ativo) VALUES (?, ?, ?)')
          .run(c.nome || '', slug, c.ativo !== 0 ? 1 : 0);
      }
      resultados.categorias.criadas += 1;
    }

    // Produtos + produto_categorias + avaliacoes
    const produtos = Array.isArray(body.produtos) ? body.produtos : [];
    const produtoCategorias = Array.isArray(body.produto_categorias) ? body.produto_categorias : [];
    const avaliacoes = Array.isArray(body.avaliacoes) ? body.avaliacoes : [];
    const idMap = {}; // oldId -> newId quando não manter ids

    resultados.produtos.total = produtos.length;
    for (const p of produtos) {
      try {
        if (manterIdsProdutos && p.id != null) {
          db.prepare(`
            INSERT OR REPLACE INTO produtos (id, nome, descricao, preco, preco_antigo, imagem, estoque, principal, vendas, ativo)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `).run(
            p.id,
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
          idMap[p.id] = p.id;
        } else {
          const r = db.prepare(`
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
          idMap[p.id] = r.lastInsertRowid;
        }
        resultados.produtos.sucesso += 1;
      } catch (e) {
        console.warn('Import produto skip:', p.id, e.message);
      }
    }

    for (const pc of produtoCategorias) {
      const newPid = idMap[pc.produto_id];
      const newCid = manterIdsProdutos ? pc.categoria_id : (categorias.find(c => c.id === pc.categoria_id) ? pc.categoria_id : null);
      if (newPid != null && newCid != null) {
        try {
          db.prepare('INSERT OR IGNORE INTO produto_categorias (produto_id, categoria_id) VALUES (?, ?)').run(newPid, newCid);
        } catch (_) {}
      }
    }

    for (const a of avaliacoes) {
      const newPid = idMap[a.produto_id];
      if (newPid != null) {
        try {
          db.prepare('INSERT INTO avaliacoes (produto_id, autor, nota, comentario) VALUES (?, ?, ?, ?)')
            .run(newPid, a.autor || '', a.nota ?? 0, a.comentario || '');
        } catch (_) {}
      }
    }

    // Regras
    const regras = body.regras && typeof body.regras === 'object' ? body.regras : {};
    const ob = Array.isArray(regras.order_bumps) ? regras.order_bumps : [];
    const cr = Array.isArray(regras.cart_rules) ? regras.cart_rules : [];
    const br = Array.isArray(regras.brindes) ? regras.brindes : [];
    const of = Array.isArray(regras.opcoes_frete) ? regras.opcoes_frete : [];
    const tl = Array.isArray(regras.taxas_links) ? regras.taxas_links : [];

    for (const r of ob) {
      try {
        const pid = idMap[r.produto_id] != null ? idMap[r.produto_id] : r.produto_id;
        db.prepare(`
          INSERT INTO order_bumps (produto_id, titulo_customizado, descricao_customizada, desconto_percentual, imagem, ativo, categorias_ids)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `).run(pid, r.titulo_customizado || '', r.descricao_customizada || '', Number(r.desconto_percentual) ?? 0, r.imagem || null, r.ativo !== 0 ? 1 : 0, r.categorias_ids || null);
        resultados.regras.sucesso += 1;
      } catch (_) {}
    }
    for (const r of cr) {
      try {
        db.prepare('INSERT INTO cart_rules (nome, regra, ativo) VALUES (?, ?, ?)').run(r.nome || '', r.regra || '', r.ativo !== 0 ? 1 : 0);
        resultados.regras.sucesso += 1;
      } catch (_) {}
    }
    for (const r of br) {
      try {
        db.prepare('INSERT INTO brindes (nome, descricao, ativo) VALUES (?, ?, ?)').run(r.nome || '', r.descricao || '', r.ativo !== 0 ? 1 : 0);
        resultados.regras.sucesso += 1;
      } catch (_) {}
    }
    for (const r of of) {
      try {
        db.prepare('INSERT INTO opcoes_frete (nome, valor, ativo) VALUES (?, ?, ?)').run(r.nome || '', Number(r.valor) ?? 0, r.ativo !== 0 ? 1 : 0);
        resultados.regras.sucesso += 1;
      } catch (_) {}
    }
    for (const r of tl) {
      try {
        db.prepare('INSERT OR REPLACE INTO taxas_links (id, chave, valor) VALUES (?, ?, ?)').run(r.id != null ? r.id : null, r.chave || '', r.valor || '');
        resultados.regras.sucesso += 1;
      } catch (_) {
        db.prepare('INSERT INTO taxas_links (chave, valor) VALUES (?, ?)').run(r.chave || '', r.valor || '');
        resultados.regras.sucesso += 1;
      }
    }

    // Configurações
    const configList = Array.isArray(body.configuracoes) ? body.configuracoes : [];
    for (const row of configList) {
      try {
        db.prepare(`
          INSERT INTO configuracoes (chave, valor) VALUES (?, ?)
          ON CONFLICT(chave) DO UPDATE SET valor = excluded.valor
        `).run(row.chave || '', row.valor ?? '');
        resultados.configuracoes.sucesso += 1;
      } catch (_) {}
    }

    res.json({ success: true, resultados });
  } catch (err) {
    console.error('Import error:', err);
    res.status(500).json({ success: false, error: err.message || 'Erro ao importar dados' });
  }
});

export default router;
