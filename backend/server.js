import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import travelRoutes from "./routes/travel.routes.js";
import authRoutes from "./routes/auth.routes.js";

const PORT = process.env.PORT || 5000;
const app = express();

// ─── CORS ───
const corsOrigin = process.env.CORS_ORIGIN || "*";

app.use(
  cors({
    origin: corsOrigin === "*" ? true : corsOrigin.split(",").map(o => o.trim()),
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json({ limit: "5mb" }));

// ─── Health check (used by the keep-alive ping) ───
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

// ─── Routes ───
app.use("/api", travelRoutes);
app.use("/api/auth", authRoutes);

// ─── Keep-alive self-ping (prevents Render free-tier sleep) ───
const KEEP_ALIVE_INTERVAL = 14 * 60 * 1000; // 14 minutes

function startKeepAlive() {
  const appUrl = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;

  setInterval(async () => {
    try {
      const res = await fetch(`${appUrl}/health`);
      console.log(`[keep-alive] pinged ${appUrl}/health — ${res.status}`);
    } catch (err) {
      console.warn("[keep-alive] ping failed:", err.message);
    }
  }, KEEP_ALIVE_INTERVAL);
}

// ─── Start ───
async function startServer() {
  try {
    await pool.query("SELECT 1");
    console.log("Database ready");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      startKeepAlive();
    });
  } catch (err) {
    console.error("Startup error:", err);
    process.exit(1);
  }
}

startServer();
