import { useState } from "react";
import api from "./apiInstance"; // Use your axios instance

const useGetUser = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const makeApiReq = async (token) => {
    try {
      const response = await api.get("/getuser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error.message);
      return { error: true, message: error.message };
    }
  };

  const getUser = async (token) => {
    const response = await makeApiReq(token);
    if (response && !response.error) {
      setData(response.data);
      setLoading(false);
    } else if (response && response.error === true && response.message === "invalid token") {
      setError(response.message);
      setLoading(false);
    } else if (response && response.error) {
      setError(response.message);
      setLoading(false);
    }
  };

  return { data, loading, setLoading, getUser, error, setError };
};

export default useGetUser;