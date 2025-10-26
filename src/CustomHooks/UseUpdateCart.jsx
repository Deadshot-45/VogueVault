import axios from "axios";
import { useState } from "react";

const useUpdateCart = () => {
  const [cartData, setCartData] = useState([]);
  const [updateError, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const makeApiRequest = async (data, token) => {
    
      const response = await axios.post(
        `http://localhost:5500/api/data/cart/updatecart`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
  };

  const handleCartUpdate = async (data, token) => {
    setLoading(true);
    try {
      const apiData = await makeApiRequest(data, token);
      if (apiData.error === false) {
        setCartData(apiData.data);
        setError(null);
      } else {
        setError(apiData.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { cartData, updateError, loading, handleCartUpdate };
};

export default useUpdateCart;