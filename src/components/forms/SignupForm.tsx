import z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "../ui/button";
import LogoComponent from "../layouts/LogoComponent";
import { Alert } from "../ui/alert";
import { useNavigate } from "react-router-dom";
import BackToPage from "../layouts/BackToHomePage";
import { useState } from "react";
import { useSignUpMutation } from "../../features/auth/useAuthMutations";

const formSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "First Name must be at least 2 characters" }),
  last_name: z
    .string()
    .min(2, { message: "Last Name must be at least 2 characters" }),
  company_name: z
    .string()
    .min(2, { message: "Company name must be at least 2 characters" }),
  email: z.email("Please enter valid email"),
  phone_number: z
    .string()
    .min(7, "Too short")
    .max(15, "Too long")
    .optional()
    .or(z.literal("")),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});
type FormValues = z.infer<typeof formSchema>;
const SignupForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      company_name: "",
      email: "",
      phone_number: "",
      password: "",
    },
  });
  const {
    handleSubmit,
    setError,
    formState: { errors },
  } = form;

  const signupMutation = useSignUpMutation();
  const submitSignup = async (values: FormValues) => {
    signupMutation.mutate(values, {
      onSuccess: (_data, variables) => {
        navigate(
          `/auth/resend-email?email=${encodeURIComponent(variables.email)}`
        );
      },
      onError: (err: any) => {
        const msg =
          err?.message ||
          err?.error_description ||
          "We couldn't create your account. Please try again.";
        if (typeof msg === "string" && /already registered|exists/i.test(msg)) {
          setError("email", {
            type: "server",
            message: "Email is already registered.",
          });
        } else {
          setError("root", { type: "server", message: msg });
        }
      },
    });
  };
  return (
    <div className="relative flex flex-col items-center w-full lg:max-w-[540px] min-h-[996px] rotate-0 opacity-100 top-0 lg:top-[64px] gap-6 lg:gap-10 px-4 lg:px-0 py-8 lg:py-0 pb-20 lg:pb-0">
      {/* logo */}
      <LogoComponent />
      <div className="flex flex-col items-center w-full lg:max-w-[540px] min-h-[908px] rotate-0 opacity-100 gap-4">
        <div className="flex flex-col w-full lg:max-w-[540px] min-h-[844px] rotate-0 opacity-100 rounded-2xl border border-[#393B41] gap-8 md:gap-[59px] p-6 lg:p-12 bg-gray-200 dark:bg-[#1D2027] shadow-[0px_15px_70px_-4px_#1018281A]">
          <div className="flex flex-col w-full lg:max-w-[444px] min-h-[748px] rotate-0 opacity-100 gap-6 md:gap-8">
            <div className="flex flex-col items-center w-full lg:max-w-[444px] min-h-[76px] rotate-0 opacity-100 gap-6 lg:gap-4">
              <h1 className="w-full lg:max-w-[330px] min-h-[36px] rotate-0 opacity-100 font-inter font-bold text-[24px] lg:text-[28px] leading-[32px] lg:leading-[36px] tracking-[-0.02em] text-center text-black dark:text-white px-1 lg:px-2">
                Create Business Account
              </h1>
              <span className="w-full lg:max-w-[444px] min-h-[24px] rotate-0 opacity-100 font-inter font-normal text-12 lg:text-[16px] leading-[20px] lg:leading-[24px] tracking-[0em] text-center text-gray-600 dark:text-[#B6BCCA]">
                Join thousands of companies already using our platform
              </span>
            </div>

            {/* Global/server error box */}
            {errors.root?.message && (
              <Alert className="w-full flex items-center justify-center rounded-md border border-red-500/40 bg-red-500/10 text-red-400 text-sm px-3 py-2">
                {errors.root.message}
              </Alert>
            )}
            <Form {...form}>
              <form
                onSubmit={handleSubmit(submitSignup)}
                className="flex flex-col w-full lg:max-w-[444px] min-h-[560px] rotate-0 opacity-100 gap-4"
              >
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full lg:max-w-[444px] h-[80px] rotate-0 opacity-100 gap-2">
                      <FormLabel className="w-full lg:max-w-[444px] h-[24px] rotate-0 opacity-100 font-inter font-medium text-[16px] leading-[24px] tracking-[0em] align-middle text-gray-600 dark:text-[#CACFDA]">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <div className="flex w-full  rotate-0 opacity-100 gap-3 rounded-xl px-4 py-3 bg-white dark:bg-[#2E3137] lg:max-w-[444px] h-[48px]">
                          <Input
                            placeholder="Enter first name"
                            className="w-full lg:max-w-[412px] h-[24px] rotate-0 opacity-100 font-inter font-normal text-base leading-6 tracking-normal align-middle dark:text-[#B6BCCA] dark:bg-transparent border-0 focus:outline-none dark:placeholder:text-[#B6BCCA] "
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full lg:max-w-[444px] h-[80px] rotate-0 opacity-100 gap-2">
                      <FormLabel className="w-full lg:max-w-[444px] h-[24px] rotate-0 opacity-100 font-inter font-medium text-[16px] leading-[24px] tracking-[0em] align-middle text-gray-600 dark:text-[#CACFDA]">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <div className="flex w-full  rotate-0 opacity-100 gap-3 rounded-xl px-4 py-3 bg-white dark:bg-[#2E3137] lg:max-w-[444px] h-[48px]">
                          <Input
                            placeholder="Enter last name"
                            className="w-full lg:max-w-[412px] h-[24px] rotate-0 opacity-100 font-inter font-normal text-base leading-6 tracking-normal align-middle dark:text-[#B6BCCA] dark:bg-transparent border-0 focus:outline-none dark:placeholder:text-[#B6BCCA] "
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company_name"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full lg:max-w-[444px] h-[80px] rotate-0 opacity-100 gap-2">
                      <FormLabel className="w-full lg:max-w-[444px] h-[24px] rotate-0 opacity-100 font-inter font-medium text-[16px] leading-[24px] tracking-[0em] align-middle text-gray-600 dark:text-[#CACFDA]">
                        Company Name
                      </FormLabel>
                      <FormControl>
                        <div className="flex w-full  rotate-0 opacity-100 gap-3 rounded-xl px-4 py-3 bg-white dark:bg-[#2E3137] lg:max-w-[444px] h-[48px]">
                          <Input
                            placeholder="Enter company name"
                            className="w-full lg:max-w-[412px] h-[24px] rotate-0 opacity-100 font-inter font-normal text-base leading-6 tracking-normal align-middle dark:text-[#B6BCCA] dark:bg-transparent border-0 focus:outline-none dark:placeholder:text-[#B6BCCA] "
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full lg:max-w-[444px] h-[80px] rotate-0 opacity-100 gap-2">
                      <FormLabel className="w-full lg:max-w-[444px] h-[24px] rotate-0 opacity-100 font-inter font-medium text-[16px] leading-[24px] tracking-[0em] align-middle text-gray-600 dark:text-[#CACFDA]">
                        Business Email
                      </FormLabel>
                      <FormControl>
                        <div className="flex w-full  rotate-0 opacity-100 gap-3 rounded-xl px-4 py-3 bg-white dark:bg-[#2E3137] lg:max-w-[444px] h-[48px]">
                          <Input
                            placeholder="Enter your business email"
                            className="w-full lg:max-w-[412px] h-[24px] rotate-0 opacity-100 font-inter font-normal text-base leading-6 tracking-normal align-middle dark:text-[#B6BCCA] dark:bg-transparent border-0 focus:outline-none dark:placeholder:text-[#B6BCCA] "
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full lg:max-w-[444px] gap-2">
                      <FormLabel className="w-full font-inter font-medium text-[16px] leading-[24px] text-gray-600 dark:text-[#CACFDA]">
                        Phone Number (Optional)
                      </FormLabel>

                      <div className="flex items-center w-full gap-3 rounded-xl px-4 py-3 bg-white dark:bg-[#2E3137] lg:max-w-[444px] h-[48px]">
                        <Select defaultValue="us">
                          <SelectTrigger className="lg:max-w-[110px] h-[24px] dark:bg-transparent border-0 p-0 focus:ring-0 focus:outline-none dark:text-[#B6BCCA]">
                            <SelectValue placeholder="US (+1)" />
                          </SelectTrigger>
                          <SelectContent className="dark:bg-[#2E3137] border-[#393B41] text-black dark:text-white">
                            <SelectItem value="us">US (+1)</SelectItem>
                            <SelectItem value="uk">UK (+44)</SelectItem>
                            <SelectItem value="ca">CA (+1)</SelectItem>
                          </SelectContent>
                        </Select>

                        <span className="hidden md:block h-6 w-px bg-[#393B41]" />

                        <FormControl>
                          <Input
                            placeholder="000 00 00 00"
                            className="w-full h-[24px] font-inter font-normal text-base leading-6 text-black dark:text-[#B6BCCA]
                       dark:bg-transparent border-0 focus:outline-none dark:placeholder:text-[#B6BCCA]"
                            {...field}
                          />
                        </FormControl>
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full lg:max-w-[444px] h-[80px] rotate-0 opacity-100 gap-2">
                      <FormLabel className="w-full lg:max-w-[444px] h-[24px] rotate-0 opacity-100 font-inter font-medium text-[16px] leading-[24px] tracking-[0em] align-middle text-gray-600 dark:text-[#CACFDA]">
                        Create Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative flex w-full rotate-0 opacity-100 gap-3 rounded-xl px-4 py-3 bg-white dark:bg-[#2E3137] lg:max-w-[444px] h-[48px]">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Create your password"
                            className="w-full lg:max-w-[412px] h-[24px] rotate-0 opacity-100 font-inter font-normal text-base leading-6 tracking-normal align-middle dark:text-[#B6BCCA] dark:bg-transparent border-0 focus:outline-none dark:placeholder:text-[#B6BCCA] "
                            {...field}
                          />
                          {/* Tail Icon */}
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 opacity-100 text-black dark:text-white"
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
                  )}
                />
                <Button
                  type="submit"
                  disabled={signupMutation.isPending}
                  className="cursor-pointer w-full lg:max-w-[444px] h-[48px] rotate-0 opacity-100 rounded-lg gap-2 px-6 bg-[#00FFFF] hover:bg-[#00FFFF]/90 text-black font-medium shadow-[inset_0px_-20px_20px_0px_#01FF013D]"
                >
                  <span className="w-auto lg:max-w-[59px] h-[24px] rotate-0 opacity-100 font-inter font-bold text-[16px] leading-[24px] tracking-[0em] align-middle text-[#1D2027]">
                    {signupMutation.isPending
                      ? "Creating account..."
                      : "Sign up"}
                  </span>
                </Button>
              </form>
            </Form>
          </div>
        </div>
        <BackToPage title="Back to homepage" route="/" />
      </div>
    </div>
  );
};

export default SignupForm;
