import axios from "axios";

const clientNoti = axios.create({
  baseURL: "https://medicore-backend.vercel.app/api/v1/notifications",
});

export default clientNoti;
