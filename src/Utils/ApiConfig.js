import axios from "axios";

const API_BASE_URL = "http://localhost:5500/api/data";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Handle image requests
    if (config.url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      config.responseType = "blob";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Handle image responses
    if (response.config.url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      return { ...response, data: URL.createObjectURL(blob) };
    }
    return response;
  },
  (error) => {
    if (error.response) {
      // Handle specific error status codes
      switch (error.response.status) {
        case 401:
          // Handle unauthorized access
          localStorage.removeItem("token");
          window.location.href = "/signin";
          break;
        case 403:
          // Handle forbidden access
          console.error("Access forbidden");
          break;
        case 404:
          // Handle not found
          console.error("Resource not found");
          break;
        default:
          console.error("API Error:", error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
