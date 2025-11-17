import axios from "axios";

const clientNoti = axios.create({
  baseURL: "http://localhost:4000/api/v1/notifications",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

clientNoti.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default clientNoti;
