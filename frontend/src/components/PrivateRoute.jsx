import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks";

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return auth.loggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
