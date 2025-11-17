import axios from "axios";

const clientUser = axios.create({
  baseURL: "http://localhost:4000/api/v1/user",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

clientUser.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default clientUser;
