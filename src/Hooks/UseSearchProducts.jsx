import { useState, useEffect, useRef } from "react";
import api from "./apiInstance"; // Use your axios instance

// Define the custom hook
const useSearchProducts = (query, page = 1, limit = 10) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const prevQuery = useRef(query);

  useEffect(() => {
    const fetchSection = async () => {
      if (!query || query.length < 3) {
        setData([]);
        setError(null);
        setHasMore(true);
        return;
      }

      // Reset data if query changes
      if (query !== prevQuery.current) {
        setData([]);
        prevQuery.current = query;
      }

      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get(
          `/products/searchproduct/${query}`,
          {
            params: { page, limit },
          }
        );
        const apiData = response.data;
        if (apiData.error === false) {
          const newData = apiData.data || [];
          setData((prevData) =>
            page === 1 ? newData : [...prevData, ...newData]
          );
          setHasMore(newData.length === limit);
          setError(null);
        } else {
          setError(apiData.message || "Failed to fetch products");
          setData([]);
          setHasMore(false);
        }
      } catch (error) {
        console.error("Search error:", error);
        setError(
          error.response?.data?.message || "An error occurred while searching"
        );
        setData([]);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSection();
  }, [query, page, limit]);

  return { data, isLoading, error, hasMore };
};

export { useSearchProducts };