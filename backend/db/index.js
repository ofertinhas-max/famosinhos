import Database from 'better-sqlite3';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, 'loja.db');

export const db = new Database(dbPath);

db.pragma('foreign_keys = ON');

function flattenParams(params) {
  if (params.length === 1 && Array.isArray(params[0])) return params[0];
  return params;
}

db.get = function (sql, ...params) {
  return db.prepare(sql).get(...flattenParams(params));
};

db.all = function (sql, ...params) {
  return db.prepare(sql).all(...flattenParams(params));
};

db.run = function (sql, ...params) {
  return db.prepare(sql).run(...flattenParams(params));
};

export function run(sql, params = []) {
  return db.prepare(sql).run(...(Array.isArray(params) ? params : [params]));
}

export function get(sql, params = []) {
  return db.prepare(sql).get(...(Array.isArray(params) ? params : [params]));
}

export function all(sql, params = []) {
  return db.prepare(sql).all(...(Array.isArray(params) ? params : [params]));
}
