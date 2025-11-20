import axios from "axios";

const clientNoti = axios.create({
  baseURL: "https://medicore-backend.vercel.app/api/v1/notifications",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

clientNoti.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default clientNoti;
