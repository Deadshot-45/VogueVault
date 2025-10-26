import axios from "axios";
import { useState } from "react";

const UseGetFavorate = () => {
  const [favorateData, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const makeApiRequest = async (favorates, token) => {
    try {
      // console.log("Api Call Token", token);
      const response = await axios.post(
        `https://vault-vogue-expressjs.vercel.app/api/data/cart/favorates`,
        favorates,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("API error adding to cart:", error);
      throw error;
    }
  };

  const getFavorates = async (favorates, token) => {
    setLoading(true);
    try {
      const response = await makeApiRequest(favorates, token);

      if (response && response.error === false) {
        // Ensure response.data is always processed as an array
        let cartData = Array.from(response.data);
        setProduct(cartData);
        setSuccess(true);
        setError(null);
      } else {
        const errorMsg = response?.message || "Unknown error while api call";
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
  return { getFavorates, favorateData, error, success, loading };
};

export default UseGetFavorate;
