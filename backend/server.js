import pool from "./config/db.js";
import express from "express"
import getDestinations from "./queries/destinationQueries.js"

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());


async function startServer() {
  try {
    await pool.query("SELECT 1");
    console.log("Database ready ✅");

    getDestinations()

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Startup error:", err);
  }
}

startServer();
