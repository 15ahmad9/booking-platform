// src/controllers/booking.controller.js
import { Booking, Service, Provider, User } from "../models/index.js";
import { sendMail } from "../config/mailer.js";

export const createBooking = async (req, res) => {
  try {
    const { booking_date, booking_time, provider_id, service_id } = req.body;
    if (!booking_date || !booking_time || !provider_id || !service_id) return res.status(400).json({ error: "Missing fields" });

    // check conflicts: same provider, same date & time
    const conflict = await Booking.findOne({
      where: { provider_id, booking_date, booking_time, status: "confirmed" }
    });
    if (conflict) return res.status(409).json({ error: "Time slot already booked" });

    const booking = await Booking.create({
      customer_id: req.user.id,
      provider_id,
      service_id,
      booking_date,
      booking_time,
      status: "pending"
    });

    // send confirmation email (best-effort)
    const customer = await User.findByPk(req.user.id);
    const provider = await Provider.findByPk(provider_id);
    const service = await Service.findByPk(service_id);

    try {
      await sendMail({
        to: customer.email,
        subject: `Booking Confirmation - ${provider.business_name}`,
        html: `<p>Hello ${customer.name},</p>
               <p>Your booking for <strong>${service.name}</strong> at <strong>${provider.business_name}</strong> on <strong>${booking_date} ${booking_time}</strong> has been created.</p>`
      });
    } catch (mailErr) {
      console.warn("Mail send failed:", mailErr.message);
    }

    res.status(201).json({ message: "Booking created", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { customer_id: req.user.id },
      include: [{ model: Provider, as: "provider" }, { model: Service, as: "service" }]
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [{ model: User, as: "customer", attributes: ["id", "name", "email"] }, { model: Provider, as: "provider" }, { model: Service, as: "service" }]
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const booking = await Booking.findByPk(id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    const { status } = req.body;
    if (!["pending", "confirmed", "cancelled"].includes(status)) return res.status(400).json({ error: "Invalid status" });

    booking.status = status;
    await booking.save();

    // notify customer via email if confirmed/cancelled
    try {
      const customer = await User.findByPk(booking.customer_id);
      const provider = await Provider.findByPk(booking.provider_id);
      await sendMail({
        to: customer.email,
        subject: `Booking ${status} - ${provider.business_name}`,
        html: `<p>Your booking on <strong>${booking.booking_date} ${booking.booking_time}</strong> has been <strong>${status}</strong>.</p>`
      });
    } catch (notifyErr) {
      console.warn("Notify mail failed:", notifyErr.message);
    }

    res.json({ message: "Booking updated", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const booking = await Booking.findByPk(id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    await booking.destroy();
    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
