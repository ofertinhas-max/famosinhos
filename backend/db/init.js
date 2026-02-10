import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, 'loja.db');
const db = new Database(dbPath);

const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');
db.exec(schema);

// Migração: adicionar colunas novas em pedidos (se o banco já existia)
const pedidosNewColumns = [
  'numero_entrega TEXT', 'complemento_entrega TEXT', 'bairro_entrega TEXT',
  'cidade_entrega TEXT', 'estado_entrega TEXT', 'cep_entrega TEXT',
  'pix_payment_id TEXT', 'pix_code TEXT', 'pix_qrcode TEXT', 'payment_method TEXT', 
  'desconto REAL DEFAULT 0', 'subtotal REAL DEFAULT 0', 'valor_frete REAL DEFAULT 0'
];
for (const col of pedidosNewColumns) {
  try {
    db.prepare(`ALTER TABLE pedidos ADD COLUMN ${col}`).run();
  } catch (_) { /* coluna já existe */ }
}

// Admin padrão: admin / admin123 (troque em produção)
const passwordHash = bcrypt.hashSync('admin123', 10);
db.prepare(`
  INSERT OR IGNORE INTO admin_users (username, password_hash) VALUES ('admin', ?)
`).run(passwordHash);

// Migração: tracking_scripts - adicionar tipo, codigo, ordem, access_token (compatível com painel Pixels)
const trackingScriptsNewColumns = [
  "tipo TEXT DEFAULT 'tiktok'",
  'codigo TEXT',
  'ordem INTEGER DEFAULT 0',
  'access_token TEXT'
];
for (const col of trackingScriptsNewColumns) {
  try {
    db.prepare(`ALTER TABLE tracking_scripts ADD COLUMN ${col}`).run();
  } catch (_) { /* coluna já existe */ }
}
try {
  db.prepare(`UPDATE tracking_scripts SET codigo = script, tipo = 'tiktok', ordem = 0 WHERE codigo IS NULL AND script IS NOT NULL AND script != ''`).run();
} catch (_) { /* ignora */ }

