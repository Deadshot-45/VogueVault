import { useState } from "react";
import api from "./apiInstance"; // Use your axios instance

const UseSignInApi = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOtp, setIsOtp] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      const response = await api.post("/login", data);
      if (response.data.error === false) {
        setEmail(response.data.data);
        setIsOtp(true);
        setError("");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { email, loading, isOtp, handleLogin, error, setIsOtp };
};

export default UseSignInApi;