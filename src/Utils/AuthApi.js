import { useApiConfig } from "../Hooks/useApiConfig";

const AuthApi = () => {
  const { apiClient } = useApiConfig();

  const refreshToken = async (token) => {
    try {
      const response = await apiClient.post(
        "/auth/refresh",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Refresh token failed:", error);
      return null;
    }
  };

  return {
    refreshToken,
  };
};

export default AuthApi;
