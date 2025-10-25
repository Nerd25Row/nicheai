import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import BackToPage from "../../../components/layouts/BackToHomePage";
import { checkEmailConfirmationStatus } from "../../../services/auth/authService";

type Status = "loading" | "success" | "error" | "idle";

const ConfirmEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        // Check for error parameters first
        const error = searchParams.get("error");
        const error_description = searchParams.get("error_description");

        if (error) {
          setStatus("error");
          setMessage(error_description || "Email confirmation failed");
          setTimeout(() => {
            navigate("/auth/resend-email");
          }, 3000);
          return;
        }

        // Wait a moment for Supabase to process the confirmation
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Check if the email confirmation was successful
        const { isConfirmed, user } = await checkEmailConfirmationStatus();
        
        if (isConfirmed && user) {
          setStatus("success");
          setMessage("Email confirmed successfully! Redirecting to login...");
          
          // Redirect to login page after 2 seconds
          setTimeout(() => {
            navigate("/auth/login");
          }, 2000);
        } else {
          setStatus("error");
          setMessage("Email confirmation failed or link expired");
          setTimeout(() => {
            navigate("/auth/resend-email");
          }, 3000);
        }

      } catch (error: any) {
        console.error("Email confirmation error:", error);
        setStatus("error");
        setMessage(error?.message || "Failed to confirm email");
        
        // Redirect to resend page after 3 seconds
        setTimeout(() => {
          navigate("/auth/resend-email");
        }, 3000);
      }
    };

    handleEmailConfirmation();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        {/* Status Message */}
        {status !== "idle" && message && (
          <div
            role="status"
            aria-live="polite"
            className={`rounded-md px-4 py-2 text-sm font-medium transition-opacity duration-200 ${
              status === "success"
                ? "border border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                : status === "error"
                ? "border border-red-500/40 bg-red-500/10 text-red-400"
                : "border border-blue-500/40 bg-blue-500/10 text-blue-300"
            }`}
          >
            {message}
          </div>
        )}

        {/* Main Card */}
        <div className="bg-[#1D2027] md:w-[540px] md:h-[404px] border border-[#393B41] rounded-2xl p-6 sm:p-8 md:p-12 shadow-xl">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {status === "loading" && "Confirming Email..."}
                {status === "success" && "Email Confirmed!"}
                {status === "error" && "Confirmation Failed"}
              </h1>
              <p className="text-sm sm:text-base text-[#B6BCCA]">
                {status === "loading" && "Please wait while we verify your email address."}
                {status === "success" && "Your email has been successfully confirmed. You can now log in to your account."}
                {status === "error" && "There was an issue confirming your email. You can request a new confirmation email."}
              </p>
            </div>

            {/* Loading Spinner */}
            {status === "loading" && (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00FFFF]"></div>
              </div>
            )}

            {/* Success Icon */}
            {status === "success" && (
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}

            {/* Error Icon */}
            {status === "error" && (
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <BackToPage title="Back to login" route="/auth/login" />
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmailPage;
