import axios from "axios";
import { useState } from "react";

const useUpdateFav = () => {
  const [newFav, setFav] = useState(null);

  const makeApiReq = async (token, data) => {
    try {
      const response = await axios.put(
        `https://vault-vogue-expressjs.vercel.app/api/data/cart/updatefavorate`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateFav = async (token, data) => {
    let response = await makeApiReq(token, data);

    if (!response.error) {
      console.log(response);
      setFav(response.data);
    }
  };
  return { updateFav, newFav };
};

export default useUpdateFav;
