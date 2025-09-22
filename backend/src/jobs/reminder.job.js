// src/jobs/reminder.job.js
import cron from "node-cron";
import { Op } from "sequelize";
import { Booking, User, Provider, Service } from "../models/index.js";
import { sendMail } from "../config/mailer.js";

/**
 * Simple cron-based reminder:
 * - Runs every hour
 * - Finds bookings scheduled in exactly 24 hours (or you can adjust)
 * - Sends email reminder to the customer
 *
 * Important: For production use a persistent queue (Bull) to avoid duplicated sends on restart.
 */

const REMINDER_HOURS_BEFORE = Number(process.env.REMINDER_HOURS_BEFORE || 24);

function buildTargetWindow(hoursBefore = 24) {
  // We'll look for bookings where booking_date + booking_time is between now+hoursBefore +/- 59 minutes
  const now = new Date();
  const target = new Date(now.getTime() + hoursBefore * 60 * 60 * 1000);
  // floor to minute
  const start = new Date(target.getTime() - 30 * 60 * 1000); // 30 minutes before
  const end = new Date(target.getTime() + 30 * 60 * 1000); // 30 minutes after
  return { start, end };
}

cron.schedule("0 * * * *", async () => {
  // runs at minute 0 every hour
  try {
    const { start, end } = buildTargetWindow(REMINDER_HOURS_BEFORE);

    // We stored booking_date (DATEONLY) and booking_time (TIME). Compose a DATETIME to compare:
    // Use raw query or compare fields separately.
    // For portability, we'll select by booking_date between start and end (date part) and booking_time between times
    const startDate = start.toISOString().split("T")[0];
    const endDate = end.toISOString().split("T")[0];

    const bookings = await Booking.findAll({
      where: {
        booking_date: { [Op.between]: [startDate, endDate] },
        status: { [Op.ne]: "cancelled" }
      },
      include: [
        { model: User, as: "customer", attributes: ["id", "name", "email"] },
        { model: Provider, as: "provider", attributes: ["id", "business_name"] },
        { model: Service, as: "service", attributes: ["id", "name"] }
      ]
    });

    for (const b of bookings) {
      // Compose booking datetime and compute diff
      const dtString = `${b.booking_date}T${b.booking_time}`;
      const bookingDateTime = new Date(dtString);
      const diffHours = (bookingDateTime - new Date()) / (1000 * 60 * 60);
      // send when within ±REMINDER window tolerance
      if (Math.abs(diffHours - REMINDER_HOURS_BEFORE) <= 1) {
        try {
          await sendMail({
            to: b.customer.email,
            subject: `Reminder: Your booking at ${b.provider.business_name}`,
            html: `<p>Hello ${b.customer.name},</p>
                   <p>This is a reminder for your booking:</p>
                   <ul>
                     <li>Provider: <strong>${b.provider.business_name}</strong></li>
                     <li>Service: <strong>${b.service.name}</strong></li>
                     <li>Date & Time: <strong>${b.booking_date} ${b.booking_time}</strong></li>
                   </ul>
                   <p>See you soon!</p>`
          });
          console.log(`Reminder email sent to ${b.customer.email} for booking ${b.id}`);
        } catch (err) {
          console.warn("Failed to send reminder for booking", b.id, err.message);
        }
      }
    }
  } catch (err) {
    console.error("Reminder job error:", err);
  }
});
