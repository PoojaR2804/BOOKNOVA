import axios from "axios";

const api = axios.create({
  baseURL: "https://booknova-backend-0nne.onrender.com/api",
});

export default api;
