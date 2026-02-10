/**
 * Atualiza em massa o campo vendas dos produtos.
 * Produtos com vendas = 0 (ou todos) recebem número aleatório entre 1000 e 15000.
 * Uso: node scripts/atualizar-vendas-massa.mjs
 *      (rodar na pasta backend ou: node backend/scripts/atualizar-vendas-massa.mjs)
 */
import Database from 'better-sqlite3';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, '..', 'db', 'loja.db');

const db = new Database(dbPath);

function randomEntre(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const produtos = db.prepare('SELECT id, nome, vendas FROM produtos').all();
console.log(`Total de produtos: ${produtos.length}`);

const update = db.prepare('UPDATE produtos SET vendas = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
let atualizados = 0;

for (const p of produtos) {
  const novoVendas = randomEntre(1000, 15000);
  update.run(novoVendas, p.id);
  atualizados++;
  if (atualizados <= 5) console.log(`  ID ${p.id}: "${p.nome?.slice(0, 30)}..." → vendas = ${novoVendas}`);
}

console.log(`\nConcluído: ${atualizados} produtos com vendas entre 1000 e 15000.`);
db.close();
