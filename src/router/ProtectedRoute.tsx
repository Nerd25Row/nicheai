// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth/authStore";
const ProtectedRoute = () => {
  const session = useAuthStore((s) => s.session);

  if (session === undefined) return null; // still loading
  if (!session) return <Navigate to="/auth/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
