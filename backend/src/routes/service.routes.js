// src/routes/service.routes.js
import express from "express";
import * as serviceCtrl from "../controllers/service.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/", verifyToken, requireRole("provider","admin"), serviceCtrl.createService);
router.get("/", serviceCtrl.getAllServices);
router.get("/:id", serviceCtrl.getServiceById);
router.put("/:id", verifyToken, requireRole("provider","admin"), serviceCtrl.updateService);
router.delete("/:id", verifyToken, requireRole("admin"), serviceCtrl.deleteService);

export default router;
