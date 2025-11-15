import axios from "axios";

  // baseURL: "https://medicore-backend.vercel.app/api/v1/user",

const clientUser = axios.create({
  baseURL: "https://medicore-backend.vercel.app/api/v1/user",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

clientUser.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
 
  console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default clientUser;
