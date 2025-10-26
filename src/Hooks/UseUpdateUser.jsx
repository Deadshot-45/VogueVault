import { useState } from "react";
import api from "./apiInstance"; // Use your axios instance

const useUpdateUser = () => {
  const [data, setData] = useState(null);

  const makeApiReq = async (token, data) => {
    try {
      const response = await api.put(
        "/updateuser",
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
    if (response && !response.error) {
      setData(response.data);
    }
  };

  return { data, setData, updateUser };
};

export default useUpdateUser;