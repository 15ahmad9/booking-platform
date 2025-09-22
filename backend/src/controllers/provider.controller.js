// src/controllers/provider.controller.js
import { Provider, Service, User } from "../models/index.js";

export const createProvider = async (req, res) => {
  try {
    // provider creation: either admin creates or provider user creates own profile
    const payload = req.body;
    // if provider user - attach user_id from auth
    if (req.user?.role === "provider") payload.user_id = req.user.id;
    const provider = await Provider.create(payload);
    res.status(201).json({ message: "Provider created", provider });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const getAllProviders = async (req, res) => {
  try {
    const providers = await Provider.findAll({
      include: [{ model: Service, as: "services" }]
    });
    res.json(providers);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getProviderById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const provider = await Provider.findByPk(id, { include: [{ model: Service, as: "services" }, { model: User, as: "owner", attributes: ["id", "name", "email"] }] });
    if (!provider) return res.status(404).json({ error: "Provider not found" });
    res.json(provider);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const updateProvider = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const provider = await Provider.findByPk(id);
    if (!provider) return res.status(404).json({ error: "Provider not found" });

    // If provider user, ensure ownership
    if (req.user.role === "provider" && provider.user_id !== req.user.id) {
      return res.status(403).json({ error: "Not your provider profile" });
    }

    await provider.update(req.body);
    res.json({ message: "Provider updated", provider });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteProvider = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const provider = await Provider.findByPk(id);
    if (!provider) return res.status(404).json({ error: "Provider not found" });
    await provider.destroy();
    res.json({ message: "Provider deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
