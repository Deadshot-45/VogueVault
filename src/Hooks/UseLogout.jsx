import { useState } from "react";
import api from "./apiInstance"; // Use your axios instance

const UseLogout = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const makeApiCall = async (token) => {
    if (!token) {
      setError("No authentication token found");
      return null;
    }

    try {
      const response = await api.post(
        "/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      setError(
        error.response?.data?.message || error.message || "Failed to logout"
      );
      return null;
    }
  };

  const logOut = async (token) => {
    setIsLoading(true);
    setError(null);
    setSuccess("");

    const response = await makeApiCall(token);

    if (response?.error === false) {
      setSuccess(response.message);
    } else if (response?.error === true) {
      setError(response.message);
    }

    setIsLoading(false);
  };

  return {
    success,
    error,
    isLoading,
    logOut,
    resetState: () => {
      setSuccess("");
      setError(null);
    },
  };
};

export default UseLogout;