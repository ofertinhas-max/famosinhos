-- Admin
CREATE TABLE IF NOT EXISTS admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admin_sessions (
  id TEXT PRIMARY KEY,
  admin_user_id INTEGER NOT NULL REFERENCES admin_users(id),
  csrf_token TEXT NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Configurações e modals (chave-valor)
CREATE TABLE IF NOT EXISTS configuracoes (
  chave TEXT PRIMARY KEY,
  valor TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS modals (
  id TEXT PRIMARY KEY,
  ativo INTEGER NOT NULL DEFAULT 1,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS modals_custom (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  rota TEXT NOT NULL DEFAULT '/',
  html_css TEXT NOT NULL DEFAULT '',
  ativo INTEGER NOT NULL DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Categorias
CREATE TABLE IF NOT EXISTS categorias (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  slug TEXT,
  ativo INTEGER NOT NULL DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Produtos
CREATE TABLE IF NOT EXISTS produtos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  descricao TEXT,
  preco REAL NOT NULL DEFAULT 0,
  preco_antigo REAL,
  imagem TEXT,
  estoque INTEGER NOT NULL DEFAULT 0,
  principal INTEGER NOT NULL DEFAULT 0,
  vendas INTEGER NOT NULL DEFAULT 0,
  ativo INTEGER NOT NULL DEFAULT 1,
  frete_gratis INTEGER NOT NULL DEFAULT 0,
  oculto INTEGER NOT NULL DEFAULT 0,
  rating REAL DEFAULT 0,
  tem_variacoes INTEGER NOT NULL DEFAULT 0,
  variacoes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS produto_categorias (
  produto_id INTEGER NOT NULL REFERENCES produtos(id) ON DELETE CASCADE,
  categoria_id INTEGER NOT NULL REFERENCES categorias(id) ON DELETE CASCADE,
  PRIMARY KEY (produto_id, categoria_id)
);

-- Usuários (clientes / minha conta)
CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cpf TEXT,
  nome TEXT,
  email TEXT,
  telefone TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS enderecos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  nome TEXT,
  endereco TEXT,
  numero TEXT,
  complemento TEXT,
  bairro TEXT,
  cidade TEXT,
  estado TEXT,
  cep TEXT,
  padrao INTEGER NOT NULL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Pedidos
CREATE TABLE IF NOT EXISTS pedidos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cliente_nome TEXT,
  cliente_email TEXT,
  cliente_cpf TEXT,
  cliente_telefone TEXT,
  status TEXT NOT NULL DEFAULT 'pendente',
  total REAL NOT NULL DEFAULT 0,
  subtotal REAL DEFAULT 0,
  valor_frete REAL DEFAULT 0,
  total_pago REAL DEFAULT 0,
  endereco_entrega TEXT,
  numero_entrega TEXT,
  complemento_entrega TEXT,
  bairro_entrega TEXT,
  cidade_entrega TEXT,
  estado_entrega TEXT,
  cep_entrega TEXT,
  pix_payment_id TEXT,
  pix_code TEXT,
  pix_qrcode TEXT,
  payment_method TEXT,
  desconto REAL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pedido_itens (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pedido_id INTEGER NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
  produto_id INTEGER REFERENCES produtos(id),
  nome TEXT,
  preco REAL NOT NULL,
  quantidade INTEGER NOT NULL DEFAULT 1,
  tipo_item TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Transações PIX (status do pagamento)
CREATE TABLE IF NOT EXISTS transacoes_pix (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pedido_id INTEGER REFERENCES pedidos(id),
  transaction_id TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Carrinhos abandonados
CREATE TABLE IF NOT EXISTS carrinhos_abandonados (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cliente_email TEXT,
  cliente_telefone TEXT,
  itens TEXT NOT NULL,
  total REAL NOT NULL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Order Bumps (produto_id nullable: ao excluir produto, só desconecta o order bump)
CREATE TABLE IF NOT EXISTS order_bumps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  produto_id INTEGER REFERENCES produtos(id),
  titulo_customizado TEXT,
  descricao_customizada TEXT,
  desconto_percentual REAL DEFAULT 0,
  imagem TEXT,
  ativo INTEGER NOT NULL DEFAULT 1,
  categorias_ids TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Opções de frete
CREATE TABLE IF NOT EXISTS opcoes_frete (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  descricao TEXT,
  valor REAL NOT NULL DEFAULT 0,
  prazo_minimo INTEGER DEFAULT 1,
  prazo_maximo INTEGER DEFAULT 1,
  tipo TEXT DEFAULT 'pac',
  logo TEXT,
  ordem INTEGER DEFAULT 0,
  valor_original REAL,
  categorias_ids TEXT,                 -- JSON array de IDs de categorias
  produtos_ids TEXT,                   -- JSON array de IDs de produtos
  ativo INTEGER NOT NULL DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Brindes
CREATE TABLE IF NOT EXISTS brindes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  descricao TEXT,
  imagem TEXT,
  ativo INTEGER NOT NULL DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tracking scripts / Pixels (tipo: tiktok; codigo: pixel ID; access_token: token da API; script: opcional snippet custom)
CREATE TABLE IF NOT EXISTS tracking_scripts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  tipo TEXT NOT NULL DEFAULT 'tiktok',
  codigo TEXT,
  access_token TEXT,
  script TEXT,
  ativo INTEGER NOT NULL DEFAULT 1,
  ordem INTEGER NOT NULL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Regras de carrinho (cart rules)
CREATE TABLE IF NOT EXISTS cart_rules (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  regra TEXT,
  quantidade_minima INTEGER,
  valor_fixo REAL,
  prioridade INTEGER DEFAULT 0,
  ativo INTEGER NOT NULL DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Avaliações
CREATE TABLE IF NOT EXISTS avaliacoes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  produto_id INTEGER NOT NULL REFERENCES produtos(id) ON DELETE CASCADE,
  autor TEXT,
  imagem TEXT,
  nota INTEGER,
  comentario TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Usuários banidos (admin vendas)
CREATE TABLE IF NOT EXISTS usuarios_banidos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cpf TEXT,
  telefone TEXT,
  motivo TEXT,
  ativo INTEGER NOT NULL DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Taxas / Links (config da loja)
CREATE TABLE IF NOT EXISTS taxas_links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  chave TEXT NOT NULL,
  valor TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_pedidos_status ON pedidos(status);
CREATE INDEX IF NOT EXISTS idx_pedidos_created ON pedidos(created_at);
CREATE INDEX IF NOT EXISTS idx_produto_categorias_cat ON produto_categorias(categoria_id);
CREATE INDEX IF NOT EXISTS idx_pedido_itens_pedido ON pedido_itens(pedido_id);
