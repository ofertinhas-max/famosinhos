import { Router } from 'express';
import { db } from '../db/index.js';
import { requireAdmin, optionalAdmin } from '../middleware/auth.js';

const router = Router();

// GET /api/db/avaliacoes/produto/:id
router.get('/avaliacoes/produto/:id', (req, res) => {
  // Retornar apenas avaliações reais do banco de dados
  // Rating do produto é apenas visual e não gera avaliações automáticas
  const rows = db.all('SELECT * FROM avaliacoes WHERE produto_id = ? ORDER BY id DESC', [req.params.id]);
  res.json(rows);
});

// POST /api/db/avaliacoes
router.post('/avaliacoes', requireAdmin, (req, res) => {
  const b = req.body || {};
  
  // Compatibilidade: aceitar tanto 'autor' quanto 'nome_usuario', 'imagem' quanto 'avatar'
  const autor = b.autor || b.nome_usuario || '';
  const imagem = b.imagem || b.avatar || null;
  const imagem_produto = b.imagem_produto || null;
  
  const result = db.prepare(`
    INSERT INTO avaliacoes (produto_id, autor, imagem, imagem_produto, nota, comentario) VALUES (?, ?, ?, ?, ?, ?)
  `).run(b.produto_id ?? 0, autor, imagem, imagem_produto, b.nota ?? 0, b.comentario ?? '');
  const row = db.get('SELECT * FROM avaliacoes WHERE id = ?', [result.lastInsertRowid]);
  res.status(201).json(row);
});

// PUT /api/db/avaliacoes/:id
router.put('/avaliacoes/:id', requireAdmin, (req, res) => {
  const b = req.body || {};
  
  // Compatibilidade: aceitar tanto 'autor' quanto 'nome_usuario', 'imagem' quanto 'avatar'
  const autor = b.autor || b.nome_usuario || '';
  const imagem = b.imagem || b.avatar || null;
  const imagem_produto = b.imagem_produto || null;
  
  db.prepare(`
    UPDATE avaliacoes SET produto_id = ?, autor = ?, imagem = ?, imagem_produto = ?, nota = ?, comentario = ? WHERE id = ?
  `).run(b.produto_id ?? 0, autor, imagem, imagem_produto, b.nota ?? 0, b.comentario ?? '', req.params.id);
  const row = db.get('SELECT * FROM avaliacoes WHERE id = ?', [req.params.id]);
  res.json(row);
});

// DELETE /api/db/avaliacoes/:id
router.delete('/avaliacoes/:id', requireAdmin, (req, res) => {
  db.run('DELETE FROM avaliacoes WHERE id = ?', [req.params.id]);
  res.json({ success: true });
});

// GET /api/db/avaliacoes (admin: listar todas as avaliações)
router.get('/avaliacoes', requireAdmin, (req, res) => {
  const rows = db.all(`
    SELECT a.*, p.nome as produto_nome, p.imagem as produto_imagem
    FROM avaliacoes a
    LEFT JOIN produtos p ON p.id = a.produto_id
    ORDER BY a.id DESC
  `);
  res.json(rows);
});

// POST /api/db/avaliacoes/automatizar (automação de avaliações)
router.post('/avaliacoes/automatizar', requireAdmin, (req, res) => {
  const { imagens } = req.body || {};
  
  if (!Array.isArray(imagens) || imagens.length === 0) {
    return res.status(400).json({ error: 'É necessário enviar ao menos uma imagem' });
  }

  // Pegar todos os produtos ativos (não ocultos)
  const produtos = db.all('SELECT id, nome FROM produtos WHERE ativo = 1 AND oculto = 0');
  
  if (produtos.length === 0) {
    return res.status(400).json({ error: 'Nenhum produto ativo encontrado' });
  }

  // Nomes fictícios para as avaliações
  const nomesFicticios = [
    'João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Costa', 'Carlos Souza',
    'Juliana Lima', 'Ricardo Alves', 'Patricia Rocha', 'Fernando Martins', 'Camila Ferreira',
    'Lucas Ribeiro', 'Beatriz Carvalho', 'Rafael Gomes', 'Amanda Dias', 'Gustavo Moreira',
    'Larissa Barbosa', 'Diego Fernandes', 'Isabela Monteiro', 'Thiago Araújo', 'Mariana Correia'
  ];

  // Frases positivas genéricas para avaliações
  const frasesPositivas = [
    'Adorei! Produto de excelente qualidade.',
    'Superou minhas expectativas! Recomendo muito.',
    'Produto maravilhoso, chegou rápido e bem embalado.',
    'Muito bom! Valeu cada centavo.',
    'Qualidade excepcional! Vou comprar novamente.',
    'Produto incrível! Estou muito satisfeito(a).',
    'Melhor compra que fiz! Recomendo demais.',
    'Excelente! Chegou antes do prazo.',
    'Produto de primeira! Super recomendo.',
    'Amei! Perfeito como esperado.'
  ];

  const avaliacoesCriadas = [];
  let imagemIndex = 0;
  let nomeIndex = 0;

  // Criar avaliações para cada produto
  for (const produto of produtos) {
    // Criar entre 2-4 avaliações por produto
    const numAvaliacoes = Math.floor(Math.random() * 3) + 2;
    
    for (let i = 0; i < numAvaliacoes; i++) {
      // Usar imagem do array (circular)
      const imagem = imagens[imagemIndex % imagens.length];
      imagemIndex++;

      // Usar nome fictício (circular)
      const autor = nomesFicticios[nomeIndex % nomesFicticios.length];
      nomeIndex++;

      // Nota aleatória entre 4 e 5 estrelas
      const nota = Math.random() > 0.3 ? 5 : 4;

      // Comentário personalizado mencionando o produto
      const fraseBase = frasesPositivas[Math.floor(Math.random() * frasesPositivas.length)];
      const comentario = `${fraseBase} O ${produto.nome} é exatamente o que eu procurava!`;

      // Inserir no banco
      const result = db.prepare(`
        INSERT INTO avaliacoes (produto_id, autor, imagem, nota, comentario) 
        VALUES (?, ?, ?, ?, ?)
      `).run(produto.id, autor, imagem, nota, comentario);

      avaliacoesCriadas.push({
        id: result.lastInsertRowid,
        produto_id: produto.id,
        produto_nome: produto.nome,
        autor,
        nota,
        comentario
      });
    }
  }

  res.json({
    success: true,
    message: `${avaliacoesCriadas.length} avaliações criadas para ${produtos.length} produto(s)`,
    avaliacoes: avaliacoesCriadas
  });
});

export default router;
