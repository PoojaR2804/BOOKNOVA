import axios from "axios";

const api = axios.create({
  baseURL: "https://booknova-backend-0nne.onrender.com",
});

export default api;
