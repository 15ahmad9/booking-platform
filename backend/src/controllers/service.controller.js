// src/controllers/service.controller.js
import { Service, Provider } from "../models/index.js";

export const createService = async (req, res) => {
  try {
    const payload = req.body;

    // If provider role, make sure provider_id is set to their profile
    if (req.user.role === "provider") {
      // attempt to find provider profile for this user
      const provider = await Provider.findOne({ where: { user_id: req.user.id } });
      if (!provider) return res.status(403).json({ error: "Provider profile not found" });
      payload.provider_id = provider.id;
    }

    const service = await Service.create(payload);
    res.status(201).json({ message: "Service created", service });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const service = await Service.findByPk(id);
    if (!service) return res.status(404).json({ error: "Service not found" });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const updateService = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const service = await Service.findByPk(id);
    if (!service) return res.status(404).json({ error: "Service not found" });

    // If provider role, ensure ownership
    if (req.user.role === "provider" && service.provider_id !== (await Provider.findOne({ where: { user_id: req.user.id } })).id) {
      return res.status(403).json({ error: "Not allowed" });
    }

    await service.update(req.body);
    res.json({ message: "Service updated", service });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteService = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const service = await Service.findByPk(id);
    if (!service) return res.status(404).json({ error: "Service not found" });

    // Admin only or provider owner
    if (req.user.role === "provider") {
      const provider = await Provider.findOne({ where: { user_id: req.user.id } });
      if (!provider || provider.id !== service.provider_id) return res.status(403).json({ error: "Not allowed" });
    }

    await service.destroy();
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
