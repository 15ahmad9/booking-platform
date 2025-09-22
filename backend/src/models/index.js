// src/models/index.js
import User from "./User.js";
import Provider from "./Provider.js";
import Service from "./Service.js";
import Booking from "./Booking.js";
import ContactMessage from "./ContactMessage.js";

// Associations

// Provider is owned by a User (user_id)
Provider.belongsTo(User, { foreignKey: "user_id", as: "owner", onDelete: "CASCADE" });
User.hasOne(Provider, { foreignKey: "user_id", as: "providerProfile" });

// Provider -> Services
Service.belongsTo(Provider, { foreignKey: "provider_id", as: "provider", onDelete: "CASCADE" });
Provider.hasMany(Service, { foreignKey: "provider_id", as: "services" });

// Booking relations
Booking.belongsTo(User, { foreignKey: "customer_id", as: "customer", onDelete: "CASCADE" });
User.hasMany(Booking, { foreignKey: "customer_id", as: "bookings" });

Booking.belongsTo(Provider, { foreignKey: "provider_id", as: "provider", onDelete: "CASCADE" });
Provider.hasMany(Booking, { foreignKey: "provider_id", as: "bookings" });

Booking.belongsTo(Service, { foreignKey: "service_id", as: "service", onDelete: "CASCADE" });
Service.hasMany(Booking, { foreignKey: "service_id", as: "bookings" });

// ContactMessage optional user
ContactMessage.belongsTo(User, { foreignKey: "user_id", as: "user", onDelete: "SET NULL" });
User.hasMany(ContactMessage, { foreignKey: "user_id", as: "messages" });

export {
  User,
  Provider,
  Service,
  Booking,
  ContactMessage
};
