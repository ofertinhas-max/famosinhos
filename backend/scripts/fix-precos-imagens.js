/**
 * Corrige apenas preço, preço original e imagens dos 15 produtos já criados.
 * Mantém nome, descrição e rating. Re-scrape cada URL e faz PUT na API.
 *
 * Uso: API_BASE_URL e ADMIN_USER/ADMIN_PASS (env). node scripts/fix-precos-imagens.js
 *
 * Preços: se o site devolver o mesmo valor em todas as páginas, use o arquivo
 * opcional precos-manuais.json (na mesma pasta) para forçar preços por índice:
 * [ { "preco": 85, "preco_antigo": 120 }, ... ] (ordem = ordem de urls.txt).
 */

import puppeteer from 'puppeteer';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const API_BASE = process.env.API_BASE_URL || 'http://76.13.225.70:3002';
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'admin123';
const URLS_FILE = join(__dirname, 'urls.txt');
const PRECOS_MANUAIS_FILE = join(__dirname, 'precos-manuais.json');

function getExtractPrecoImagens() {
  return () => {
    const toNum = (str) => {
      if (str == null || str === '') return null;
      let s = String(str).replace(/\s/g, '').replace(/R\$/gi, '');
      const match = s.match(/(\d{1,3}(?:\.\d{3})*,\d{2}|\d{1,3}(?:\.\d{3})*\.\d{2}|\d+,\d{2}|\d+\.\d{2})/);
      if (!match) return null;
      s = match[1];
      const br = /^(\d{1,3}(?:\.\d{3})*),(\d{2})$/.exec(s) || /^(\d+),(\d{2})$/.exec(s);
      if (br) return parseFloat(br[1].replace(/\./g, '') + '.' + br[2]);
      return parseFloat(s.replace(',', '.'));
    };

    const h1 = document.querySelector('h1');
    const productRoot = h1 ? (h1.closest('section') || h1.closest('article') || h1.closest('[class*="product"]') || h1.parentElement?.parentElement?.parentElement || h1.parentElement || document.body) : (document.querySelector('main') || document.body);
    const rootText = productRoot.innerText || '';

    let preco = 0;
    let preco_antigo = null;
    const fromAttr = (el) => {
      const v = el.getAttribute('content') || el.getAttribute('data-price') || el.getAttribute('data-preco');
      if (v) return toNum(v) || parseFloat(v);
      return toNum(el.innerText);
    };
    const priceSelectors = '[itemprop="price"], [data-price], [data-preco], .price, .product-price, .current-price, [class*="price"]';
    const priceEls = productRoot.querySelectorAll(priceSelectors);
    const fromEls = [];
    for (const el of priceEls) {
      const v = fromAttr(el);
      if (v != null && v >= 5 && v <= 50000) fromEls.push(v);
    }
    if (fromEls.length >= 1) {
      const uniq = [...new Set(fromEls)].sort((a, b) => a - b);
      preco = uniq[0];
      preco_antigo = uniq.length > 1 ? uniq[1] : null;
    }
    if (preco === 0) {
      const priceRegex = /R\$\s*[\d.,]+|[\d]{1,3}(?:[.,][\d]{3})*[.,][\d]{2}/g;
      const matches = rootText.match(priceRegex) || [];
      const nums = matches.map((s) => toNum(s)).filter((n) => n != null && n >= 10 && n <= 50000);
      const uniq = [...new Set(nums)].sort((a, b) => a - b);
      preco = uniq[0] ?? 0;
      preco_antigo = uniq.length > 1 ? uniq[1] : null;
    }
    if (preco > 0 && preco < 30 && preco_antigo != null && preco_antigo < 30 && preco_antigo > preco) {
      preco *= 10;
      preco_antigo *= 10;
    }

    const isReview = (el) => el.closest && el.closest('.review-card, .review-photo, [class*="review"], [class*="avaliacao"]');
    const cleanSrc = (s) => s && !s.startsWith('data:') && !s.includes('pixel') ? s : null;

    const firstGallery = () => {
      const walk = (node) => {
        if (!node || node.nodeType !== 1) return null;
        const imgs = node.querySelectorAll ? node.querySelectorAll('img') : [];
        const productImgs = Array.from(imgs).filter((i) => !isReview(i));
        const srcs = productImgs.map((i) => cleanSrc(i.src || i.getAttribute('data-src'))).filter(Boolean);
        if (srcs.length >= 5 && srcs.length <= 12) return srcs;
        for (const ch of node.children || []) {
          const r = walk(ch);
          if (r) return r;
        }
        return null;
      };
      return walk(productRoot);
    };

    const imagens = firstGallery() || [];
    return { preco, preco_antigo, imagens };
  };
}

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

