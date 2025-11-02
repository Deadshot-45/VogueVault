import { useState, useEffect } from "react";
import api from "./apiInstance"; // Use your axios instance
import { transformProductsImages } from "../Utils/imageUrlHelper";

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
        const response = await api.get(`/products/productquery/${query}`);
        const apiData = response.data;
        if (apiData.error === false) {
          // Transform image URLs to use proxy
          const transformedData = transformProductsImages(apiData.data);
          setData(transformedData);
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