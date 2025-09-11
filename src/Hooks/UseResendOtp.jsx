import { useState } from "react";
import api from "./apiInstance"; // Use your axios instance

const useResendOtp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resendMssg, setSuccess] = useState(null);

  const resendOtp = async (username) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (!username) {
        throw new Error("No username found. Please try logging in again.");
      }

      const response = await api.post(
        "/resendotp",
        { username },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.error === false) {
        setSuccess("New OTP sent successfully!");
      } else {
        setError(response.data.message || "Failed to send OTP");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "An error occurred while sending OTP"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    resendOtp,
    isLoading,
    error,
    resendMssg,
    resetState: () => {
      setError(null);
      setSuccess(null);
    },
  };
};

export default useResendOtp;