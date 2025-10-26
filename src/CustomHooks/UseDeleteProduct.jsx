import axios from "axios";
import React from "react";

const useDeleteProduct = () => {
  const [deleteError, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [deletedProduct, setProduct] = React.useState([]);

  const makeApiRequest = async (id, token) => {
    console.log(token);
    const response = await axios.delete(
      `https://vault-vogue-expressjs.vercel.app/api/data/cart/deletecartproduct/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    return setError("Failed to delete product");
  };

  const deleteProduct = async (_id, token) => {
    setLoading(true);
    try {
      const response = await makeApiRequest(_id, token);
      if (response.error === false) {
        setProduct(response.data);
        setSuccess(true);
        setError(null);
      } else {
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