// Tabela modals_custom (para bancos criados antes de ter essa tabela no schema)
db.exec(`
  CREATE TABLE IF NOT EXISTS modals_custom (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rota TEXT NOT NULL DEFAULT '/',
    html_css TEXT NOT NULL DEFAULT '',
    ativo INTEGER NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Configurações padrão (chaves usadas pelo admin e loja)
const configDefaults = [
  ['nome_loja', 'Minha Loja'],
  ['webhook_url', ''],
  ['vendas_loja', '21'],
  ['logo_loja', ''],
  ['tema', 'theme-a'],
  ['cpf_obrigatorio', 'nao_exigir'],
  ['categorias_ativas', '0'],
  ['escalapay_api_key', process.env.ESCALAPAY_API_KEY || ''],
  ['escalapay_base_url', process.env.ESCALAPAY_BASE_URL || 'https://snnesnxqxclvcpsezafm.supabase.co'],
  ['escalapay_base_url_create', process.env.ESCALAPAY_BASE_URL_CREATE || 'https://fsgfjnnidyxqhfrhxijv.supabase.co'],
  ['upload_domain', process.env.UPLOAD_DOMAIN || ''],
  ['upload_api_base_url', process.env.UPLOAD_API_BASE_URL || '']
];
const insConfig = db.prepare('INSERT OR IGNORE INTO configuracoes (chave, valor) VALUES (?, ?)');
for (const [k, v] of configDefaults) {
  insConfig.run(k, v);
}

// Modals padrão - REMOVIDO (não são mais necessários)
// O sistema agora usa apenas modals_custom (popups customizados por rota)

// Taxas/Links (config loja - front espera ce.taxas)
db.prepare(`
  INSERT OR IGNORE INTO taxas_links (chave, valor) VALUES
  ('incluirQueryParams', '0'),
  ('status_taxas_padrao', '[]')
`).run();

// Migração: adicionar coluna imagem em avaliacoes (se não existir)
try {
  db.prepare('ALTER TABLE avaliacoes ADD COLUMN imagem TEXT').run();
} catch (_) { /* coluna já existe */ }

// Migração: adicionar coluna imagem_produto em avaliacoes (foto do produto na review)
try {
  db.prepare('ALTER TABLE avaliacoes ADD COLUMN imagem_produto TEXT').run();
} catch (_) { /* coluna já existe */ }

// Migração: cart_rules - adicionar campos para vendas em atacado
const cartRulesNewColumns = [
  'quantidade_minima INTEGER',
  'valor_fixo REAL',
  'prioridade INTEGER DEFAULT 0'
];
for (const col of cartRulesNewColumns) {
  try {
    db.prepare(`ALTER TABLE cart_rules ADD COLUMN ${col}`).run();
  } catch (_) { /* coluna já existe */ }
}

// Migração: brindes - adicionar campo imagem
try {
  db.prepare('ALTER TABLE brindes ADD COLUMN imagem TEXT').run();
} catch (_) { /* coluna já existe */ }

// Migração: opcoes_frete - adicionar campos completos
const freteNewColumns = [
  'descricao TEXT',
  'prazo_minimo INTEGER DEFAULT 1',
  'prazo_maximo INTEGER DEFAULT 1',
  "tipo TEXT DEFAULT 'pac'",
  'logo TEXT',
  'ordem INTEGER DEFAULT 0',
  'valor_original REAL',
  'categorias_ids TEXT',
  'produtos_ids TEXT'
];
for (const col of freteNewColumns) {
  try {
    db.prepare(`ALTER TABLE opcoes_frete ADD COLUMN ${col}`).run();
  } catch (_) { /* coluna já existe */ }
}

// Migração: pedidos - adicionar campos de tracking para TikTok Events API
const pedidosTrackingColumns = [
  'utm_source TEXT',
  'utm_medium TEXT',
  'utm_campaign TEXT',
  'utm_term TEXT',
  'utm_content TEXT',
  'tracking_ttp TEXT',
  'tracking_ttclid TEXT',
  'tracking_fbp TEXT',
  'tracking_fbc TEXT',
  'tracking_user_agent TEXT',
  'tracking_ip TEXT',
  'url_origem TEXT'
];
for (const col of pedidosTrackingColumns) {
  try {
    db.prepare(`ALTER TABLE pedidos ADD COLUMN ${col}`).run();
  } catch (_) { /* coluna já existe */ }
}

// Migração: categorias - adicionar campo ordem
try {
  db.prepare('ALTER TABLE categorias ADD COLUMN ordem INTEGER DEFAULT 0').run();
} catch (_) { /* coluna já existe */ }

// Migração: pedidos - adicionar campo ip_info para geolocalização
try {
  db.prepare('ALTER TABLE pedidos ADD COLUMN ip_info TEXT').run();
} catch (_) { /* coluna já existe */ }

// Migração: pedido_itens - adicionar campo tipo_item (order_bump, upsell, produto normal)
try {
  db.prepare('ALTER TABLE pedido_itens ADD COLUMN tipo_item TEXT').run();
} catch (_) { /* coluna já existe */ }

// Migração: order_bumps - permitir produto_id NULL (desconectar sem excluir ao excluir produto)
try {
  const obInfo = db.prepare('PRAGMA table_info(order_bumps)').all();
  const prodCol = obInfo.find(c => c.name === 'produto_id');
  if (prodCol && prodCol.notnull === 1) {
    db.exec(`
      CREATE TABLE order_bumps_new (
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
      INSERT INTO order_bumps_new SELECT * FROM order_bumps;
      DROP TABLE order_bumps;
      ALTER TABLE order_bumps_new RENAME TO order_bumps;
    `);
  }
} catch (_) { /* ignora */ }

console.log('Banco inicializado em', dbPath);
db.close();
