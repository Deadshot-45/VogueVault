import { useState } from "react";
import api from "./apiInstance"; // <-- Use your axios instance

const useUpdateFavorite = () => {
  const [favoriteState, setFavoriteState] = useState({
    error: null,
    success: false,
    loading: false,
    itemAdded: [],
  });

  const makeApiRequest = async (product, token) => {
    if (!token) {
      throw new Error("Authentication token is required");
    }
    if (!product || !product._id) {
      throw new Error("Invalid product data");
    }

    try {
      const response = await api.put(
        "/cart/updatefavorate",
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateFavorite = async (token, product) => {
    setFavoriteState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await makeApiRequest(product, token);

      if (response?.error === false) {
        const favoriteData = Array.isArray(response.data)
          ? response.data
          : [response.data];

        setFavoriteState((prev) => ({
          ...prev,
          itemAdded: favoriteData,
          success: true,
          loading: false,
        }));
      } else {
        throw new Error(response?.message || "Failed to update favorites");
      }
    } catch (error) {
      setFavoriteState((prev) => ({
        ...prev,
        error: error.message,
        success: false,
        loading: false,
      }));
    }
  };

  const resetState = () => {
    setFavoriteState({
      error: null,
      success: false,
      loading: false,
      itemAdded: [],
    });
  };

  return {
    updateFavorite,
    favoriteState,
    resetState,
  };
};

export default useUpdateFavorite;