import axios from "axios";
import { useState, useEffect } from "react";

// Define the custom hook
const useProductQuery = (query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSection = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://vault-vogue-expressjs.vercel.app/api/data/products/productquery/${query}`
        );
        const apiData = response.data;
        if (apiData.error === false) {
          setData(apiData.data);
        } else {
          setError(apiData.message || "Failed to fetch products");
        }
      } catch (error) {
        setError(error.message || "An error occurred while fetching products");
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchSection();
    }
  }, [query]);

  return { data, isLoading, error };
};

export { useProductQuery };
