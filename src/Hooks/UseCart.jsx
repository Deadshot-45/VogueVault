import { useState, useEffect } from "react";
import api from "./apiInstance"; // Use your axios instance

const CART_CACHE_KEY = "cart_cache";

const useCartApi = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  // Load cached cart data on mount
  useEffect(() => {
    const cachedCart = localStorage.getItem(CART_CACHE_KEY);
    if (cachedCart) {
      try {
        setData(JSON.parse(cachedCart));
      } catch (error) {
        console.error("Error parsing cached cart data:", error);
        localStorage.removeItem(CART_CACHE_KEY);
      }
    }
  }, []);

  const cartFetching = async (token) => {
    if (!token) {
      setError("Authentication token is required");
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get("/cart/getcart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const apiData = response.data;
      if (apiData.error === false) {
        setData(apiData.data);
        // Cache the cart data
        localStorage.setItem(CART_CACHE_KEY, JSON.stringify(apiData.data));
      } else {
        setError(apiData.message || "Failed to fetch cart items");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An error occurred while fetching cart items";
      setError(errorMessage);

      // If we have cached data, don't show error
      const cachedCart = localStorage.getItem(CART_CACHE_KEY);
      if (cachedCart) {
        try {
          setData(JSON.parse(cachedCart));
          setSuccess("Cart data loaded from cache");
        } catch (parseError) {
          console.error("Error parsing cached cart data:", parseError);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearCartCache = () => {
    localStorage.removeItem(CART_CACHE_KEY);
    setData([]);
  };

  return {
    data,
    isLoading,
    error,
    success,
    cartFetching,
    clearCartCache,
    updateCartData: (newData) => {
      setData(newData);
      localStorage.setItem(CART_CACHE_KEY, JSON.stringify(newData));
    },
  };
};

export { useCartApi };