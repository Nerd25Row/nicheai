import z from "zod";
import BackToHomePage from "./BackToHomePage";
import LogoComponent from "./LogoComponent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Eye } from "lucide-react";
import { Button } from "./ui/button";
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
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
  phone_number: z
    .string()
    .max(10, { message: "Phone number must be at maximum 10 characters" }),
  password: z.string().min(2, {
    message: "password must be at least 2 characters.",
  }),
});
const SignupForm = () => {
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
  return (
    <div className="relative md:absolute flex flex-col items-center w-full max-w-[90%] sm:max-w-[500px] md:w-[540px] min-h-screen md:h-[996px] rotate-0 opacity-100 top-0 md:top-[64px] gap-6 md:gap-10 px-4 md:px-0 py-8 md:py-0 pb-20 md:pb-0">
      {/* logo */}
      <LogoComponent />
      <div className="flex flex-col items-center w-full md:w-[540px] h-auto md:h-[908px] rotate-0 opacity-100 gap-4">
        <div className="flex flex-col w-full md:w-[540px] h-auto md:h-[844px] rotate-0 opacity-100 rounded-2xl border border-[#393B41] gap-8 md:gap-[59px] p-6 md:p-12 bg-[#1D2027] shadow-[0px_15px_70px_-4px_#1018281A]">
          <div className="flex flex-col w-full md:w-[444px] h-auto rotate-0 opacity-100 gap-6 md:gap-8">
            <div className="flex flex-col items-center w-full md:w-[444px] h-auto md:h-[76px] rotate-0 opacity-100 gap-4">
              <h1 className="w-full max-w-[330px] h-auto md:h-[36px] rotate-0 opacity-100 font-inter font-bold text-[24px] md:text-[28px] leading-[32px] md:leading-[36px] tracking-[-0.02em] text-center text-white px-2">
                Create Business Account
              </h1>
              <span className="w-full md:w-[444px] h-auto md:h-[24px] rotate-0 opacity-100 font-inter font-normal text-[16px] leading-[24px] tracking-[0em] text-center text-[#B6BCCA]">
                Join thousands of companies already using our platform
              </span>
            </div>
            <Form {...form}>
              <form className="flex flex-col w-full md:w-[444px] h-auto md:h-[560px] rotate-0 opacity-100 gap-4">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={(...field) => (
                    <FormItem className="flex flex-col w-full md:w-[444px] h-auto md:h-[80px] rotate-0 opacity-100 gap-2">
                      <FormLabel className="w-full md:w-[444px] h-[24px] rotate-0 opacity-100 font-inter font-medium text-[16px] leading-[24px] tracking-[0em] align-middle text-[#CACFDA]">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full md:w-[444px] h-[48px] rotate-0 opacity-100 rounded-xl gap-3 px-4 bg-[#2E3137] border-none text-white placeholder:font-inter placeholder:font-normal placeholder:text-[16px] placeholder:leading-[24px] placeholder:tracking-[0em] placeholder:align-middle placeholder:text-[#B6BCCA]"
                          placeholder="Enter first name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="last_name"
                  render={(...field) => (
                    <FormItem className="flex flex-col w-full md:w-[444px] h-auto md:h-[80px] rotate-0 opacity-100 gap-2">
                      <FormLabel className="w-full md:w-[444px] h-[24px] rotate-0 opacity-100 font-inter font-medium text-[16px] leading-[24px] tracking-[0em] align-middle text-[#CACFDA]">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full md:w-[444px] h-[48px] rotate-0 opacity-100 rounded-xl gap-3 px-4 bg-[#2E3137] border-none text-white placeholder:font-inter placeholder:font-normal placeholder:text-[16px] placeholder:leading-[24px] placeholder:tracking-[0em] placeholder:align-middle placeholder:text-[#B6BCCA]"
                          placeholder="Enter last name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company_name"
                  render={(...field) => (
                    <FormItem className="flex flex-col w-full md:w-[444px] h-auto md:h-[80px] rotate-0 opacity-100 gap-2">
                      <FormLabel className="w-full md:w-[444px] h-[24px] rotate-0 opacity-100 font-inter font-medium text-[16px] leading-[24px] tracking-[0em] align-middle text-[#CACFDA]">
                        Company Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full md:w-[444px] h-[48px] rotate-0 opacity-100 rounded-xl gap-3 px-4 bg-[#2E3137] border-none text-white placeholder:font-inter placeholder:font-normal placeholder:text-[16px] placeholder:leading-[24px] placeholder:tracking-[0em] placeholder:align-middle placeholder:text-[#B6BCCA]"
                          placeholder="Enter company name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={(...field) => (
                    <FormItem className="flex flex-col w-full md:w-[444px] h-auto md:h-[80px] rotate-0 opacity-100 gap-2">
                      <FormLabel className="w-full md:w-[444px] h-[24px] rotate-0 opacity-100 font-inter font-medium text-[16px] leading-[24px] tracking-[0em] align-middle text-[#CACFDA]">
                        Business Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full md:w-[444px] h-[48px] rotate-0 opacity-100 rounded-xl gap-3 px-4 bg-[#2E3137] border-none text-white placeholder:font-inter placeholder:font-normal placeholder:text-[16px] placeholder:leading-[24px] placeholder:tracking-[0em] placeholder:align-middle placeholder:text-[#B6BCCA]"
                          placeholder="Enter your business email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone_number"
                  render={(...field) => (
                    <FormItem className="flex flex-col w-full md:w-[444px] h-auto md:h-[80px] rotate-0 opacity-100 gap-2">
                      <FormLabel className="w-full md:w-[444px] h-[24px] rotate-0 opacity-100 font-inter font-medium text-[16px] leading-[24px] tracking-[0em] align-middle text-[#CACFDA]">
                        Phone Number (Optional)
                      </FormLabel>
                      <div className="flex items-stretch w-full md:w-[444px] h-[48px]">
                        <Select defaultValue="us">
                          <SelectTrigger className="w-[110px] h-full min-h-[48px] rotate-0 opacity-100 rounded-l-xl rounded-r-none px-4 bg-[#2E3137] border-none text-white font-inter font-normal text-[16px] leading-[24px] flex items-center">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#2E3137] border-[#393B41] text-white">
                            <SelectItem value="us">US (+1)</SelectItem>
                            <SelectItem value="uk">UK (+44)</SelectItem>
                            <SelectItem value="ca">CA (+1)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormControl>
                          <Input
                            className="flex-1 h-full min-h-[48px] rotate-0 opacity-100 rounded-l-none rounded-r-xl gap-3 px-4 bg-[#2E3137] border-none text-white placeholder:font-inter placeholder:font-normal placeholder:text-[16px] placeholder:leading-[24px] placeholder:tracking-[0em] placeholder:align-middle placeholder:text-[#B6BCCA]"
                            placeholder="000 00 00 00"
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
                  render={(...field) => (
                    <FormItem className="flex flex-col w-full md:w-[444px] h-auto md:h-[80px] rotate-0 opacity-100 gap-2">
                      <FormLabel className="w-full md:w-[444px] h-[24px] rotate-0 opacity-100 font-inter font-medium text-[16px] leading-[24px] tracking-[0em] align-middle text-[#CACFDA]">
                        Create Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative w-full md:w-[444px] h-[48px]">
                          <Input
                            className="w-full h-[48px] rotate-0 opacity-100 rounded-xl gap-3 px-4 pr-12 bg-[#2E3137] border-none text-white placeholder:font-inter placeholder:font-normal placeholder:text-[16px] placeholder:leading-[24px] placeholder:tracking-[0em] placeholder:align-middle placeholder:text-[#B6BCCA]"
                            placeholder="Create your password"
                            type="password"
                            {...field}
                          />
                          <Eye className="absolute right-4 top-1/2 -translate-y-1/2 w-[20px] h-[20px] rotate-0 opacity-100 text-[#B6BCCA] cursor-pointer" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            <Button className="w-full md:w-[444px] h-[48px] rotate-0 opacity-100 rounded-lg gap-2 px-6 bg-[#00FFFF] hover:bg-[#00FFFF]/90 text-black font-medium shadow-[inset_0px_-20px_20px_0px_#01FF013D]">
              <span className="w-auto md:w-[59px] h-[24px] rotate-0 opacity-100 font-inter font-bold text-[16px] leading-[24px] tracking-[0em] align-middle text-[#1D2027]">
                Sign up
              </span>
            </Button>
          </div>
        </div>
      </div>
      <BackToHomePage />
    </div>
  );
};

export default SignupForm;
