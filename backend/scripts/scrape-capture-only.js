/**
 * FASE 1: Apenas captura. NÃO envia nada para a API.
 *
 * Uso:
 *   node scripts/scrape-capture-only.js "https://url-do-produto.com/produto/1"
 *   node scripts/scrape-capture-only.js urls.txt
 *
 * Salva em: backend/scripts/scraped-raw.json (um objeto por URL, com toda a estrutura
 * que o site expõe). Depois analisamos esse JSON e mapeamos para o formato da nossa loja.
 */

import puppeteer from 'puppeteer';
import { readFileSync, existsSync, writeFileSync, readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname);
const OUTPUT_FILE = join(OUTPUT_DIR, 'scraped-raw.json');

// ---------- Extração COMPLETA (roda no browser) ----------
function getExtractionScript() {
  return () => {
    const toNum = (str) => {
      if (str == null || str === '') return null;
      let s = String(str).trim().replace(/\./g, '').replace(',', '.');
      if (/^\d+\.\d+$/.test(s)) return parseFloat(s) || null;
      s = String(str).replace(/\D/g, '');
      if (s.length <= 2) return parseFloat(s) || null;
      const n = parseFloat(s.slice(0, -2) + '.' + s.slice(-2));
      return isNaN(n) ? null : n;
    };

    // ---- Nome ----
    const nome =
      document.querySelector('h1')?.innerText?.trim() ||
      document.querySelector('[data-product-title]')?.innerText?.trim() ||
      document.querySelector('.product-title')?.innerText?.trim() ||
      document.querySelector('[class*="product"] h1')?.innerText?.trim() ||
      document.querySelector('meta[property="og:title"]')?.getAttribute('content')?.trim() ||
      document.querySelector('title')?.innerText?.split(/[\|\-–—]/)[0]?.trim() ||
      '';

    // ---- Descrição ----
    const descSelectors = [
      'meta[property="og:description"]',
      'meta[name="description"]',
      '.product-description',
      '.description',
      '[data-description]',
      '.product__description',
      '#description',
      '[itemprop="description"]',
      '.product-info__description',
      '.desc',
      '[class*="descricao"]',
      '[class*="description"]',
    ];
    let descricao = '';
    for (const sel of descSelectors) {
      const el = document.querySelector(sel);
      const v = el?.getAttribute?.('content')?.trim() || (el?.innerHTML?.trim() && el.innerText?.length > 10 ? el.innerHTML.trim() : el?.innerText?.trim());
      if (v && v.length > 10) {
        descricao = v;
        break;
      }
    }
    if (!descricao) {
      const h3Desc = Array.from(document.querySelectorAll('h2, h3')).find((h) => /descri[cç]ão/i.test(h.innerText || ''));
      if (h3Desc && h3Desc.nextElementSibling) descricao = h3Desc.nextElementSibling.innerHTML?.trim() || h3Desc.nextElementSibling.innerText?.trim() || '';
    }

    // ---- Preços (todos os números que parecem preço) ----
    const allText = document.body.innerText || '';
    const priceRegex = /R\$\s*[\d.,]+|[\d.,]+\s*R\$|preço[\s:]*[\d.,]+|[\d]{1,3}(?:[.,][\d]{3})*[.,][\d]{2}/gi;
    const priceMatches = allText.match(priceRegex) || [];
    const precosNumeros = priceMatches.map((s) => toNum(s)).filter((n) => n != null && n > 0 && n < 1000000);
    const precosUnicos = [...new Set(precosNumeros)].sort((a, b) => a - b);
    let preco = precosUnicos[0] ?? 0;
    let preco_antigo = precosUnicos.length > 1 ? precosUnicos[precosUnicos.length - 1] : null;
    // Se tiver dois preços próximos (promo), menor = atual, maior = original
    if (precosUnicos.length >= 2) {
      preco = precosUnicos[0];
      preco_antigo = precosUnicos[1];
    }
    // Fallback: seletores comuns de preço
    const priceEls = document.querySelectorAll('[data-price], .price, .product-price, .current-price, [itemprop="price"], .product__price, .price__current');
    for (const el of priceEls) {
      const v = toNum(el.getAttribute('content') || el.getAttribute('data-price') || el.innerText);
      if (v != null && v > 0) {
        if (preco === 0) preco = v;
        else if (v > preco && !preco_antigo) preco_antigo = v;
        else if (v < preco) { preco_antigo = preco; preco = v; }
      }
    }

    // ---- Imagens do PRODUTO: só a galeria principal (ex.: 7 imagens), nunca avaliações ----
    const isFromReview = (el) => el.closest && el.closest('.review-card, .review-photo, .review-header, [class*="review-card"], [class*="review-photo"], [class*="avaliacao"], [class*="review-"]');
    const cleanSrc = (src) => src && !src.startsWith('data:') && !src.includes('pixel') && !src.includes('tracking') ? src : null;
    let imagens = [];
    const allProductImgs = [];
    document.querySelectorAll('img[src]').forEach((img) => {
      if (isFromReview(img)) return;
      const src = cleanSrc(img.src || img.getAttribute('data-src') || img.getAttribute('data-lazy-src'));
      if (!src || (img.naturalWidth > 0 && img.naturalWidth < 50)) return;
      allProductImgs.push({ img, src });
    });
    const galleryWithExactlyN = (n) => {
      for (const { img } of allProductImgs) {
        let p = img.parentElement;
        let depth = 0;
        while (p && p !== document.body && depth < 12) {
          const imgs = p.querySelectorAll('img');
          const inReview = Array.from(imgs).filter((i) => isFromReview(i));
          const productImgs = Array.from(imgs).filter((i) => !isFromReview(i));
          if (productImgs.length === n) {
            return productImgs.map((i) => cleanSrc(i.src || i.getAttribute('data-src'))).filter(Boolean);
          }
          p = p.parentElement;
          depth++;
        }
      }
      return null;
    };
    imagens = galleryWithExactlyN(7) || galleryWithExactlyN(6) || galleryWithExactlyN(8) || galleryWithExactlyN(5);
    if (!imagens || imagens.length === 0) {
      const fallback = new Set();
      allProductImgs.slice(0, 15).forEach(({ src }) => { if (src) fallback.add(src); });
      imagens = Array.from(fallback);
    }

    // ---- Avaliações / Rating ----
    let rating_medio = null;
    let rating_quantidade = null;
    const avaliacoes_lista = [];
    const ratingEl = document.querySelector('[itemprop="ratingValue"], .rating-value, .product-rating [data-rating], [data-rating], .review-rating, .star-rating, [class*="rating"]');
    if (ratingEl) {
      const v = parseFloat((ratingEl.getAttribute('content') || ratingEl.getAttribute('data-rating') || ratingEl.innerText || '').replace(',', '.'));
      if (!isNaN(v) && v >= 0 && v <= 5) rating_medio = v;
    }
    if (rating_medio == null) {
      const ratingText = document.body.innerText.match(/(\d[,.]\d)\s*\/\s*5|(\d[,.]\d)\s*estrelas?/i);
      if (ratingText) {
        const v = parseFloat((ratingText[1] || ratingText[2] || '').replace(',', '.'));
        if (!isNaN(v)) rating_medio = v;
      }
    }
    const countEl = document.querySelector('[itemprop="reviewCount"], .review-count, .rating-count, .review__count');
    if (countEl) {
      const n = parseInt(String(countEl.innerText || countEl.getAttribute('content')).replace(/\D/g, ''), 10);
      if (!isNaN(n)) rating_quantidade = n;
    }
    document.querySelectorAll('.review, [class*="review"], .avaliacao, .comment, [itemprop="review"]').forEach((rev, i) => {
      if (i >= 20) return;
      const autor = rev.querySelector('[itemprop="author"], .author, .review-author, .user-name')?.innerText?.trim() || '';
      const notaEl = rev.querySelector('[itemprop="ratingValue"], .rating, .star, [data-rating]');
      const nota = notaEl ? parseInt(notaEl.getAttribute('content') || notaEl.getAttribute('data-rating') || notaEl.innerText, 10) : null;
      const comentario = rev.querySelector('[itemprop="reviewBody"], .review-body, .comment-text, .review-text')?.innerText?.trim() || '';
      if (autor || comentario || nota) avaliacoes_lista.push({ autor, nota, comentario });
    });

    // ---- Variações (selects e botões) ----
    const variacoes = {};
    document.querySelectorAll('select[name*="variant"], select[name*="option"], select[id*="variant"], select[data-option], .variant-select, .product-option select').forEach((sel) => {
      const name = (sel.getAttribute('name') || sel.id || sel.getAttribute('data-option-name') || sel.closest('label')?.innerText || sel.previousElementSibling?.innerText || 'Opção').replace(/[\[\]]/g, '').trim();
      const label = name.charAt(0).toUpperCase() + name.slice(1);
      const opcoes = [];
      sel.querySelectorAll('option').forEach((opt) => {
        const v = (opt.value || opt.innerText || '').trim();
        if (v && !/selecione|select|escolha/i.test(v)) opcoes.push(v);
      });
      if (opcoes.length > 0) variacoes[name] = { label, opcoes };
    });
    document.querySelectorAll('[data-variant], [data-option], .variant-picker [role="button"], .product-option [data-value], .swatch').forEach((el) => {
      const name = el.getAttribute('data-option') || el.closest('[data-option-name]')?.getAttribute('data-option-name') || 'Opção';
      const v = (el.getAttribute('data-value') || el.getAttribute('title') || el.innerText || '').trim();
      if (!v) return;
      if (!variacoes[name]) variacoes[name] = { label: name, opcoes: [] };
      if (!variacoes[name].opcoes.includes(v)) variacoes[name].opcoes.push(v);
    });

    return {
      nome,
      descricao,
      preco,
      preco_antigo,
      imagens,
      rating_medio,
      rating_quantidade,
      avaliacoes_lista,
      variacoes: Object.keys(variacoes).length ? variacoes : null,
      // Metadados úteis para análise
      _meta: {
        url: window.location.href,
        title_page: document.title,
        og_title: document.querySelector('meta[property="og:title"]')?.getAttribute('content') || null,
        og_image: document.querySelector('meta[property="og:image"]')?.getAttribute('content') || null,
      },
    };
  };
}

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
    console.log('Uso: node scripts/scrape-capture-only.js "https://url-unica.com"  ou  node scripts/scrape-capture-only.js urls.txt');
    console.log('Saída: scripts/scraped-raw.json (apenas captura, nada é enviado à API)');
    process.exit(1);
  }

  console.log(`\n[Captura] Modo: SOMENTE CAPTURA (não envia para a API)`);
  console.log(`[Captura] URLs: ${urls.length}\n`);

  const launchOpts = {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  };
  if (process.env.PUPPETEER_EXECUTABLE_PATH) launchOpts.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;

  const browser = await puppeteer.launch(launchOpts);

  const resultados = [];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log(`[${i + 1}/${urls.length}] ${url}`);
    try {
      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      await new Promise((r) => setTimeout(r, 2500));

      const raw = await page.evaluate(getExtractionScript());
      await page.close();

      resultados.push({
        url,
        scrapedAt: new Date().toISOString(),
        data: raw,
      });
      console.log(`    -> nome: "${(raw.nome || '').slice(0, 50)}..." | preço: ${raw.preco} | imagens: ${(raw.imagens || []).length} | variações: ${raw.variacoes ? Object.keys(raw.variacoes).length : 0}`);
    } catch (e) {
      console.log(`    -> ERRO: ${e.message}`);
      resultados.push({ url, scrapedAt: new Date().toISOString(), error: e.message });
    }
  }

  await browser.close();

  writeFileSync(OUTPUT_FILE, JSON.stringify(resultados, null, 2), 'utf8');
  console.log(`\n[Captura] Salvo em: ${OUTPUT_FILE}`);
  console.log('Próximo passo: analise esse JSON e compare com o formato que a nossa API espera (nome, preco, preco_antigo, imagem[], rating, avaliacoes, variacoes). Depois montamos o mapeamento e a importação.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
