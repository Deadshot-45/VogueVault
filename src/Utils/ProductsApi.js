import { useApiConfig } from "../Hooks/useApiConfig";

// Create a service to handle product API calls
const ProductsApi = () => {
  const { apiClient } = useApiConfig();
  
  const getProducts = async () => {
    try {
      const response = await apiClient.get("/products/getproducts");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch products:", error);
      return [];
    }
  };
  
  const getProduct = async (id) => {
    try {
      const response = await apiClient.get(`/products/getproduct/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch product ${id}:`, error);
      return null;
    }
  };
  
  const getSearchProducts = async (query) => {
    try {
      const response = await apiClient.get(`/products/searchproduct/${query}`);
      console.log("Search results:", response.data);
      return response.data;
    } catch (error) {
      console.error(`Failed to search products for "${query}":`, error);
      return [];
    }
  };
  
  return {
    getProducts,
    getProduct,
    getSearchProducts
  };
};

export default ProductsApi;
