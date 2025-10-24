// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth/authStore";

const ProtectedRoute = () => {
  const { session, status } = useAuthStore();
  
  // Show loading state while auth is being initialized
  if (status === "loading" || status === "idle") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!session || status === "unauthenticated") {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
