// src/models/Service.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Service = sequelize.define("Service", {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  provider_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  name: { type: DataTypes.STRING(150), allowNull: false },
  price: { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0.00 },
  duration: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, comment: "duration in minutes" }
}, {
  tableName: "services"
});

export default Service;
