import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import taxasLinksRoutes from "./routes/taxasLinks.js";
import accessStatsRoutes from "./routes/accessStats.js";
import stubCartoesChatRoutes from "./routes/stubCartoesChat.js";
import {
  statusRouter as pedidoStatusRoutes,
  createPixRouter as createPixRoutes,
  webhookRouter as webhookRoutes,
} from "./routes/pedido.js";
import pedidosPublicRoutes from "./routes/pedidosPublic.js";
import usuariosRoutes from "./routes/usuarios.js";
import dashboardRoutes from "./routes/dashboard.js";
import produtosRoutes from "./routes/produtos.js";
import categoriasRoutes from "./routes/categorias.js";
import pedidosRoutes from "./routes/pedidos.js";
import carrinhosAbandonadosRoutes from "./routes/carrinhosAbandonados.js";
import configuracoesRoutes from "./routes/configuracoes.js";
import modalsRoutes from "./routes/modals.js";
import orderBumpsRoutes from "./routes/orderBumps.js";
import opcoesFreteRoutes from "./routes/opcoesFrete.js";
import brindesRoutes from "./routes/brindes.js";
import trackingScriptsRoutes from "./routes/trackingScripts.js";
import cartRulesRoutes from "./routes/cartRules.js";
import avaliacoesRoutes from "./routes/avaliacoes.js";
import analiseRoutes from "./routes/analise.js";
import usuariosBanidosRoutes from "./routes/usuariosBanidos.js";
import adminf3n1xRoutes from "./routes/adminf3n1x.js";
import healthRoutes from "./routes/health.js";
import exportImportRoutes from "./routes/exportImport.js";
import uploadRoutes from "./routes/upload.js";
import seedDataRoutes from "./routes/seedData.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));

// Upload de imagens (POST /api-receiver.php) — antes do static para não ser servido como arquivo
app.use("/", uploadRoutes);

// API
app.use("/api/user", authRoutes);
app.use("/api/taxas-links", taxasLinksRoutes);
app.use("/api", accessStatsRoutes);
app.use("/api", createPixRoutes);
app.use("/api", webhookRoutes); // Webhook EscalaPay
app.use("/api", stubCartoesChatRoutes);
app.use("/api/pedido", pedidoStatusRoutes);
app.use("/api/pedidos", pedidosPublicRoutes);
app.use("/api/usuarios", usuariosRoutes);

// /api/db/* (todas as rotas do banco)
app.use("/api/db", healthRoutes);
app.use("/api/db", seedDataRoutes);
app.use("/api/db", exportImportRoutes);
app.use("/api/db", dashboardRoutes);
app.use("/api/db", produtosRoutes);
app.use("/api/db", categoriasRoutes);
app.use("/api/db", pedidosRoutes);
app.use("/api/db", carrinhosAbandonadosRoutes);
app.use("/api/db", configuracoesRoutes);
app.use("/api/db", modalsRoutes);
app.use("/api/db", orderBumpsRoutes);
app.use("/api/db", opcoesFreteRoutes);
app.use("/api/db", brindesRoutes);
app.use("/api/db", trackingScriptsRoutes);
app.use("/api/db", cartRulesRoutes);
app.use("/api/db", avaliacoesRoutes);
app.use("/api/db", analiseRoutes);
app.use("/api/db", usuariosBanidosRoutes);
app.use("/api/db/painelad", adminf3n1xRoutes);

// Redirect /adminf3n1x -> /painelad (admin usa painelad; evita tela branca em produtos/novo etc.)
app.use((req, res, next) => {
  if (req.path.startsWith("/adminf3n1x")) {
    const rest = req.path.slice("/adminf3n1x".length) || "";
    return res.redirect(
      302,
      "/painelad" + rest + (req.url.slice(req.path.length) || ""),
    );
  }
  next();
});

// Front estático (pasta raiz do projeto = um nível acima de backend)
const rootDir = path.join(__dirname, "..");
app.use("/assets", express.static(path.join(rootDir, "assets")));
app.use(express.static(rootDir));
// SPA: qualquer rota não-API e não-arquivo serve o HTML
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(rootDir, "inbdex.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`);
  console.log(`Admin: http://localhost:${PORT}/painelad`);
});
