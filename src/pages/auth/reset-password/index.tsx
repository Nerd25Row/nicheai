import { Button } from "../../../components/ui/button";
import BackToPage from "../../../components/layouts/BackToHomePage";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../components/ui/input";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { resetPassword } from "../../../services/auth/authService";

const formSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type FormValues = z.infer<typeof formSchema>;
type Status = "idle" | "success" | "error";

const ResetPasswordPage = () => {
  const [params] = useSearchParams();
  const token = params.get("token");

  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { password: "" },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const handleResetPassword = async ({ password }: FormValues) => {
    setStatus("idle");
    setMessage("");
    try {
      await resetPassword(password);
      setStatus("success");
      setMessage(
        "Your password has been successfully reset. You can now log in."
      );
    } catch (err: any) {
      const msg =
        err?.status === 429
          ? "Too many attempts. Please wait a minute and try again."
          : err?.message || "Could not reset password.";
      setStatus("error");
      setMessage(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 ">
      <div className="flex flex-col items-center justify-center w-full max-w-md space-y-6">
        {status !== "idle" && message && (
          <div
            role="status"
            aria-live="polite"
            className={`rounded-md px-4 py-2 text-sm font-medium transition-opacity duration-200 ${
              status === "success"
                ? "border border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                : "border border-red-500/40 bg-red-500/10 text-red-400"
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
                Reset Your Password
              </h1>
              <p className="text-sm sm:text-base text-[#B6BCCA]">
                Enter a new password to regain access to your account.
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={handleSubmit(handleResetPassword)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col gap-2 opacity-100">
                      <FormLabel className="w-full text-[#CACFDA] text-sm sm:text-[16px] leading-5 sm:leading-6 tracking-normal font-inter font-medium opacity-100">
                        New Password
                      </FormLabel>
                      <FormControl>
                        <div className="flex w-full  rotate-0 opacity-100 gap-3 rounded-xl px-4 py-3 bg-[#2E3137] lg:w-[444px] lg:h-[48px]">
                          <Input
                            placeholder="Create your new password"
                            className="w-full max-w-[412px] h-auto min-h-[24px] rotate-0 opacity-100 font-inter font-normal text-base leading-6 tracking-normal align-middle text-[#B6BCCA] bg-transparent border-0 focus:outline-none placeholder:text-[#B6BCCA] md:w-[412px] md:h-[24px]"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  disabled={isSubmitting || !token}
                  type="submit"
                  className="w-full h-12 rounded-lg bg-[#00FFFF] hover:bg-[#00FFFF]/90 text-black font-bold text-base shadow-[inset_0px_-20px_20px_0px_#01FF013D] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isSubmitting ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            </Form>
          </div>
        </div>

        <div className="flex justify-center">
          <BackToPage title="Back to login" route="/auth/login" />
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
