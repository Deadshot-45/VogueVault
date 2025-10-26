import axios from "axios";


const useResendOtp = (setIsLoading, setError, setSuccess) => {
  const resendOtp = async (username) => {
    setIsLoading(true);
    try {
      if (!username) {
        throw new Error("No username found. Please try logging in again.");
      }

      const response = await axios.post(
        "https://vault-vogue-expressjs.vercel.app/api/data/resendotp",
        { username },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.error === false) {
        setSuccess("New OTP sent successfully!");
        setIsLoading(false);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { resendOtp };
};

export default useResendOtp;
