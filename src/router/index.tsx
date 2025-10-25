import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardLayout from "../components/layouts/DashboardLayout";

// Page imports
import DashboardPage from "../pages/root/dashboard";
import ModelsPage from "../pages/root/models";
import GalleryPage from "../pages/root/gallery";
import ImageUploadPage from "../pages/root/models/upload-image";
import UploadImageResultPage from "../pages/root/models/upload-image/results";

// Auth pages
import LoginPage from "../pages/auth/login";
import SignupPage from "../pages/auth/signup";
import ForgotPasswordPage from "../pages/auth/forgot-password";
import ResetPasswordPage from "../pages/auth/reset-password";

// Error page
import ErrorPage from "../pages/errors";
import { AuthLayout } from "../components";
import ProtectedRoute from "./ProtectedRoute";
import ResendEmailPage from "../pages/auth/resend-email";
import ConfirmEmailPage from "../pages/auth/confirm-email";
const router = createBrowserRouter([
  // Auth routes
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "reset-password", element: <ResetPasswordPage /> },
      { path: "resend-email", element: <ResendEmailPage /> },
      { path: "confirm-email", element: <ConfirmEmailPage /> }
    ],
  },

  // Protected (app) routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: "dashboard", element: <DashboardPage /> },
          { path: "models", element: <ModelsPage /> },
          { path: "gallery", element: <GalleryPage /> },
          { path: "models/upload-image", element: <ImageUploadPage /> },
          {
            path: "models/upload-image/results",
            element: <UploadImageResultPage />,
          },
          { path: "dashboard/upgrade", element: <DashboardPage /> },
        ],
      },
    ],
  },

  // Error route
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
