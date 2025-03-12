import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [admin, setAdmin] = useState(() => {
    const savedAdmin = localStorage.getItem("admin");
    return savedAdmin ? JSON.parse(savedAdmin) : null;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
  const storedValue = localStorage.getItem("isLoggedIn");
  return storedValue === "true";
});

useEffect(() => {
  localStorage.setItem("isLoggedIn", isLoggedIn.toString());
}, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        admin,
        setAdmin,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
