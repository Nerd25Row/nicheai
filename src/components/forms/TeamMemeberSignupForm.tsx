import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import LogoComponent from "../layouts/LogoComponent";
import BackToPage from "../layouts/BackToHomePage";
const formSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "first name must be at least 2 characters" }),
  last_name: z
    .string()
    .min(2, { message: "last name must be at least 2 characters" }),
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "password must be at least 2 characters.",
  }),
});

const TeamMemberSignupForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <div className="absolute flex flex-col gap-[40px] items-center w-full max-w-[540px] h-auto min-h-[708px] rotate-0 opacity-100 top-[126px] px-4 md:px-0 md:w-[540px] md:h-[708px]">
      <LogoComponent />
      <div className="flex flex-col items-center w-full max-w-[540px] h-auto min-h-[620px] rotate-0 opacity-100 gap-4 md:w-[540px] md:h-[620px]">
        <div className="flex flex-col w-full max-w-[540px] h-auto min-h-[636px] rotate-0 opacity-100 rounded-2xl border border-[#393B41] gap-[59px] p-6 md:p-12 bg-[#1D2027] shadow-[0px_15px_70px_-4px_#1018281A] md:w-[540px] md:h-[636px]">
          {/* Form container */}
          <div className="flex flex-col items-center gap-[32px] w-full max-w-[444px] h-auto min-h-[540px] rotate-0 opacity-100 md:w-[444px] md:h-[540px]">
            {/* Intro */}
            <div className="flex flex-col items-center w-full max-w-[444px] h-auto min-h-[76px] rotate-0 opacity-100 gap-4 md:w-[444px] md:h-[76px]">
              <h1 className="w-full max-w-[265px] h-auto min-h-[36px] rotate-0 opacity-100 font-inter font-bold text-[24px] md:text-[28px] leading-[32px] md:leading-[36px] tracking-[-0.02em] text-center text-white md:w-[265px] md:h-[36px]">
                Set up your account
              </h1>
              <h1 className="w-full max-w-[444px] h-auto min-h-[24px] rotate-0 opacity-100 font-inter font-normal text-base leading-6 tracking-normal text-center text-[#B6BCCA] md:w-[444px] md:h-[24px]">
                Join thousands of companies already using our platform
              </h1>
            </div>
            {/* form field */}
            <div className="flex flex-col w-full max-w-[444px] h-auto min-h-[352px] rotate-0 opacity-100 md:w-[444px] md:h-[352px]">
              <Form {...form}>
                <form className="flex flex-col w-full max-w-[444px] h-auto min-h-[272px] rotate-0 opacity-100 gap-4 md:w-[444px] md:h-[272px]">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={(field) => (
                      <FormItem className="flex flex-col w-full max-w-[444px] h-auto min-h-[80px] rotate-0 opacity-100 gap-2 md:w-[444px] md:h-[80px]">
                        <FormLabel className="w-full max-w-[444px] h-auto min-h-[24px] rotate-0 opacity-100 font-inter font-medium text-base leading-6 tracking-normal align-middle text-[#CACFDA] md:w-[444px] md:h-[24px]">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <div className="flex w-full max-w-[444px] h-auto min-h-[48px] rotate-0 opacity-100 gap-3 rounded-xl px-4 py-3 bg-[#2E3137] md:w-[444px] md:h-[48px]">
                            <Input
                              placeholder="Enter first name"
                              className="w-full max-w-[412px] h-auto min-h-[24px] rotate-0 opacity-100 font-inter font-normal text-base leading-6 tracking-normal align-middle text-[#B6BCCA] bg-transparent border-0 focus:outline-none placeholder:text-[#B6BCCA] md:w-[412px] md:h-[24px]"
                              {...field}
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={(field) => (
                      <FormItem className="flex flex-col w-full max-w-[444px] h-auto min-h-[80px] rotate-0 opacity-100 gap-2 md:w-[444px] md:h-[80px]">
                        <FormLabel className="w-full max-w-[444px] h-auto min-h-[24px] rotate-0 opacity-100 font-inter font-medium text-base leading-6 tracking-normal align-middle text-[#CACFDA] md:w-[444px] md:h-[24px]">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <div className="flex w-full max-w-[444px] h-auto min-h-[48px] rotate-0 opacity-100 gap-3 rounded-xl px-4 py-3 bg-[#2E3137] md:w-[444px] md:h-[48px]">
                            <Input
                              placeholder="Enter last name"
                              className="w-full max-w-[412px] h-auto min-h-[24px] rotate-0 opacity-100 font-inter font-normal text-base leading-6 tracking-normal align-middle text-[#B6BCCA] bg-transparent border-0 focus:outline-none placeholder:text-[#B6BCCA] md:w-[412px] md:h-[24px]"
                              {...field}
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={(field) => (
                      <FormItem className="flex flex-col w-full max-w-[444px] h-auto min-h-[80px] rotate-0 opacity-100 gap-2 md:w-[444px] md:h-[80px]">
                        <FormLabel className="w-full max-w-[444px] h-auto min-h-[24px] rotate-0 opacity-100 font-inter font-medium text-base leading-6 tracking-normal align-middle text-[#CACFDA] md:w-[444px] md:h-[24px]">
                          Email
                        </FormLabel>
                        <FormControl>
                          <div className="flex w-full max-w-[444px] h-auto min-h-[48px] rotate-0 opacity-100 gap-3 rounded-xl px-4 py-3 bg-[#2E3137] md:w-[444px] md:h-[48px]">
                            <Input
                              placeholder="Enter your email"
                              className="w-full max-w-[412px] h-auto min-h-[24px] rotate-0 opacity-100 font-inter font-normal text-base leading-6 tracking-normal align-middle text-[#B6BCCA] bg-transparent border-0 focus:outline-none placeholder:text-[#B6BCCA] md:w-[412px] md:h-[24px]"
                              {...field}
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={(field) => (
                      <FormItem className="flex flex-col w-full max-w-[444px] h-auto min-h-[80px] rotate-0 opacity-100 gap-2 md:w-[444px] md:h-[80px]">
                        <FormLabel className="w-full max-w-[444px] h-auto min-h-[24px] rotate-0 opacity-100 font-inter font-medium text-base leading-6 tracking-normal align-middle text-[#CACFDA] md:w-[444px] md:h-[24px]">
                          Create Password
                        </FormLabel>
                        <FormControl>
                          <div className="flex w-full max-w-[444px] h-auto min-h-[48px] rotate-0 opacity-100 gap-3 rounded-xl px-4 py-3 bg-[#2E3137] md:w-[444px] md:h-[48px]">
                            <Input
                              placeholder="Create your password"
                              className="w-full max-w-[412px] h-auto min-h-[24px] rotate-0 opacity-100 font-inter font-normal text-base leading-6 tracking-normal align-middle text-[#B6BCCA] bg-transparent border-0 focus:outline-none placeholder:text-[#B6BCCA] md:w-[412px] md:h-[24px]"
                              {...field}
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
            {/* Signup button */}
            <Button className="w-full max-w-[444px] h-auto min-h-[48px] rotate-0 opacity-100 gap-2 rounded-lg px-6 py-3 bg-[#00FFFF] shadow-[0px_-20px_20px_0px_#01FF013D_inset] md:w-[444px] md:h-[48px] mt-4">
              <span className="w-full max-w-[59px] h-auto min-h-[24px] rotate-0 opacity-100 font-inter font-bold text-base leading-6 tracking-normal align-middle text-[#1D2027] md:w-[59px] md:h-[24px]">
                Sign up
              </span>
            </Button>
          </div>
        </div>
        <BackToPage title="Back to homepage" route="/" />
      </div>
    </div>
  );
};
export default TeamMemberSignupForm;
