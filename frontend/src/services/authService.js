// src/services/authService.js
import API from "./axiosInstance";

const register = async (payload) => {
  const res = await API.post("/auth/register", payload);
  return res.data;
};

const login = async (payload) => {
  const res = await API.post("/auth/login", payload);
  return res.data;
};

const me = async () => {
  const res = await API.get("/users/me").catch(() => null);
  return res?.data || null;
};

export default { register, login, me };
