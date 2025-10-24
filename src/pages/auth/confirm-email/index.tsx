import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Alert } from "../../../components/ui/alert";
import { Button } from "../../../components/ui/button";
import BackToPage from "../../../components/layouts/BackToHomePage";
import {
  confirmEmail,
  resendSignupEmail,
} from "../../../services/auth/authService";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Status = "idle" | "loading" | "success" | "error";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

type FormValues = z.infer<typeof formSchema>;

const EmailConfirmationPage = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [showResendForm, setShowResendForm] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  const { handleSubmit } = form;

  useEffect(() => {
    const verifyEmail = async () => {
      setStatus("loading");
      const token = searchParams.get("token");
      const redirectTo = searchParams.get("redirect_to") || "/auth/login";

      if (!token) {
        setStatus("error");
        setMessage("Invalid or missing verification token.");
        return;
      }

      try {
        await confirmEmail(token);
        setStatus("success");
        setMessage("Your email has been successfully verified! Redirecting...");
        setTimeout(() => navigate(redirectTo), 3000);
      } catch (err: any) {
        setStatus("error");
        setMessage(
          err?.message ||
            "Failed to verify email. Please try again or resend the verification email."
        );
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  const onResendSubmit = async ({ email }: FormValues) => {
    try {
      await resendSignupEmail(email);
      setStatus("success");
      setMessage(
        "Verification email resent! Please check your inbox (and spam folder)."
      );
      setShowResendForm(false);
    } catch (err: any) {
      setStatus("error");
      setMessage(
        err?.message || "Failed to resend verification email. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        <div className="rounded-2xl bg-[#1D2027] border border-[#393B41] shadow-xl p-6 sm:p-8 md:p-12">
          <div className="text-center space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Email Verification
            </h1>
            <p className="text-sm sm:text-base text-[#B6BCCA]">
              {status === "loading"
                ? "Processing your email verification..."
                : status === "success"
                ? "Email verified successfully!"
                : "Verifying your email address"}
            </p>

            {/* Status Message */}
            {status !== "idle" && (
              <Alert
                role="status"
                aria-live="polite"
                className={`flex ounded-md px-4 py-2 text-sm font-medium transition-opacity duration-200 ${
                  status === "loading"
                    ? "border border-[#00FFFF]/40 bg-[#00FFFF]/10 text-[#00FFFF]"
                    : status === "success"
                    ? "border border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                    : "border border-red-500/40 bg-red-500/10 text-red-400"
                }`}
              >
                {status === "loading" ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-[#00FFFF]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  message
                )}
              </Alert>
            )}

            {/* Resend Email Form */}
            {status === "error" && showResendForm && (
              <Form {...form}>
                <form
                  onSubmit={handleSubmit(onResendSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#CACFDA] text-sm sm:text-base font-medium">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
                            className="bg-[#2E3137] text-[#B6BCCA] placeholder:text-[#B6BCCA]/70 rounded-xl px-4 py-3 focus-visible:ring-2 focus-visible:ring-[#00FFFF]/50 transition-all"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs mt-1" />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full h-12 rounded-lg bg-[#00FFFF] hover:bg-[#00FFFF]/90 text-black font-bold text-base shadow-[inset_0_-20px_20px_0_#01FF013D] transition-all duration-200"
                  >
                    Resend Verification Email
                  </Button>
                </form>
              </Form>
            )}

            {/* Action Buttons */}
            {status === "error" && !showResendForm && (
              <Button
                onClick={() => setShowResendForm(true)}
                className="w-full h-12 rounded-lg bg-[#2E3137] hover:bg-[#2E3137]/80 text-white font-medium transition-all duration-200"
              >
                Resend Verification Email
              </Button>
            )}
            {status === "success" && (
              <Button
                onClick={() =>
                  navigate(searchParams.get("redirect_to") || "/auth/login")
                }
                className="w-full h-12 rounded-lg bg-[#00FFFF] hover:bg-[#00FFFF]/90 text-black font-bold text-base shadow-[inset_0_-20px_20px_0_#01FF013D] transition-all duration-200"
              >
                Go to Login
              </Button>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <BackToPage title="Back to homepage" route="/" />
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmationPage;
