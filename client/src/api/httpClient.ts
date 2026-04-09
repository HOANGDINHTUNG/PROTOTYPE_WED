import axios from "axios";

export const httpClient = axios.create({
  // Sử dụng /api prefix để khớp với routes.json trên server
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://prototype-wed.onrender.com/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => Promise.reject(error),
);
