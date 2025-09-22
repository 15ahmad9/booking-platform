// src/jobs/queue.js
import Queue from "bull";
import dotenv from "dotenv";
dotenv.config();

const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";

export const reminderQueue = new Queue("reminderQueue", REDIS_URL);

// helper to add job
export const scheduleReminder = async (bookingId, runAt) => {
  // runAt: JS Date
  await reminderQueue.add({ bookingId }, { delay: runAt.getTime() - Date.now(), attempts: 3, backoff: 60000 });
};
