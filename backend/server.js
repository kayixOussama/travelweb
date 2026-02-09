import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import travelRoutes from "./routes/travel.routes.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", travelRoutes);

async function startServer() {
  try {
    await pool.query("SELECT 1");
    console.log("Database ready");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Startup error:", err);
    process.exit(1);
  }
}

startServer();
