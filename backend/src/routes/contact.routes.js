// src/routes/contact.routes.js
import express from "express";
import * as contactCtrl from "../controllers/contact.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

const router = express.Router();

// anyone can post a message (no auth)
router.post("/", contactCtrl.createMessage);

// admin views/deletes messages
router.get("/", verifyToken, requireRole("admin"), contactCtrl.getAllMessages);
router.delete("/:id", verifyToken, requireRole("admin"), contactCtrl.deleteMessage);

export default router;
