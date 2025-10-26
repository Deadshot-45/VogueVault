import axios from "axios";

const useVerifyOtp = (setIsLoading, setError, setSuccess, setUser) => {
  const verifyOtp = async (otp, username, setIsLoggedIn) => {
    setIsLoading(false);
    try {
      if (!username) {
        throw new Error("No username found. Please try logging in again.");
      }

      const response = await axios.post(
        "https://vault-vogue-expressjs.vercel.app/api/data/verifyotp",
        { username, otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.error === false) {
        setSuccess(response.data.message);
        setIsLoading(false);
        setIsLoggedIn(response.data.token);
        setUser(response.data.data);
        localStorage.setItem("token", response.data.token);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { verifyOtp };
};

export default useVerifyOtp;
