import axios from "axios";

const url = import.meta.env.VITE_API_URL;
const baseURL = `${url}/user`;

const clientUser = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

clientUser.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default clientUser;
