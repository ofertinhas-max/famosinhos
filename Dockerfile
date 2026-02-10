# Loja TikTok: backend Node serve frontend (inbdex.html + assets) a partir da raiz
FROM node:20-slim

WORKDIR /app

# Copia todo o repositório (backend, assets, inbdex.html)
COPY . .

# Instala dependências do backend (better-sqlite3 compila no build)
RUN cd backend && npm install --omit=dev

ENV NODE_ENV=production
EXPOSE 3000

# Roda a partir da raiz para server.js achar ../inbdex.html e ../assets
CMD ["node", "backend/server.js"]
