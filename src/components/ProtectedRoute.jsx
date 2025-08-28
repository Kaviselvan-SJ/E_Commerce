import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, authReady } = useContext(AuthContext);
  const loc = useLocation();
  if (!authReady) return null;
  if (!user) return <Navigate to="/login" state={{ from: loc }} replace />;
  return children;
}
