import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "../ui/button";
import { FaApple, FaGoogle, FaLinkedin, FaMicrosoft } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { useState } from "react";
import LogoComponent from "../layouts/LogoComponent";
import { signIn } from "../../services/auth/authService";
import { Alert } from "../ui/alert";
import { useNavigate } from "react-router-dom";
import BackToPage from "../layouts/BackToHomePage";

const formSchema = z.object({
  email: z.email("Please enter valid email"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});
type FormValues = z.infer<typeof formSchema>;
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = form;

  const loginSubmit = async (values: FormValues) => {
    try {
      await signIn(values);
      navigate("/");
    } catch (err: any) {
      const msg =
        err?.message ||
        err?.error_description ||
        "Unable to log in. Please try again.";

      // Common Supabase message: "Invalid login credentials"
      if (typeof msg === "string" && /invalid login/i.test(msg)) {
        setError("password", {
          type: "server",
          message: "Invalid email or password.",
        });
      } else {
        setError("root", { type: "server", message: msg });
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[90%] sm:max-w-md lg:max-w-[540px] opacity-100 gap-6 sm:gap-8 lg:gap-[40px] py-4">
      {/*  */}
      <LogoComponent />
      <div className="w-full rounded-2xl bg-[#1D2027] border border-[#393B41] shadow-[0px_15px_70px_-4px_#1018281A] opacity-100 pt-6 px-4 sm:pt-8 sm:px-6 lg:pt-12 lg:px-12 pb-6 sm:pb-8 flex flex-col gap-8 sm:gap-10 lg:gap-[59px] justify-center">
        <div className="w-full flex flex-col gap-6 sm:gap-7 lg:gap-8 opacity-100 text-gray-200">
          {/* welcome back */}
          <div className="w-full flex flex-col gap-3 sm:gap-4 opacity-100">
            <div className="text-white text-2xl sm:text-[28px] leading-8 sm:leading-[36px] tracking-[-0.02em] font-inter font-bold text-center opacity-100">
              Welcome Back
            </div>

            <div className="text-[#B6BCCA] text-sm sm:text-[16px] leading-5 sm:leading-6 tracking-normal font-inter font-normal text-center opacity-100">
              Log in to continue
            </div>
          </div>
          {/* form */}
          {/* Global/server error box */}
          {errors.root?.message && (
            <Alert className="w-full flex items-center justify-center rounded-md border border-red-500/40 bg-red-500/10 text-red-400 text-sm px-3 py-2">
              {errors.root.message}
            </Alert>
          )}
          <div className="w-full  opacity-100 flex flex-col gap-4 p-3 sm:p-4">
            <Form {...form}>
              <form onSubmit={handleSubmit(loginSubmit)}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col gap-2 opacity-100">
                      <FormLabel className="w-full text-[#CACFDA] text-sm sm:text-[16px] leading-5 sm:leading-6 tracking-normal font-inter font-medium opacity-100">
                        Business Email
                      </FormLabel>
                      <FormControl>
                        <div className="flex w-full  rotate-0 opacity-100 gap-3 rounded-xl px-4 py-3 bg-[#2E3137] lg:w-[444px] lg:h-[48px]">
                          <Input
                            placeholder="Enter you business email"
                            className="w-full max-w-[412px] h-auto min-h-[24px] rotate-0 opacity-100 font-inter font-normal text-base leading-6 tracking-normal align-middle text-[#B6BCCA] bg-transparent border-0 focus:outline-none placeholder:text-[#B6BCCA] md:w-[412px] md:h-[24px]"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="w-full flex flex-col gap-2 opacity-100 mt-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full flex flex-col gap-2 opacity-100">
                          <FormLabel className="w-full text-[#CACFDA] text-sm sm:text-[16px] leading-5 sm:leading-6 tracking-normal font-inter font-medium opacity-100">
                            Password
                          </FormLabel>

                          <FormControl>
                            <div className="relative flex w-full rotate-0 opacity-100 gap-3 rounded-xl px-4 py-3 bg-[#2E3137] lg:w-[444px] lg:h-[48px]">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="w-full max-w-[412px] h-auto min-h-[24px] rotate-0 opacity-100 font-inter font-normal text-base leading-6 tracking-normal align-middle text-[#B6BCCA] bg-transparent border-0 focus:outline-none placeholder:text-[#B6BCCA] md:w-[412px] md:h-[24px]"
                                {...field}
                              />
                              {/* Tail Icon */}
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 opacity-100"
                              >
                                {showPassword ? (
                                  <EyeOffIcon className="w-5 h-5" />
                                ) : (
                                  <EyeIcon className="w-5 h-5" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <div className="w-full flex flex-col gap-2 opacity-100">
                    <Button
                      className="flex justify-end w-auto h-10 px-1 rounded-md text-[#01FF01] text-sm font-inter font-medium bg-transparent hover:underline opacity-100"
                      onClick={() => navigate("/auth/forgot-password")}
                    >
                      <span className="text-[#72E6E5] text-sm sm:text-[16px] leading-5 sm:leading-6 font-inter font-bold opacity-100">
                        Forgot password
                      </span>
                    </Button>
                  </div>
                </div>
                {/* login button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-pointer w-full h-11 sm:h-12 px-4 sm:px-6 rounded-lg bg-[#00FFFF] hover:bg-[#00FFFF]/90 opacity-100 shadow-[inset_0_-20px_20px_0_#01FF013D]"
                >
                  <span className="text-[#1D2027] text-sm sm:text-[16px] leading-5 sm:leading-6 font-inter font-bold opacity-100">
                    {isSubmitting ? "Logging in..." : "Log in"}
                  </span>
                </Button>
              </form>
            </Form>
          </div>
          <div className="w-full h-5 flex gap-4 sm:gap-[25px] items-center justify-center opacity-100">
            {/* line 1 */}
            <div className="flex-1 h-px border border-[#4D5057] opacity-100"></div>
            <span className="text-[#B6BCCA] text-[14px] leading-5 tracking-[0.01em] font-inter font-normal opacity-100 text-center">
              or
            </span>

            {/* line 2 */}
            <div className="flex-1 h-px border border-[#4D5057] opacity-100"></div>
          </div>
          {/* socials */}
          <div className="w-full sm:w-[380px] lg:w-[444px] h-[48px] gap-2 sm:gap-3 lg:gap-4 opacity-100 flex items-center justify-between rounded">
            {/* Google */}
            <Button className="flex-1 min-w-0 h-[48px] px-2 sm:px-4 lg:px-6 rounded-lg bg-[#2E3137] border border-[#4D5057] shadow-[0px_1px_2px_0px_#1018280D] flex items-center justify-center gap-2 opacity-100">
              <FaGoogle className="w-[20px] h-[20px] text-[#FFFFFF]" />
            </Button>
            {/* apple */}
            <Button className="flex-1 min-w-0 h-[48px] px-2 sm:px-4 lg:px-6 rounded-lg bg-[#2E3137] border border-[#4D5057] shadow-[0px_1px_2px_0px_#1018280D] flex items-center justify-center gap-2 opacity-100">
              <FaApple className="w-[20px] h-[20px] text-[#FFFFFF]" />
            </Button>
            {/* microsoft */}
            <Button className="flex-1 min-w-0 h-[48px] px-2 sm:px-4 lg:px-6 rounded-lg bg-[#2E3137] border border-[#4D5057] shadow-[0px_1px_2px_0px_#1018280D] flex items-center justify-center gap-2 opacity-100">
              <FaMicrosoft className="w-[20px] h-[20px] text-[#FFFFFF]" />
            </Button>
            {/* linkedin */}
            <Button className="flex-1 min-w-0 h-[48px] px-2 sm:px-4 lg:px-6 rounded-lg bg-[#2E3137] border border-[#4D5057] shadow-[0px_1px_2px_0px_#1018280D] flex items-center justify-center gap-2 opacity-100">
              <FaLinkedin className="w-[20px] h-[20px] text-[#FFFFFF]" />
            </Button>
          </div>
          {/*  */}
          <div className="w-full h-auto flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 opacity-100">
            {/* Button content goes here */}
            <span className="text-white text-sm sm:text-[16px] leading-5 sm:leading-6 font-inter font-medium opacity-100 text-center">
              Don't you have an account?
            </span>
            <Button
              className="cursor-pointer h-auto sm:h-12 px-2 rounded-md gap-2 flex items-center justify-center opacity-100"
              onClick={() => {
                navigate("/auth/signup");
              }}
            >
              <span className="text-[#72E6E5] text-sm sm:text-[16px] leading-5 sm:leading-6 font-inter font-bold opacity-100 text-center align-middle">
                Sign up
              </span>
            </Button>
          </div>
        </div>
      </div>
      <div>
        <BackToPage title="Back to homepage" route="/" />
      </div>
    </div>
  );
};

export default LoginForm;
