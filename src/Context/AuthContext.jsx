import PropTypes from "prop-types";
import { createContext, useEffect, useState, useCallback } from "react";
import useApiConfig from "../Hooks/useApiConfig";

const TOKEN_REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes
const TOKEN_EXPIRY_BUFFER = 1 * 60 * 1000; // 1 minute

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null;
    }
  });

  const [admin, setAdmin] = useState(() => {
    try {
      const savedAdmin = localStorage.getItem("admin");
      return savedAdmin ? JSON.parse(savedAdmin) : null;
    } catch (error) {
      console.error("Error parsing admin from localStorage:", error);
      return null;
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      const storedValue = localStorage.getItem("token");
      return storedValue || "";
    } catch (error) {
      console.error("Error reading token from localStorage:", error);
      return "";
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { apiClient } = useApiConfig();

  const checkTokenExpiration = useCallback((token) => {
    try {
      // Simple token expiration check without using jsonwebtoken
      const tokenParts = token.split(".");
      if (tokenParts.length !== 3) return false;

      const payload = JSON.parse(atob(tokenParts[1]));
      if (!payload || !payload.exp) return false;

      return payload.exp * 1000 > Date.now() + TOKEN_EXPIRY_BUFFER;
    } catch (error) {
      console.error("Error checking token expiration:", error);
      return false;
    }
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const response = await apiClient.post(
        "/auth/refresh",
        {},
        {
          headers: {
            Authorization: `Bearer ${isLoggedIn}`,
          },
        }
      );

      if (response.data.error === false && response.data.token) {
        setIsLoggedIn(response.data.token);
        localStorage.setItem("token", response.data.token);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return false;
    }
  }, [isLoggedIn]);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("admin");
      setIsLoggedIn("");
      setUser(null);
      setAdmin(null);
      setError(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }, []);

  // Token refresh mechanism
  useEffect(() => {
    if (!isLoggedIn) return;

    const checkAndRefreshToken = async () => {
      if (!checkTokenExpiration(isLoggedIn)) {
        const refreshed = await refreshToken();
        if (!refreshed) {
          logout();
        }
      }
    };

    const interval = setInterval(checkAndRefreshToken, TOKEN_REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [isLoggedIn, checkTokenExpiration, refreshToken, logout]);

  // Handle token persistence
  useEffect(() => {
    try {
      if (isLoggedIn) {
        localStorage.setItem("token", isLoggedIn);
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Error persisting token:", error);
    }
  }, [isLoggedIn]);

  // Handle user persistence
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Error persisting user:", error);
    }
  }, [user]);

  // Handle admin persistence
  useEffect(() => {
    try {
      if (admin) {
        localStorage.setItem("admin", JSON.stringify(admin));
      } else {
        localStorage.removeItem("admin");
      }
    } catch (error) {
      console.error("Error persisting admin:", error);
    }
  }, [admin]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        admin,
        setAdmin,
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        setIsLoading,
        error,
        setError,
        logout,
        checkTokenExpiration,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
