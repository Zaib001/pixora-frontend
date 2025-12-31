import axios from "axios";
import { getToken, removeToken } from "../utils/token";

// Create base axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
  timeout: 300000, // 5 minutes for video generation
});

// Request interceptor → attach JWT
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor → global error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Auto logout on unauthorized
      if (error.response.status === 401) {
        removeToken();
        window.location.href = "/login";
      }
    }
    return Promise.reject(
      error.response?.data?.message || "Something went wrong. Please try again."
    );
  }
);

export default api;
