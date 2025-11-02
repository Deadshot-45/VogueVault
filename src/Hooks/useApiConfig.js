import { useEffect, useMemo } from "react";
import axios from "axios";

const useApiConfig = () => {
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "https://vault-vogue-expressjs.vercel.app/";
  const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000;
  const ENABLE_MOCK_API = import.meta.env.VITE_ENABLE_MOCK_API === "true";

  // Create axios instance with default config
  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });

    // Request interceptor for adding tokens and handling image requests
    instance.interceptors.request.use(
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

    // Response interceptor for handling responses and errors
    instance.interceptors.response.use(
      (response) => {
        // Handle image responses
        if (response.config.url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
          const blob = new Blob([response.data], {
            type: response.headers["content-type"],
          });

          // Create object URL with cleanup handler
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
          // Handle specific error status codes
          switch (error.response.status) {
            case 401:
              // Handle unauthorized access
              localStorage.removeItem("token");
              // Dispatch event for React components to handle
              window.dispatchEvent(
                new CustomEvent("auth-unauthorized", {
                  detail: { message: "Session expired. Please sign in again." },
                })
              );
              break;
            case 403:
              // Handle forbidden access
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
          // Network error
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
          // Other errors
          window.dispatchEvent(
            new CustomEvent("show-error-notification", {
              detail: {
                title: "Error",
                message:
                  "An unexpected error occurred. Please refresh the page.",
                autoDismiss: false,
              },
            })
          );
        }

        return Promise.reject(error);
      }
    );

    return instance;
  }, [API_BASE_URL, API_TIMEOUT]);

  // Utility function to create API endpoints with proper cleanup
  const apiClient = useMemo(
    () => ({
      get: (url) => api.get(url),
      post: (url, data, config) => api.post(url, data, config),
      put: (url, data, config) => api.put(url, data, config),
      delete: (url, config) => api.delete(url, config),
      patch: (url, data, config) => api.patch(url, data, config),

      // Add a utility for multi-part form data
      multipart: {
        post: (url, data, onUploadProgress) =>
          api.post(url, data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
          }),
      },
    }),
    [api]
  );

  // Cleanup all object URLs when the component unmounts or dependencies change
  useEffect(() => {
    return () => {
      // Clean up any remaining object URLs
      window.removeEventListener("unload", () => {});
    };
  }, []);

  return { apiClient, API_BASE_URL, ENABLE_MOCK_API };
};

export default useApiConfig;
