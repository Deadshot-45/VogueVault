import React from "react";
import api from "./apiInstance"; // Use your axios instance

const useAddToCart = () => {
  const [cartState, setCartState] = React.useState({
    error: null,
    success: false,
    loading: false,
    itemAdded: [],
  });

  const makeApiRequest = async (product, token) => {
    try {
      const response = await api.put(
        "/cart/addtocart",
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      setCartState((prevState) => ({
        ...prevState,
        error: error.message,
        loading: false,
      }));
      throw error;
    }
  };

  const addToCart = async (product, token) => {
    setCartState((prevState) => ({ ...prevState, loading: true }));
    try {
      const response = await makeApiRequest(product, token);
      setCartState((prevState) => ({
        ...prevState,
        itemAdded: response,
        success: true,
        loading: false,
      }));
    } catch (error) {
      console.error("Error adding to cart:", error.message);
    }
  };

  return { addToCart, cartState, setCartState };
};

export default useAddToCart;