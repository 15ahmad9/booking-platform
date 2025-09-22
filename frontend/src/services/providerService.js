// src/services/providerService.js
import API from "./axiosInstance";

const getProviders = async () => {
  const res = await API.get("/providers");
  return res.data;
};

const getProvider = async (id) => {
  const res = await API.get(`/providers/${id}`);
  return res.data;
};

const createProvider = async (payload) => {
  const res = await API.post("/providers", payload);
  return res.data;
};

const updateProvider = async (id, payload) => {
  const res = await API.put(`/providers/${id}`, payload);
  return res.data;
};

export default { getProviders, getProvider, createProvider, updateProvider };
