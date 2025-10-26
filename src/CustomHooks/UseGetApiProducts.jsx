import { useState, useEffect } from "react";
import axios from "axios";

const useGetApiProducts = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSection = async () => {
      try {
        // First try to get cached data
        const cachedData = localStorage.getItem("cachedProducts");
        if (cachedData) {
          setData(JSON.parse(cachedData));
          setIsLoading(false);
        }

        // Then fetch fresh data
        const response = await axios.get(
          `http://localhost:5500/api/data/products/getproducts`
        );
        const apiData = response.data;

        if (apiData.error === false) {
          setData(apiData.products);
          localStorage.setItem(
            "cachedProducts",
            JSON.stringify(apiData.products)
          );
        } else {
          setError(apiData.message || "Failed to fetch products");
        }
      } catch (error) {
        setError(error.message || "An error occurred while fetching products");
        // If we have cached data, don't show error
        const cachedData = localStorage.getItem("cachedProducts");
        if (cachedData) {
          setData(JSON.parse(cachedData));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSection();
  }, []); // Empty dependency array since we only want to fetch once when component mounts

  return { data, isLoading, error };
};

export { useGetApiProducts };
