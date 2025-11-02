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
            // Transform cached products too, in case URLs need updating
            const cachedProducts = JSON.parse(cachedData);
            const transformedCached = transformProductsImages(cachedProducts);
            setData(transformedCached);
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
          console.log(
            "apiData.products",
            apiData.products,
            Array.isArray(apiData.products),
            apiData.products?.length
          );

          // Check if products exist and is an array
          if (!apiData.products || !Array.isArray(apiData.products)) {
            console.error("Products is not an array:", apiData.products);
            setError("Invalid products data received");
            return;
          }

          // Transform image URLs to use proxy
          const transformedProducts = transformProductsImages(apiData.products);
          console.log(
            "transformedProducts",
            transformedProducts,
            transformedProducts?.length
          );

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
            // Transform cached products before using them
            const cachedProducts = JSON.parse(cachedData);
            const transformedCached = transformProductsImages(cachedProducts);
            setData(transformedCached);
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
