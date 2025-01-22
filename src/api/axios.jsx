import axios from "axios";
// 192.168.0.109

// const BASE_URL = "http://localhost:3502";
const BASE_URL = "https://api.lovealto.com";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
