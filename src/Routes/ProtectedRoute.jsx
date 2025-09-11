import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  // const location = useLocation();
  const { admin, isLoading: isAuthLoading } = useContext(AuthContext);
  if (isAuthLoading) {
    return <div>Loading...</div>;
  }
  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
