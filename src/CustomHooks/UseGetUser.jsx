import axios from "axios";
import { useState } from "react";

const useGetUser = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const makeApiReq = async (token) => {
    try {
      const response = await axios.get(
        `http://localhost:5500/api/data/getuser`,
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

  const getUser = async (token) => {
    const response = await makeApiReq(token);
    if (response && !response.error) {
      setData(response.data);
      setLoading(false);
    }
  };

  return { data,loading, setLoading, getUser };
};

export default useGetUser;
