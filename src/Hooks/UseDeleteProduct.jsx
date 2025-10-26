import React from "react";
import api from "./apiInstance"; // Use your axios instance

const useDeleteProduct = () => {
  const [deleteError, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [deletedProduct, setProduct] = React.useState([]);

  const makeApiRequest = async (id, token) => {
    try {
      const response = await api.delete(
        `/cart/deletecartproduct/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      }
      setError("Failed to delete product");
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const deleteProduct = async (_id, token) => {
    setLoading(true);
    try {
      const response = await makeApiRequest(_id, token);
      if (response && response.error === false) {
        setProduct(response.data);
        setSuccess(true);
        setError(null);
      } else if (response) {
        setError(response.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { deleteProduct, deletedProduct, deleteError, loading, success };
};

export default useDeleteProduct;