/**
 * Lê scraped-raw.json, formata para o schema da API e cria os produtos em massa.
 * Requer: ADMIN_USER, ADMIN_PASS, API_BASE_URL (export ou .env no backend).
 * Uso: node scripts/import-from-scraped.js   ou   node -r dotenv/config scripts/import-from-scraped.js
 */

import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const API_BASE = process.env.API_BASE_URL || 'http://localhost:3002';
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'admin123';
const SCRAPED_FILE = join(__dirname, 'scraped-raw.json');

async function login() {
  const res = await fetch(`${API_BASE}/api/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: ADMIN_USER, senha: ADMIN_PASS }),
  });
  const data = await res.json();
  if (!data.sessionId || !data.csrfToken) throw new Error(data.error || 'Login falhou');
  return { sessionId: data.sessionId, csrfToken: data.csrfToken };
}

function formatPayload(entry) {
  if (entry.error || !entry.data) return null;
  const d = entry.data;
  const nome = (d.nome || 'Produto importado').trim();
  const descricao = (d.descricao || '').trim();
  const preco = Number(d.preco) || 0;
  const preco_antigo = d.preco_antigo != null ? Number(d.preco_antigo) : null;
  const imagens = Array.isArray(d.imagens) ? d.imagens : [];
  const rating = d.rating_medio != null ? Number(d.rating_medio) : 0;
  const variacoes = d.variacoes && typeof d.variacoes === 'object' && Object.keys(d.variacoes).length > 0 ? d.variacoes : null;
  return {
    nome,
    descricao,
    preco,
    preco_antigo,
    imagem: imagens,
    estoque: 999,
    principal: 0,
    vendas: 0,
    ativo: 1,
    frete_gratis: 0,
    oculto: 0,
    rating,
    tem_variacoes: variacoes ? 1 : 0,
    variacoes: variacoes ? JSON.stringify(variacoes) : null,
    _avaliacoes_lista: Array.isArray(d.avaliacoes_lista) ? d.avaliacoes_lista : [],
  };
}

async function createProduct(payload, sessionId, csrfToken) {
  const { _avaliacoes_lista, ...body } = payload;
  const res = await fetch(`${API_BASE}/api/db/produtos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `sessionId=${sessionId}`,
      'x-session-id': sessionId,
      'x-csrf-token': csrfToken,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  const prod = await res.json();
  return { prod, avaliacoes: _avaliacoes_lista };
}

async function createAvaliacao(av, produtoId, sessionId, csrfToken) {
  const res = await fetch(`${API_BASE}/api/db/avaliacoes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `sessionId=${sessionId}`,
      'x-session-id': sessionId,
      'x-csrf-token': csrfToken,
    },
    body: JSON.stringify({
      produto_id: produtoId,
      autor: av.autor || 'Cliente',
      nota: av.nota != null ? Number(av.nota) : 5,
      comentario: av.comentario || '',
      imagem: av.imagem || null,
    }),
  });
  if (!res.ok) return;
  return res.json();
}

async function main() {
  if (!existsSync(SCRAPED_FILE)) {
    console.error('Arquivo não encontrado:', SCRAPED_FILE);
    console.error('Rode antes: node scripts/scrape-capture-only.js urls.txt');
    process.exit(1);
  }
  const raw = JSON.parse(readFileSync(SCRAPED_FILE, 'utf8'));
  const entries = Array.isArray(raw) ? raw : [raw];
  const payloads = entries.map(formatPayload).filter(Boolean);
  if (payloads.length === 0) {
    console.error('Nenhum produto válido em scraped-raw.json');
    process.exit(1);
  }
  console.log('\n[Import] Login...');
  const { sessionId, csrfToken } = await login();
  console.log('[Import] Criando', payloads.length, 'produtos...\n');
  const created = [];
  const failed = [];
  for (let i = 0; i < payloads.length; i++) {
    const p = payloads[i];
    try {
      const { prod, avaliacoes } = await createProduct(p, sessionId, csrfToken);
      created.push({ id: prod.id, nome: prod.nome });
      if (avaliacoes.length > 0) {
        for (const av of avaliacoes.slice(0, 20)) {
          await createAvaliacao(av, prod.id, sessionId, csrfToken);
        }
      }
      console.log(`  [${i + 1}/${payloads.length}] id ${prod.id}: ${prod.nome}`);
    } catch (e) {
      failed.push({ nome: p.nome, error: e.message });
      console.log(`  [${i + 1}/${payloads.length}] ERRO: ${p.nome} => ${e.message}`);
    }
  }
  console.log('\n--- Resumo ---');
  console.log('Criados:', created.length);
  console.log('Falhas:', failed.length);
  if (failed.length) failed.forEach((f) => console.log('  -', f.nome, '=>', f.error));
}

main().catch((e) => { console.error(e); process.exit(1); });
