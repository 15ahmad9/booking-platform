// src/controllers/contact.controller.js
import { ContactMessage, User } from "../models/index.js";
import { sendMail } from "../config/mailer.js";

export const createMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ error: "Missing fields" });

    const payload = { name, email, subject, message };
    if (req.user) payload.user_id = req.user.id;

    const contact = await ContactMessage.create(payload);

    // optionally notify admin email
    try {
      await sendMail({
        to: process.env.MAIL_USER,
        subject: `New Contact Message: ${subject || "No subject"}`,
        html: `<p><strong>${name}</strong> (${email}) wrote:</p><p>${message}</p>`
      });
    } catch (e) {
      console.warn("Admin notify failed:", e.message);
    }

    res.status(201).json({ message: "Message received", contact });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.findAll({ include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }] });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const message = await ContactMessage.findByPk(id);
    if (!message) return res.status(404).json({ error: "Message not found" });
    await message.destroy();
    res.json({ message: "Message deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
