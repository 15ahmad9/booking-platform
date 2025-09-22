// src/server.js
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import sequelize from "./config/db.js";
import { User, Provider, Service, Booking, ContactMessage } from "./models/index.js";

// Optional: import jobs to start cron/worker when server boots
import "./jobs/reminder.job.js"; // starts cron when imported
// If using Bull + Redis worker in same process (optional):
// import "./jobs/bullWorker.js";

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection OK");

    // Sync models (use migrations in production)
    await sequelize.sync({ alter: true });
    console.log("✅ Models synced");

    app.listen(PORT, () => {
      console.log(`🚀 Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

start();
