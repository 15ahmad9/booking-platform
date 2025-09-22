// src/models/Booking.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Booking = sequelize.define("Booking", {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  customer_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  provider_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  service_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  booking_date: { type: DataTypes.DATEONLY, allowNull: false },
  booking_time: { type: DataTypes.TIME, allowNull: false },
  status: { type: DataTypes.ENUM("pending", "confirmed", "cancelled"), defaultValue: "pending" }
}, {
  tableName: "bookings"
});

export default Booking;
