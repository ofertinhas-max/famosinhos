/**
 * Script: Scraping de URLs de produtos + importação na loja
 *
 * Uso:
 *   1. Crie um arquivo com uma URL por linha (ex: urls.txt)
 *   2. Configure no .env ou export:
 *      ADMIN_USER=admin
 *      ADMIN_PASS=sua_senha
 *      API_BASE_URL=http://localhost:3002   (ou https://sua-loja.com)
 *   3. Rode: node scripts/scrape-import-products.js urls.txt
 *
 * Ou passe as URLs como argumentos: node scripts/scrape-import-products.js "url1" "url2" ...
 *
 * O script faz login na API, abre cada URL com Puppeteer, extrai nome, preço, imagens,
 * descrição e variações (quando detectáveis) e cria os produtos via POST /api/db/produtos.
 */

import 'dotenv/config';
import puppeteer from 'puppeteer';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const API_BASE = process.env.API_BASE_URL || 'http://localhost:3002';
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'admin123';

// ---------- Login na API (retorna { sessionId, csrfToken }) ----------
async function login() {
  const res = await fetch(`${API_BASE}/api/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: ADMIN_USER, senha: ADMIN_PASS }),
  });
  const data = await res.json();
  if (!data.sessionId || !data.csrfToken) {
    throw new Error(data.error || 'Login falhou. Verifique ADMIN_USER e ADMIN_PASS.');
  }
  return { sessionId: data.sessionId, csrfToken: data.csrfToken };
}

// ---------- Extração na página (rode no browser) ----------
function getExtractionScript() {
  return () => {
    const toNum = (str) => {
      if (str == null || str === '') return null;
      const n = parseFloat(String(str).replace(/\D/g, '').replace(/^(\d+)(\d{2})$/, '$1.$2'));
      return isNaN(n) ? null : n;
    };

    const title =
      document.querySelector('h1')?.innerText?.trim() ||
      document.querySelector('[data-product-title]')?.innerText?.trim() ||
      document.querySelector('.product-title')?.innerText?.trim() ||
      document.querySelector('meta[property="og:title"]')?.getAttribute('content')?.trim() ||
      document.querySelector('title')?.innerText?.split('|')[0]?.trim() ||
      '';

    const desc =
      document.querySelector('meta[property="og:description"]')?.getAttribute('content')?.trim() ||
      document.querySelector('meta[name="description"]')?.getAttribute('content')?.trim() ||
      ['.product-description', '.description', '[data-description]', '.product__description', '#description']
        .map((s) => document.querySelector(s)?.innerText?.trim())
        .find(Boolean) ||
      '';

    // Preço: vários formatos (R$ 99,90 / 99.90 / 99,90)
    const priceSelectors = [
      '[data-price]',
      '.price',
      '.product-price',
      '.current-price',
      '[itemprop="price"]',
      '.product__price',
      '.product-price__current',
      '.price__current',
      '.price-current',
      '[class*="price"]',
    ];
    let priceNum = null;
    let priceOldNum = null;
    const allText = document.body.innerText || '';
    const priceMatch = allText.match(/R\$\s*[\d.,]+|[\d.,]+\s*R\$|preço[\s:]*[\d.,]+/gi);
    if (priceMatch && priceMatch.length > 0) {
      const nums = priceMatch.map((s) => toNum(s)).filter((n) => n != null && n > 0);
      if (nums.length >= 1) {
        const sorted = [...nums].sort((a, b) => a - b);
        priceNum = sorted[0];
        if (sorted.length > 1 && sorted[1] > sorted[0]) priceOldNum = sorted[1];
      }
    }
    for (const sel of priceSelectors) {
      const el = document.querySelector(sel);
      if (!el) continue;
      const v = toNum(el.getAttribute('content') || el.innerText);
      if (v != null && v > 0) {
        if (priceNum == null) priceNum = v;
        else if (v > priceNum && priceOldNum == null) priceOldNum = v;
        else if (v < priceNum) { priceOldNum = priceNum; priceNum = v; }
        break;
      }
    }
    if (priceNum == null) priceNum = 0;

    // Imagens: galeria + og:image
    const imgSet = new Set();
    const ogImg = document.querySelector('meta[property="og:image"]')?.getAttribute('content');
    if (ogImg) imgSet.add(ogImg);
    const gallery = document.querySelector('[data-gallery], .product-gallery, .gallery, .product__media, .product-images, [class*="gallery"], [class*="slider"]');
    const container = gallery || document.querySelector('main') || document.body;
    container.querySelectorAll?.('img[src]')?.forEach((img) => {
      let src = img.src || img.getAttribute('data-src') || img.getAttribute('data-lazy-src');
      if (src && !src.startsWith('data:') && (img.naturalWidth > 100 || img.naturalHeight > 100)) imgSet.add(src);
    });
    document.querySelectorAll('img[src]').forEach((img) => {
      let src = img.src || img.getAttribute('data-src');
      if (src && !src.startsWith('data:') && (img.naturalWidth > 100 || img.naturalHeight > 100)) imgSet.add(src);
    });
    const images = Array.from(imgSet).filter(Boolean).slice(0, 10);

    // Variações: selects e botões (Cor, Tamanho, etc.)
    const variacoes = {};
    document.querySelectorAll('select[name*="variant"], select[name*="option"], select[id*="variant"], select[data-option], .variant-select, .product-option select').forEach((sel) => {
      const name = (sel.getAttribute('name') || sel.id || sel.getAttribute('data-option-name') || sel.previousElementSibling?.innerText || 'Opção').replace(/[\[\]]/g, '').trim();
      const label = name.charAt(0).toUpperCase() + name.slice(1);
      const opcoes = [];
      sel.querySelectorAll('option').forEach((opt) => {
        const v = opt.value?.trim() || opt.innerText?.trim();
        if (v && v.toLowerCase() !== 'selecione' && v.toLowerCase() !== 'select') opcoes.push(v);
      });
      if (opcoes.length > 0) variacoes[name] = { label: label, opcoes };
    });
    document.querySelectorAll('[data-variant], .variant-picker [role="button"], .product-option [data-value]').forEach((el) => {
      const name = el.getAttribute('data-option') || el.closest('[data-option-name]')?.getAttribute('data-option-name') || 'Opção';
      const v = el.getAttribute('data-value') || el.innerText?.trim();
      if (!v) return;
      if (!variacoes[name]) variacoes[name] = { label: name, opcoes: [] };
      if (!variacoes[name].opcoes.includes(v)) variacoes[name].opcoes.push(v);
    });

    return {
      nome: title || 'Produto importado',
      descricao: desc || '',
      preco: priceNum,
      preco_antigo: priceOldNum,
      imagens: images,
      variacoes: Object.keys(variacoes).length ? variacoes : null,
    };
  };
}

// ---------- Criar produto na API ----------
async function createProduct(payload, sessionId, csrfToken) {
  const res = await fetch(`${API_BASE}/api/db/produtos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `sessionId=${sessionId}`,
      'x-session-id': sessionId,
      'x-csrf-token': csrfToken,
    },
    body: JSON.stringify({
      nome: payload.nome,
      descricao: payload.descricao,
      preco: payload.preco,
      preco_antigo: payload.preco_antigo ?? null,
      imagem: Array.isArray(payload.imagens) ? payload.imagens : (payload.imagens ? [payload.imagens] : []),
      estoque: 999,
      principal: 0,
      vendas: 0,
      ativo: 1,
      frete_gratis: 0,
      oculto: 0,
      rating: 0,
      tem_variacoes: payload.variacoes && Object.keys(payload.variacoes).length > 0 ? 1 : 0,
      variacoes: payload.variacoes && Object.keys(payload.variacoes).length > 0 ? JSON.stringify(payload.variacoes) : null,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

// ---------- Main ----------
async function main() {
  let urls = [];
  const arg = process.argv[2];
  if (arg) {
    if (existsSync(arg)) {
      urls = readFileSync(arg, 'utf8')
        .split(/\r?\n/)
        .map((u) => u.trim())
        .filter((u) => u && (u.startsWith('http://') || u.startsWith('https://')));
    } else {
      urls = process.argv.slice(2).filter((u) => u.startsWith('http://') || u.startsWith('https://'));
    }
  }
  if (urls.length === 0) {
    console.log('Uso: node scripts/scrape-import-products.js <arquivo.txt>  ou  node scripts/scrape-import-products.js "url1" "url2" ...');
    console.log('Exemplo: node scripts/scrape-import-products.js urls.txt');
    process.exit(1);
  }

  console.log(`\n[Scrape] Base API: ${API_BASE}`);
  console.log(`[Scrape] URLs a processar: ${urls.length}\n`);

  let sessionId, csrfToken;
  try {
    const auth = await login();
    sessionId = auth.sessionId;
    csrfToken = auth.csrfToken;
    console.log('[Scrape] Login OK.\n');
  } catch (e) {
    console.error('[Scrape] Erro no login:', e.message);
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const created = [];
  const failed = [];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log(`[${i + 1}/${urls.length}] ${url}`);
    try {
      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForTimeout(2000);

      const raw = await page.evaluate(getExtractionScript());
      await page.close();

      const payload = {
        nome: raw.nome || `Produto ${i + 1}`,
        descricao: raw.descricao || '',
        preco: raw.preco ?? 0,
        preco_antigo: raw.preco_antigo ?? null,
        imagens: Array.isArray(raw.imagens) ? raw.imagens : [],
        variacoes: raw.variacoes && typeof raw.variacoes === 'object' ? raw.variacoes : null,
      };

      const prod = await createProduct(payload, sessionId, csrfToken);
      created.push({ id: prod.id, nome: prod.nome, url });
      console.log(`    -> Criado id ${prod.id}: ${prod.nome}`);
    } catch (e) {
      failed.push({ url, error: e.message });
      console.log(`    -> ERRO: ${e.message}`);
    }
  }

  await browser.close();

  console.log('\n--- Resumo ---');
  console.log(`Criados: ${created.length}`);
  console.log(`Falhas: ${failed.length}`);
  if (failed.length > 0) {
    console.log('\nFalhas:');
    failed.forEach((f) => console.log(`  ${f.url} => ${f.error}`));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
