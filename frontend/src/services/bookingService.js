// src/services/bookingService.js
import API from "./axiosInstance";

const createBooking = async (payload) => {
  // payload: { provider_id, service_id, booking_date, booking_time }
  const res = await API.post("/bookings", payload);
  return res.data;
};

const getMyBookings = async () => {
  const res = await API.get("/bookings/my");
  return res.data;
};

const getAllBookings = async () => {
  const res = await API.get("/bookings");
  return res.data;
};

const updateBookingStatus = async (id, status) => {
  const res = await API.put(`/bookings/${id}`, { status });
  return res.data;
};

export default { createBooking, getMyBookings, getAllBookings, updateBookingStatus };
