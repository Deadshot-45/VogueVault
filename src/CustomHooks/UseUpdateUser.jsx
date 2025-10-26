import axios from "axios";
import { useState } from "react";

const useUpdateUser = () => {
  const [data, setData] = useState(null);

  const makeApiReq = async (token, data) => {
    try {
      const response = await axios.put(
        `https://vault-vogue-expressjs.vercel.app/api/data/updateuser`,
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
  const updateUser = async (token, updatedData) => {
    const response = await makeApiReq(token, updatedData);
    if (!response.error) {
      setData(response.data);
    }
  };

  return { data, setData, updateUser };
};

export default useUpdateUser;
