# Loja TikTok: backend Node serve frontend (inbdex.html + assets) a partir da raiz
FROM node:20-slim

WORKDIR /app

# Copia todo o repositório (backend, assets, inbdex.html)
COPY . .

# Instala dependências do backend (better-sqlite3 compila no build)
RUN cd backend && npm install --omit=dev

ENV NODE_ENV=production
EXPOSE 3000

# Se não existir loja.db (volume novo), usa o backup da VPS antiga; depois init (migrações) e sobe o servidor
CMD ["sh", "-c", "if [ ! -f backend/db/loja.db ]; then cp backend/db/loja-vps-antiga.db backend/db/loja.db && echo 'Banco inicializado a partir de loja-vps-antiga.db'; fi && node backend/db/init.js && node backend/server.js"]
