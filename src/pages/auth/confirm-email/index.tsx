import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { resendSignupEmail } from "../../../services/auth/authService";
import { Button } from "../../../components/ui/button";
import BackToPage from "../../../components/layouts/BackToHomePage";
type Status = "idle" | "success" | "error";
const ConfirmEmailPage = () => {
  const [params] = useSearchParams();
  const email = useMemo(() => params.get("email")?.trim() ?? "", [params]);

  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResend = async (email: string) => {
    setStatus("idle");
    setMessage("");

    if (!email) {
      setStatus("error");
      setMessage("Email is required.");
      return;
    }

    try {
      setIsSubmitting(true);
      await resendSignupEmail(email);
      setStatus("success");
      setMessage("Confirmation email sent. Check your inbox (and spam).");
    } catch (err: any) {
      const msg =
        err?.status === 429
          ? "You’ve requested too many emails. Please wait a minute and try again."
          : err?.message || "Could not resend confirmation email.";
      setStatus("error");
      setMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-[540px]  rotate-0 opacity-100 gap-[40px]">
      <div className="flex flex-col items-center w-[540] h-[468px] rotate-0 opacity-100 gap-[16px]">
        {/* Status banner */}
        {status !== "idle" && message && (
          <div
            role="status"
            aria-live="polite"
            className={`mb-4 rounded-md px-3 py-2 text-sm ${
              status === "success"
                ? "border border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                : "border border-red-500/40 bg-red-500/10 text-red-400"
            }`}
          >
            {message}
          </div>
        )}
        <div className="flex flex-col items-center w-[540px] h-[404px] rotate-0 opacity-100 gap-8 rounded-2xl border border-[#393B41] p-12 bg-[#1D2027] shadow-[0px_15px_70px_-4px_#1018281A]">
          <div className="flex items-center justify-center w-[120px] h-[120px] rotate-0 opacity-100 gap-[15px] rounded-[93.75px] p-[15px] bg-[#2E3137]">
            <div className="flex items-center justify-center w-[45px] h-[45px] rotate-0 opacity-100">
              <img src="/assets/images/email.svg" />
            </div>
          </div>
          <div className="flex flex-col items-center w-[444px] h-[156px] rotate-0 opacity-100 gap-8">
            <div className="flex flex-col items-center w-[444px] h-[76px] rotate-0 opacity-100 gap-4">
              <h1 className="w-[229px] h-[36px] rotate-0 opacity-100 font-inter font-bold text-[28px] leading-[36px] tracking-[-0.02em] text-center text-white">
                Check Your Email
              </h1>

              <p className="w-[444px] h-[24px] rotate-0 opacity-100 font-inter font-normal text-[16px] leading-[24px] tracking-[0em] text-center text-[#B6BCCA]">
                Check your email to verify your account
              </p>
            </div>

            <Button
              disabled={isSubmitting}
              onClick={() => handleResend(email)}
              className="w-[444px] h-[48px] cursor-pointer rotate-0 opacity-100 gap-2 rounded-lg px-6 bg-[#00FFFF] hover:bg-[#00FFFF]/90 text-black font-bold shadow-[inset_0px_-20px_20px_0px_#01FF013D] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              <span className="w-[198px] h-[24px] rotate-0 opacity-100 font-inter font-bold text-[16px] leading-[24px] tracking-[0em] align-middle text-[#1D2027]">
                {isSubmitting ? "Resending..." : "Resend verification email"}
              </span>
            </Button>
          </div>
        </div>
        <BackToPage title="Back to login" route="/auth/login" />
      </div>
    </div>
  );
};

export default ConfirmEmailPage;
