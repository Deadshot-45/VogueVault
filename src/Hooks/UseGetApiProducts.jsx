import { useState, useEffect } from "react";
import api from "./apiInstance"; // Use your axios instance
import { transformProductsImages } from "../Utils/imageUrlHelper";

const useGetApiProducts = (page = 1, limit = 12) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchSection = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (page === 1) {
          const cachedData = localStorage.getItem("cachedProducts");
          if (cachedData) {
            setData(JSON.parse(cachedData));
            setIsLoading(false);
            return;
          }
        }

        const response = await api.get("/products/getproducts", {
          params: { page, limit },
          withCredentials: true,
        });
        const apiData = response.data;

        if (apiData.error === false) {
          console.log("apidata", apiData);
          // Transform image URLs to use proxy
          const transformedProducts = transformProductsImages(apiData.products);
          
          if (page === 1) {
            setData(transformedProducts);
            localStorage.setItem(
              "cachedProducts",
              JSON.stringify(transformedProducts)
            );
          } else {
            setData((prevData) => [...prevData, ...transformedProducts]);
          }
          if (apiData.total) {
            setTotalPages(Math.ceil(apiData.total / limit));
          }
        } else {
          setError(apiData.message || "Failed to fetch products");
        }
      } catch (error) {
        setError(error.message || "An error occurred while fetching products");
        if (page === 1) {
          const cachedData = localStorage.getItem("cachedProducts");
          if (cachedData) {
            setData(JSON.parse(cachedData));
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSection();
  }, [page, limit]);

  return { data, isLoading, error, totalPages };
};

export { useGetApiProducts };
