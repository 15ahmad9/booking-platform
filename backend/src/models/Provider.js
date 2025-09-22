// src/models/Provider.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Provider = sequelize.define("Provider", {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false }, // owner user id
  business_name: { type: DataTypes.STRING(200), allowNull: false },
  category: { type: DataTypes.ENUM("men_salon", "women_salon", "clinic", "hamam"), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  location: { type: DataTypes.STRING(255), allowNull: true },
  working_hours: { type: DataTypes.JSON, allowNull: true } // e.g. {"mon":"9-18","tue":"9-18"}
}, {
  tableName: "providers"
});

export default Provider;
