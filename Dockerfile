# Loja TikTok: backend Node serve frontend (inbdex.html + assets) a partir da raiz
FROM node:20-slim

WORKDIR /app

# Copia todo o repositório (backend, assets, inbdex.html)
COPY . .

# Instala dependências do backend (better-sqlite3 compila no build)
RUN cd backend && npm install --omit=dev

# Backup do banco em pasta fora do volume (backend/db é montado no runtime e esconde o conteúdo da imagem)
RUN mkdir -p backend/db-seed && cp backend/db/loja-vps-antiga.db backend/db-seed/loja-vps-antiga.db

ENV NODE_ENV=production
EXPOSE 3000

# Se não existir loja.db (volume novo), copia do seed (db-seed não é montado); depois init e servidor
CMD ["sh", "-c", "if [ ! -f backend/db/loja.db ]; then cp backend/db-seed/loja-vps-antiga.db backend/db/loja.db && echo 'Banco inicializado a partir de loja-vps-antiga.db'; fi && node backend/db/init.js && node backend/server.js"]
