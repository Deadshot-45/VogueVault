import api from "./apiInstance"; // Use your axios instance

const useVerifyOtp = (setIsLoading, setError, setSuccess, setUser) => {
  const handleVerifyOtp = async (otp, username, setIsLoggedIn) => {
    setIsLoading(true);
    try {
      if (!username) {
        throw new Error("No username found. Please try logging in again.");
      }
      const response = await api.post(
        "/verifyotp",
        { username, otp }
      );
      if (response.data.error === false) {
        handleSuccessResponse(response.data, setIsLoggedIn, setUser);
      } else {
        handleError(response.data.message);
      }
    } catch (error) {
      handleError(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessResponse = (responseData, setIsLoggedIn, setUser) => {
    setSuccess(responseData.message);
    setIsLoggedIn(responseData.token);
    setUser(responseData.data);
    const { _id, name } = responseData.data;
    localStorage.setItem("user", JSON.stringify({ _id, name }));
    localStorage.setItem("token", responseData.token);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  return { handleVerifyOtp };
};

export default useVerifyOtp;