import { useState } from "react";
import api from "./apiInstance"; // Use your axios instance
import { transformProductImages } from "../Utils/imageUrlHelper";

const useGetSingleProduct = () => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const makeApiCall = async (id) => {
    setIsLoading(true);
    try {
      const response = await api.get(`/products/getproduct/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      setError(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const getSingleProduct = async (id) => {
    const response = await makeApiCall(id);
    if (response && response.error === false) {
      // Transform image URLs to use proxy
      const transformedProduct = transformProductImages(response.product);
      setProduct(transformedProduct);
      console.log(transformedProduct);
    } else if (response) {
      setError(response.message);
    }
  };

  return { getSingleProduct, product, error, isLoading };
};

export default useGetSingleProduct;
