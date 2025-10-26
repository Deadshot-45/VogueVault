import axios from "axios";
import { useState } from "react";

const UseSignInApi = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOtp, setIsOtp] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (data) => {
    setLoading(true);
    console.log("object");
    try {
      const response = await axios.post(
        "https://vault-vogue-expressjs.vercel.app/api/data/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.error === false) {
        setEmail(response.data.data);
        setLoading(false);
        setIsOtp(true);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  return { email, loading, isOtp, handleLogin, error };
};

export default UseSignInApi;
