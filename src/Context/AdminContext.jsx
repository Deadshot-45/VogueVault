import { createContext, useContext } from "react";
import { useAdminState } from "../hooks/useAdminState";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const adminState = useAdminState();

  return (
    <AdminContext.Provider value={adminState}>{children}</AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
