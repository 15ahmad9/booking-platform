// src/routes/user.routes.js
import express from "express";
import * as userCtrl from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/", verifyToken, requireRole("admin"), userCtrl.getAllUsers);
router.get("/:id", verifyToken, requireRole("admin"), userCtrl.getUserById);
router.put("/:id", verifyToken, requireRole("admin"), userCtrl.updateUser);
router.delete("/:id", verifyToken, requireRole("admin"), userCtrl.deleteUser);

export default router;
