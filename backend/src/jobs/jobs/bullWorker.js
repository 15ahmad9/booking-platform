// src/jobs/bullWorker.js
import { reminderQueue } from "./queue.js";
import { Booking, User, Provider, Service } from "../models/index.js";
import { sendMail } from "../config/mailer.js";

reminderQueue.process(async (job) => {
  const { bookingId } = job.data;
  const booking = await Booking.findByPk(bookingId, {
    include: [
      { model: User, as: "customer", attributes: ["id", "name", "email"] },
      { model: Provider, as: "provider", attributes: ["id", "business_name"] },
      { model: Service, as: "service", attributes: ["id", "name"] }
    ]
  });
  if (!booking) throw new Error("Booking not found");

  // send mail
  await sendMail({
    to: booking.customer.email,
    subject: `Reminder: Booking at ${booking.provider.business_name}`,
    html: `<p>Reminder for booking ${booking.booking_date} ${booking.booking_time}</p>`
  });
});