async function getProdutos(sessionId, csrfToken) {
  const res = await fetch(`${API_BASE}/api/db/produtos`, {
    headers: { Cookie: `sessionId=${sessionId}`, 'x-session-id': sessionId, 'x-csrf-token': csrfToken },
  });
  if (!res.ok) throw new Error('Falha ao listar produtos');
  return res.json();
}

async function getProduto(id, sessionId, csrfToken) {
  const res = await fetch(`${API_BASE}/api/db/produtos/${id}`, {
    headers: { Cookie: `sessionId=${sessionId}`, 'x-session-id': sessionId, 'x-csrf-token': csrfToken },
  });
  if (!res.ok) throw new Error('Falha ao buscar produto ' + id);
  return res.json();
}

async function putProduto(id, body, sessionId, csrfToken) {
  const res = await fetch(`${API_BASE}/api/db/produtos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `sessionId=${sessionId}`,
      'x-session-id': sessionId,
      'x-csrf-token': csrfToken,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const e = await res.json().catch(() => ({}));
    throw new Error(e.error || 'PUT falhou');
  }
  return res.json();
}

async function main() {
  if (!existsSync(URLS_FILE)) {
    console.error('urls.txt não encontrado');
    process.exit(1);
  }
  const urls = readFileSync(URLS_FILE, 'utf8')
    .split(/\r?\n/)
    .map((u) => u.trim())
    .filter((u) => u.startsWith('http'));
  if (urls.length === 0) {
    console.error('Nenhuma URL em urls.txt');
    process.exit(1);
  }

  console.log('\n[Fix] Login...');
  const auth = await login();
  const produtos = await getProdutos(auth.sessionId, auth.csrfToken);
  const ids = produtos
    .filter((p) => p.id >= 4)
    .sort((a, b) => a.id - b.id)
    .map((p) => p.id)
    .slice(0, urls.length);
  if (ids.length < urls.length) {
    console.error('Produtos insuficientes na API. Esperado', urls.length, 'ids >= 4, obtido', ids.length);
    process.exit(1);
  }

  let precosManuais = null;
  if (existsSync(PRECOS_MANUAIS_FILE)) {
    try {
      precosManuais = JSON.parse(readFileSync(PRECOS_MANUAIS_FILE, 'utf8'));
      console.log('[Fix] Usando preços de precos-manuais.json');
    } catch (e) {
      console.warn('[Fix] precos-manuais.json inválido, ignorando:', e.message);
    }
  }

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const extract = getExtractPrecoImagens();

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const id = ids[i];
    console.log(`[${i + 1}/${urls.length}] ${url} -> id ${id}`);
    try {
      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0');
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      await new Promise((r) => setTimeout(r, 2500));
      const { preco, preco_antigo, imagens } = await page.evaluate(extract);
      await page.close();

      let usePreco = preco;
      let usePrecoAntigo = preco_antigo;
      if (precosManuais) {
        const manual = Array.isArray(precosManuais) ? precosManuais[i] : precosManuais[String(id)];
        if (manual && (manual.preco != null || manual.preco_antigo != null)) {
          if (manual.preco != null) usePreco = Number(manual.preco);
          if (manual.preco_antigo != null) usePrecoAntigo = Number(manual.preco_antigo);
        }
      }

      const current = await getProduto(id, auth.sessionId, auth.csrfToken);
      const imagem = Array.isArray(current.imagem) ? current.imagem : (typeof current.imagem === 'string' ? (() => { try { return JSON.parse(current.imagem); } catch { return []; } })() : []);
      const payload = {
        nome: current.nome,
        descricao: current.descricao ?? '',
        preco: usePreco ?? current.preco ?? 0,
        preco_antigo: usePrecoAntigo != null ? usePrecoAntigo : current.preco_antigo,
        imagem: imagens.length > 0 ? imagens : imagem,
        estoque: current.estoque ?? 999,
        principal: current.principal ?? 0,
        vendas: current.vendas ?? 0,
        ativo: current.ativo !== 0 ? 1 : 0,
        frete_gratis: current.frete_gratis ? 1 : 0,
        oculto: current.oculto ? 1 : 0,
        rating: current.rating ?? 0,
        tem_variacoes: current.tem_variacoes ? 1 : 0,
        variacoes: current.variacoes ?? null,
      };
      await putProduto(id, payload, auth.sessionId, auth.csrfToken);
      console.log(`    preco: ${payload.preco} | antigo: ${payload.preco_antigo ?? '-'} | imagens: ${(payload.imagem || []).length}`);
    } catch (e) {
      console.log(`    ERRO: ${e.message}`);
    }
  }

  await browser.close();
  console.log('\n[Fix] Concluído.');
}

main().catch((e) => { console.error(e); process.exit(1); });
