import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    // redirect to login, but remember the current page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
