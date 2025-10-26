import axios from "axios";
import { useState, useEffect } from "react";

// Define the custom hook
const useSearchProducts = (query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSection = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:5500/api/data/products/searchproduct/${query}`
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

export { useSearchProducts };
