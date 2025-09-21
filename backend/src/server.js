// server.js
import dotenv from "dotenv";
import app from "./app.js";
import pool from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, async () => {
  try {
    // Test DB connection
    const connection = await pool.getConnection();
    console.log("✅ Connected to MySQL database");
    connection.release();

    console.log(`🚀 Server running on http://localhost:${PORT}`);
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }
});
