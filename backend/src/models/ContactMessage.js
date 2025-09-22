// src/models/ContactMessage.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ContactMessage = sequelize.define("ContactMessage", {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true }, // optional if visitor
  name: { type: DataTypes.STRING(150), allowNull: false },
  email: { type: DataTypes.STRING(150), allowNull: false },
  subject: { type: DataTypes.STRING(255), allowNull: true },
  message: { type: DataTypes.TEXT, allowNull: false },
  status: { type: DataTypes.ENUM("new", "read", "archived"), defaultValue: "new" }
}, {
  tableName: "contact_messages"
});

export default ContactMessage;
