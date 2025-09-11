import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * Enhanced PrivateRoute component with loading state, role-based access,
 * and improved redirection
 */
const PrivateRoute = ({
  children,
  requiredRoles = [],
  redirectPath = "/signin",
  fallbackComponent = null,
}) => {
  const { isLoggedIn, user, isLoading } = useContext(AuthContext);
  const location = useLocation();

  // Handle loading state
  if (isLoading) {
    return fallbackComponent || <div>Loading authentication status...</div>;
  }
  // console.log("Private Route", isLoggedIn);
  // Check if user is logged in
  if (!isLoggedIn) {
    // Save the attempted location for redirect after login
    // console.log(
    //   "PrivateRoute: User not logged in, redirecting to",
    //   redirectPath
    // );
    // Using return statement to immediately exit and prevent rendering children
    return (
      <Navigate to={redirectPath} state={{ from: location.pathname }} replace />
    );
  }

  // If roles are specified, check if user has required role
  if (requiredRoles.length > 0) {
    const userRoles = user?.roles || [];
    const hasRequiredRole = requiredRoles.some((role) =>
      userRoles.includes(role)
    );

    if (!hasRequiredRole) {
      console.warn(
        `Access denied: User lacks required role(s): ${requiredRoles.join(
          ", "
        )}`
      );
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // User is authenticated and authorized
  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRoles: PropTypes.arrayOf(PropTypes.string),
  redirectPath: PropTypes.string,
  fallbackComponent: PropTypes.node,
};

export default PrivateRoute;
