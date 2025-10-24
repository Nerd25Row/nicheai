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
import { Eye } from "lucide-react";
import { Button } from "../ui/button";
import LogoComponent from "../layouts/LogoComponent";
import { emailExists, signUp } from "../../services/auth/authService";
import { Alert } from "../ui/alert";
import { useNavigate } from "react-router-dom";
import BackToPage from "../layouts/BackToHomePage";
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
    formState: { isSubmitting, errors },
  } = form;
  const submitSignup = async (values: FormValues) => {
    try {
      const exists = await emailExists(values.email);
      if (exists) {
        form.setError("email", { message: "Email is already registered." });
        return;
      }
      await signUp(values);
     navigate(`/auth/confirm-email?email=${encodeURIComponent(values.email)}`);
    } catch (err: any) {
      const msg =
        err?.message ||
        err?.error_description ||
        "We couldn’t create your account. Please try again.";

      // Common Supabase message for duplicates: "User already registered"
      if (typeof msg === "string" && /already registered|exists/i.test(msg)) {
        setError("email", {
          type: "server",
          message: "Email is already registered.",
        });
      } else {
        setError("root", { type: "server", message: msg });
      }
    }
  };
  return (
    <div className="relative md:absolute flex flex-col items-center w-full max-w-[90%] sm:max-w-[500px] md:w-[540px] min-h-screen md:h-[996px] rotate-0 opacity-100 top-0 md:top-[64px] gap-6 md:gap-10 px-4 md:px-0 py-8 md:py-0 pb-20 md:pb-0">
      {/* logo */}
      <LogoComponent />
      <div className="flex flex-col items-center w-full md:w-[540px] h-auto md:h-[908px] rotate-0 opacity-100 gap-4">
        <div className="flex flex-col w-full md:w-[540px] h-auto md:h-[900px] rotate-0 opacity-100 rounded-2xl border border-[#393B41] gap-8 md:gap-[59px] p-6 md:p-12 bg-[#1D2027] shadow-[0px_15px_70px_-4px_#1018281A]">
          <div className="flex flex-col w-full md:w-[444px] h-auto rotate-0 opacity-100 gap-6 md:gap-8">
            <div className="flex flex-col items-center w-full md:w-[444px] h-auto md:h-[76px] rotate-0 opacity-100 gap-4">
              <h1 className="w-full max-w-[330px] h-auto md:h-[36px] rotate-0 opacity-100 font-inter font-bold text-[24px] md:text-[28px] leading-[32px] md:leading-[36px] tracking-[-0.02em] text-center text-white px-2">
                Create Business Account
              </h1>
              <span className="w-full md:w-[444px] h-auto md:h-[24px] rotate-0 opacity-100 font-inter font-normal text-[16px] leading-[24px] tracking-[0em] text-center text-[#B6BCCA]">
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
                className="flex flex-col w-full md:w-[444px] h-auto md:h-[560px] rotate-0 opacity-100 gap-8"
              >
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full md:w-[444px] h-auto md:h-[80px] rotate-0 opacity-100 gap-2">
                      <FormLabel className="w-full md:w-[444px] h-[24px] rotate-0 opacity-100 font-inter font-medium text-[16px] leading-[24px] tracking-[0em] align-middle text-[#CACFDA]">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <div className="flex w-full  rotate-0 opacity-100 gap-3 rounded-xl px-4 py-3 bg-[#2E3137] md:w-[444px] md:h-[48px]">
                          <Input
                            placeholder="Enter first name"
                            className="w-full max-w-[412px] h-auto min-h-[24px] rotate-0 opacity-100 font-inter font-normal text-base leading-6 tracking-normal align-middle text-[#B6BCCA] bg-transparent border-0 focus:outline-none placeholder:text-[#B6BCCA] md:w-[412px] md:h-[24px]"
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
                    <FormItem className="flex flex-col w-full md:w-[444px] h-auto md:h-[80px] rotate-0 opacity-100 gap-2">
                      <FormLabel className="w-full md:w-[444px] h-[24px] rotate-0 opacity-100 font-inter font-medium text-[16px] leading-[24px] tracking-[0em] align-middle text-[#CACFDA]">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <div className="flex w-full  rotate-0 opacity-100 gap-3 rounded-xl px-4 py-3 bg-[#2E3137] md:w-[444px] md:h-[48px]">
                          <Input
                            placeholder="Enter last name"
                            className="w-full max-w-[412px] h-auto min-h-[24px] rotate-0 opacity-100 font-inter font-normal text-base leading-6 tracking-normal align-middle text-[#B6BCCA] bg-transparent border-0 focus:outline-none placeholder:text-[#B6BCCA] md:w-[412px] md:h-[24px]"
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
                    <FormItem className="flex flex-col w-full md:w-[444px] h-auto md:h-[80px] rotate-0 opacity-100 gap-2">
                      <FormLabel className="w-full md:w-[444px] h-[24px] rotate-0 opacity-100 font-inter font-medium text-[16px] leading-[24px] tracking-[0em] align-middle text-[#CACFDA]">
                        Company Name
                      </FormLabel>
                      <FormControl>
                        <div className="flex w-full  rotate-0 opacity-100 gap-3 rounded-xl px-4 py-3 bg-[#2E3137] md:w-[444px] md:h-[48px]">
                          <Input
                            placeholder="Enter company name"
                            className="w-full max-w-[412px] h-auto min-h-[24px] rotate-0 opacity-100 font-inter font-normal text-base leading-6 tracking-normal align-middle text-[#B6BCCA] bg-transparent border-0 focus:outline-none placeholder:text-[#B6BCCA] md:w-[412px] md:h-[24px]"
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
                    <FormItem className="flex flex-col w-full md:w-[444px] h-auto md:h-[80px] rotate-0 opacity-100 gap-2">
                      <FormLabel className="w-full md:w-[444px] h-[24px] rotate-0 opacity-100 font-inter font-medium text-[16px] leading-[24px] tracking-[0em] align-middle text-[#CACFDA]">
                        Business Email
                      </FormLabel>
                      <FormControl>
                        <div className="flex w-full  rotate-0 opacity-100 gap-3 rounded-xl px-4 py-3 bg-[#2E3137] md:w-[444px] md:h-[48px]">
                          <Input
                            placeholder="Enter your business email"
                            className="w-full max-w-[412px] h-auto min-h-[24px] rotate-0 opacity-100 font-inter font-normal text-base leading-6 tracking-normal align-middle text-[#B6BCCA] bg-transparent border-0 focus:outline-none placeholder:text-[#B6BCCA] md:w-[412px] md:h-[24px]"
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
                    <FormItem className="flex flex-col w-full md:w-[444px] gap-2">
                      <FormLabel className="w-full font-inter font-medium text-[16px] leading-[24px] text-[#CACFDA]">
                        Phone Number (Optional)
                      </FormLabel>

                      <div className="flex items-center w-full gap-3 rounded-xl px-4 py-3 bg-[#2E3137] md:w-[444px] md:h-[48px]">
                        <Select defaultValue="us">
                          <SelectTrigger className="w-[110px] h-auto min-h-[24px] bg-transparent border-0 p-0 focus:ring-0 focus:outline-none text-[#B6BCCA]">
                            <SelectValue placeholder="US (+1)" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#2E3137] border-[#393B41] text-white">
                            <SelectItem value="us">US (+1)</SelectItem>
                            <SelectItem value="uk">UK (+44)</SelectItem>
                            <SelectItem value="ca">CA (+1)</SelectItem>
                          </SelectContent>
                        </Select>

                        <span className="hidden md:block h-6 w-px bg-[#393B41]" />

                        <FormControl>
                          <Input
                            placeholder="000 00 00 00"
                            className="w-full h-auto min-h-[24px] font-inter font-normal text-base leading-6 text-[#B6BCCA]
                       bg-transparent border-0 focus:outline-none placeholder:text-[#B6BCCA]"
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
                    <FormItem className="flex flex-col w-full md:w-[444px] h-auto md:h-[80px] rotate-0 opacity-100 gap-2">
                      <FormLabel className="w-full md:w-[444px] h-[24px] rotate-0 opacity-100 font-inter font-medium text-[16px] leading-[24px] tracking-[0em] align-middle text-[#CACFDA]">
                        Create Password
                      </FormLabel>
                      <FormControl>
                        <div className="flex w-full  rotate-0 opacity-100 gap-3 rounded-xl px-4 py-3 bg-[#2E3137] md:w-[444px] md:h-[48px]">
                          <Input
                            placeholder="Create your password"
                            className="w-full max-w-[412px] h-auto min-h-[24px] rotate-0 opacity-100 font-inter font-normal text-base leading-6 tracking-normal align-middle text-[#B6BCCA] bg-transparent border-0 focus:outline-none placeholder:text-[#B6BCCA] md:w-[412px] md:h-[24px]"
                            {...field}
                          />
                          <Eye className="absolute right-4 top-1/2 -translate-y-1/2 w-[20px] h-[20px] rotate-0 opacity-100 text-[#B6BCCA] cursor-pointer" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-pointer w-full md:w-[444px] h-[48px] rotate-0 opacity-100 rounded-lg gap-2 px-6 bg-[#00FFFF] hover:bg-[#00FFFF]/90 text-black font-medium shadow-[inset_0px_-20px_20px_0px_#01FF013D]"
                >
                  <span className="w-auto md:w-[59px] h-[24px] rotate-0 opacity-100 font-inter font-bold text-[16px] leading-[24px] tracking-[0em] align-middle text-[#1D2027]">
                    {isSubmitting ? "Creating account..." : "Sign up"}
                  </span>
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <BackToPage  title="Back to homepage" route="/" />
    </div>
  );
};

export default SignupForm;
