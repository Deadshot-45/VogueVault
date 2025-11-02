import React from "react";
import axios from "axios";

const useAddToCart = () => {
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [itemAdded, setProduct] = React.useState([]);

  const makeApiRequest = async (product, token) => {
    try {
      console.log("Making API request to add to cart:", product);
      const response = await axios.put(
        `http://localhost:5500/api/data/cart/addtocart`,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("API response for add to cart:", response.data);
      return response.data;
    } catch (error) {
      console.error("API error adding to cart:", error);
      throw error;
    }
  };

  const addToCart = async (newProduct, token) => {
    setLoading(true);
    console.log("Adding product to cart via API:", newProduct);
    try {
      const response = await makeApiRequest(newProduct, token);

      if (response && response.error === false) {
        // Ensure response.data is always processed as an array
        let cartData = Array.from(response.data);
        setProduct(cartData);
        setSuccess(true);
        setError(null);
      } else {
        const errorMsg = response?.message || "Unknown error adding to cart";
        setError(errorMsg);
        console.error("API returned error:", errorMsg);
      }
    } catch (error) {
      setError(error.message || "Error adding to cart");
      console.error("Error in addToCart:", error);
    } finally {
      setLoading(false);
    }
  };

  return { addToCart, itemAdded, error, success, loading };
};

export default useAddToCart;
