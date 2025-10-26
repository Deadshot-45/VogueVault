import { useState } from "react";
import api from "./apiInstance"; // Use your axios instance

const useUpdateCart = () => {
  const [cartData, setCartData] = useState([]);
  const [updateError, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCartUpdate = async (data, token) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.put(
        "/cart/updatecart",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setCartData(response.data.data || []);
      return response.data;
    } catch (error) {
      setError(
        error.response?.data?.message || error.message || "Failed to update cart"
      );
      return error;
    } finally {
      setLoading(false);
    }
  };

  return {
    cartData,
    updateError,
    loading,
    handleCartUpdate,
  };
};

export default useUpdateCart;