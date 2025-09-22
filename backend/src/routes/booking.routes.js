// src/routes/booking.routes.js
import express from "express";
import * as bookingCtrl from "../controllers/booking.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

const router = express.Router();

// create booking (customer)
router.post("/", verifyToken, requireRole("customer"), bookingCtrl.createBooking);

// customer's bookings
router.get("/my", verifyToken, requireRole("customer"), bookingCtrl.getUserBookings);

// admin sees all bookings
router.get("/", verifyToken, requireRole("admin"), bookingCtrl.getAllBookings);

// update booking status (admin or provider) - allow both roles
router.put("/:id", verifyToken, requireRole("admin","provider"), bookingCtrl.updateBookingStatus);

// delete (admin)
router.delete("/:id", verifyToken, requireRole("admin"), bookingCtrl.deleteBooking);

export default router;
