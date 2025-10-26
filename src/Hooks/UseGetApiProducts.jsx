import { useState, useEffect } from "react";
import api from "./apiInstance"; // Use your axios instance

const useGetApiProducts = (page = 1, limit = 12) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchSection = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // if (page === 1) {
        //   const cachedData = localStorage.getItem("cachedProducts");
        //   if (cachedData) {
        //     setData(JSON.parse(cachedData));
        //     setIsLoading(false);
        //     return;
        //   }
        // }
console.log("Apo");
        const response = await api.get("/products/getproducts", {
          // params: { page, limit },
          withCredentials: true,
        });
        console.log(response);
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

        // if (apiData.error === false) {
        //   if (page === 1) {
        //     setData(apiData.products);
        //     localStorage.setItem(
        //       "cachedProducts",
        //       JSON.stringify(apiData.products)
        //     );
        //   } else {
        //     setData((prevData) => [...prevData, ...apiData.products]);
        //   }
        //   if (apiData.total) {
        //     setTotalPages(Math.ceil(apiData.total / limit));
        //   }
        // } else {
        //   setError(apiData.message || "Failed to fetch products");
        // }
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

  return { data, isLoading, error /* totalPages */ };
};

export { useGetApiProducts };
