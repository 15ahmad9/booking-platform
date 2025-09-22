// src/services/contactService.js
import API from "./axiosInstance";

const sendMessage = async (payload) => {
  // payload: { name, email, subject, message }
  const res = await API.post("/contact", payload);
  return res.data;
};

const getMessages = async () => {
  const res = await API.get("/contact");
  return res.data;
};

export default { sendMessage, getMessages };
