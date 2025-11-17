import axios from "axios";


  const baseURL = "https://medicore-backend.vercel.app/api/v1/user";

  const clientUser = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  })


  clientUser.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  });

export default clientUser;
