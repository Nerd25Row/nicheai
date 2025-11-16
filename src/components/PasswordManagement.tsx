import { useState } from "react";
import z from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdatePasswordMutation } from "../features/user/useUpdatePasswordMutation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const formSchema = z
  .object({
    current_password: z
      .string()
      .min(1, { message: "Current password is required" }),
    new_password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirm_password: z.string().min(1, {
      message: "Please confirm your password",
    }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type FormValues = z.infer<typeof formSchema>;

const PasswordManagement = () => {
  const updatePasswordMutation = useUpdatePasswordMutation();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: FormValues) => {
    setIsSuccess(false);
    try {
      await updatePasswordMutation.mutateAsync({
        current_password: values.current_password,
        new_password: values.new_password,
      });
      setIsSuccess(true);
      reset(); // Clear form on success
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      // Error is handled by the mutation hook
      console.error("Failed to update password:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center lg:items-start justify-between w-full lg:max-w-[864px] min-h-[400px] rotate-0 opacity-100 rounded-[20px] border border-[#4D5057] bg-gray-200 dark:bg-[#2E3137] p-4"
      >
        {/* Header */}
        <div className="flex items-center justify-center lg:justify-start w-full lg:max-w-[814px] h-[28px] rotate-0 opacity-100 mb-4">
          <span className="w-[210px] h-[28px] truncate rotate-0 opacity-100 top-[3px] font-inter font-semibold text-lg leading-[100%] tracking-[0%] dark:text-white">
            Password Management
          </span>
        </div>

        {/* Update Password Form */}
        <div className="flex flex-col items-center lg:items-start justify-between w-full lg:max-w-[448px] min-h-[298px] rotate-0 opacity-100">
          {/* Current Password */}
          <FormField
            control={form.control}
            name="current_password"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-between w-full lg:max-w-[448px] min-h-[70px] rotate-0 opacity-100 mb-4">
                <FormLabel className="w-full lg:max-w-[448px] h-[20px] rotate-0 opacity-100 mb-2">
                  {" "}
                  <span className="w-full lg:w-[124px] h-[20px] rotate-0 opacity-100 top-[1px] font-inter font-normal text-sm leading-[100%] tracking-[0%] text-gray-600 dark:text-[#B6BCCA]">
                    Current Password
                  </span>
                </FormLabel>
                <FormControl>
                  <div className="flex items-center w-full lg:max-w-[395px] h-[42px] rotate-0 opacity-100 pr-4 pl-4 gap-3 rounded-xl bg-white dark:bg-[#4D5057]">
                    <Input
                      {...field}
                      className="w-full h-[26px] rotate-0 opacity-100 font-inter font-normal text-base border-0 leading-6 tracking-[0%] align-middle dark:text-[#ADAEBC] dark:placeholder:text-[#ADAEBC] bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="••••••••"
                      type="password"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* New Password */}
          <FormField
            control={form.control}
            name="new_password"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-between w-full lg:max-w-[448px] min-h-[70px] rotate-0 opacity-100 mb-4">
                <FormLabel className="w-full lg:max-w-[448px] h-[20px] rotate-0 opacity-100 mb-2">
                  <span className="w-full lg:max-w-[124px] h-[20px] rotate-0 opacity-100 top-[1px] font-inter font-normal text-sm leading-[100%] tracking-[0%] text-gray-600 dark:text-[#B6BCCA]">
                    New Password
                  </span>
                </FormLabel>
                <FormControl>
                  <div className="flex items-center w-full lg:max-w-[395px] h-[42px] rotate-0 opacity-100 pr-4 pl-4 gap-3 rounded-xl bg-white dark:bg-[#4D5057]">
                    <Input
                      {...field}
                      className="w-full h-[26px] rotate-0 opacity-100 font-inter font-normal text-base border-0 leading-6 tracking-[0%] align-middle dark:text-[#ADAEBC] dark:placeholder:text-[#ADAEBC] bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="••••••••"
                      type="password"
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-between w-full lg:max-w-[448px] min-h-[70px] rotate-0 opacity-100 mb-4">
                <FormLabel className="w-full lg:max-w-[448px] h-[20px] rotate-0 opacity-100 mb-2">
                  {" "}
                  <span className="w-full lg:w-[161px] h-[20px] rotate-0 opacity-100 top-[1px] font-inter font-normal text-sm leading-[100%] tracking-[0%] text-gray-600 dark:text-[#B6BCCA]">
                    Confirm New Password
                  </span>
                </FormLabel>
                <FormControl>
                  <div className="flex items-center w-full lg:max-w-[395px] h-[42px] rotate-0 opacity-100 pr-4 pl-4 gap-3 rounded-xl bg-white dark:bg-[#4D5057]">
                    <Input
                      {...field}
                      className="w-full h-[26px] rotate-0 opacity-100 font-inter font-normal text-base border-0 leading-6 tracking-[0%] align-middle dark:text-[#ADAEBC] dark:placeholder:text-[#ADAEBC] bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="••••••••"
                      type="password"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Error Message */}
        {updatePasswordMutation.isError && (
          <div className="w-full lg:w-[448px] mb-4 rounded-lg bg-red-500/10 border border-red-500/50 p-3">
            <span className="font-inter font-normal text-sm text-red-400">
              {updatePasswordMutation.error instanceof Error
                ? updatePasswordMutation.error.message
                : "Failed to update password. Please try again."}
            </span>
          </div>
        )}

        {/* Success Message */}
        {isSuccess && (
          <div className="w-full lg:w-[448px] mb-4 rounded-lg bg-green-500/10 border border-green-500/50 p-3">
            <span className="font-inter font-normal text-sm text-green-400">
              Password updated successfully!
            </span>
          </div>
        )}

        {/* Update Button */}
        <Button
          type="submit"
          disabled={isSubmitting || updatePasswordMutation.isPending}
          className="w-[170px] h-[40px] rotate-0 opacity-100 px-4 gap-2 rounded-lg border border-[#4D5057] bg-gray-200 hover:bg-gray-300 dark:bg-[#2E3137] dark:hover:bg-[#4D5057]/50 shadow-[0px_1px_2px_0px_#1018280D] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting || updatePasswordMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              <span className="font-inter font-bold text-base leading-6 tracking-[0%] align-middle text-black dark:text-white">
                Updating...
              </span>
            </>
          ) : (
            <span className="w-[138px] h-[24px] rotate-0 opacity-100 font-inter font-bold text-base leading-6 tracking-[0%] align-middle text-black dark:text-white">
              Update Password
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default PasswordManagement;
