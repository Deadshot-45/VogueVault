import { useState } from "react";
import axios from "axios";

const useCartApi = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const cartFetching = async (token) => {
    setIsLoading(true);
    setError(null);
    // console.log("Fetching cart data with token:", token);
    try {
      const response = await axios.get(
        `http://localhost:5500/api/data/cart/getcart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const apiData = response.data;
      if (apiData.error === false) {
        setData(apiData.data);
        // console.log(apiData);
      } else {
        setError(apiData.message || "Failed to fetch products");
      }
    } catch (error) {
      setError(error.message || "An error occurred while fetching products");
    } finally {
      setIsLoading(false);
    }
  };
  return { data, isLoading, error, cartFetching };
};

export { useCartApi };
