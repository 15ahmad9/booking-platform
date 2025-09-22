// src/controllers/user.controller.js
import { User, Provider } from "../models/index.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ["id", "name", "email", "role", "createdAt"] });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = await User.findByPk(id, { attributes: ["id", "name", "email", "role", "createdAt"], include: [{ model: Provider, as: "providerProfile" }] });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, email, password } = req.body;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      user.password = hashed;
    }
    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();
    res.json({ message: "User updated", user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    await user.destroy();
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
