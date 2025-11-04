import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/signin" replace />;

  // Flexible role match
  if (role && !user.role?.toLowerCase().includes(role.toLowerCase())) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
