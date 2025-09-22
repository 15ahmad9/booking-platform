// src/routes/provider.routes.js
import express from "express";
import * as providerCtrl from "../controllers/provider.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

const router = express.Router();

// create: provider (owner) or admin
router.post("/", verifyToken, requireRole("provider","admin"), providerCtrl.createProvider);

// read: public
router.get("/", providerCtrl.getAllProviders);
router.get("/:id", providerCtrl.getProviderById);

// update: owner/provider or admin
router.put("/:id", verifyToken, requireRole("provider","admin"), providerCtrl.updateProvider);

// delete: admin only
router.delete("/:id", verifyToken, requireRole("admin"), providerCtrl.deleteProvider);

export default router;
