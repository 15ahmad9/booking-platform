// src/config/db.js
import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      // Useful when you handle timezones later
      dateStrings: true,
      typeCast: true
    },
    define: {
      underscored: true,
      timestamps: true
    }
  }
);

export default sequelize;
