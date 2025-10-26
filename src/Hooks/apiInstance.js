import axios from "axios";

// Always use the Vercel URL since we want to use the deployed backend
const API_BASE_URL = "https://vault-vogue-expressjs.vercel.app/api/data";
// const API_BASE_URL = "http://localhost:6500/api/data"b; // Local development URL

const API_TIMEOUT = 10000;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // NOTE: The 'Access-Control-Allow-Origin' header is for the SERVER RESPONSE,
    // not the client request. Setting it here is unnecessary and can conflict
    // with 'withCredentials: true', so it has been removed.
  },
  withCredentials: true,
});

// Request interceptor for token and image handling
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Handle image requests
    if (
      typeof config.url === "string" &&
      config.url.match(/\.(jpg|jpeg|png|gif|webp)$/i)
    ) {
      config.responseType = "blob";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for images and errors
api.interceptors.response.use(
  (response) => {
    if (
      typeof response.config.url === "string" &&
      response.config.url.match(/\.(jpg|jpeg|png|gif|webp)$/i)
    ) {
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const imageUrl = URL.createObjectURL(blob);
      return {
        ...response,
        data: {
          url: imageUrl,
          cleanup: () => URL.revokeObjectURL(imageUrl),
          contentType: response.headers["content-type"],
        },
      };
    }
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem("token");
          window.dispatchEvent(
            new CustomEvent("auth-unauthorized", {
              detail: { message: "Session expired. Please sign in again." },
            })
          );
          break;
        case 403:
          window.dispatchEvent(
            new CustomEvent("show-error-notification", {
              detail: {
                title: "Access Denied",
                message: "You don't have permission to perform this action",
                autoDismiss: true,
              },
            })
          );
          break;
        case 404:
          window.dispatchEvent(
            new CustomEvent("show-error-notification", {
              detail: {
                title: "Not Found",
                message: "The requested resource could not be found",
                autoDismiss: true,
              },
            })
          );
          break;
        case 500:
          window.dispatchEvent(
            new CustomEvent("show-error-notification", {
              detail: {
                title: "Server Error",
                message:
                  "Something went wrong on our end. Please try again later.",
                autoDismiss: true,
              },
            })
          );
          break;
        default:
          window.dispatchEvent(
            new CustomEvent("show-error-notification", {
              detail: {
                title: "API Error",
                message:
                  error.response.data?.message ||
                  "An unexpected error occurred",
                autoDismiss: true,
              },
            })
          );
      }
    } else if (error.request) {
      window.dispatchEvent(
        new CustomEvent("show-error-notification", {
          detail: {
            title: "Network Error",
            message: "Please check your connection and try again",
            autoDismiss: true,
          },
        })
      );
    } else {
      window.dispatchEvent(
        new CustomEvent("show-error-notification", {
          detail: {
            title: "Error",
            message: "An unexpected error occurred. Please refresh the page.",
            autoDismiss: false,
          },
        })
      );
    }
    return Promise.reject(error);
  }
);

export default api;
