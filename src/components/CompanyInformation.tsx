import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCompanyQuery } from "../features/company/useCompanyQuery";
import { useUpdateCompanyInformationMutation } from "../features/company/updateCompanyInformationMutation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Company name must be at least 2 characters" }),
  domain: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (val) => {
        if (!val || val.trim() === "") return true;
        // Simple domain validation - must contain at least one dot
        return /^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.[a-zA-Z]{2,}$/.test(val);
      },
      { message: "Please enter a valid domain (e.g., company.com)" }
    ),
  address: z.string().optional().or(z.literal("")),
});
type FormValues = z.infer<typeof formSchema>;

const CompanyInformation = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const { data: company, isLoading: isCompanyLoading } = useCompanyQuery();
  const updateCompanyMutation = useUpdateCompanyInformationMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      domain: "",
      address: "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  // Reset form when company data loads
  useEffect(() => {
    if (company) {
      reset({
        name: company.name || "",
        domain: company.domain || "",
        address: company.address || "",
      });
    }
  }, [company, reset]);

  const saveChanges = async (values: FormValues) => {
    try {
      await updateCompanyMutation.mutateAsync({
        name: values.name,
        domain: values.domain || "",
        address: values.address || "",
      });
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Failed to update company information:", error);
      // Error handling is done by the mutation hook
    }
  };
  if (isCompanyLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full md:max-w-[864px] min-h-[330px] rounded-[20px] border border-[#4D5057] bg-[#2E3137] p-4">
        <Loader2 className="w-6 h-6 animate-spin text-[#B6BCCA]" />
      </div>
    );
  }
  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(saveChanges)}
        className="flex flex-col justify-between w-[864px] [404px] rotate-0 opacity-100 rounded-[20px] border border-[#4D5057] bg-[#2E3137] p-4 sm:p-5 md:p-6
                    gap-4 sm:gap-5 md:gap-6"
      >
        {/* Title */}
        <div className="flex items-center w-[814px] h-[28px] rotate-0 opacity-100">
          <span className="w-full w-[192px] h-[28px] truncate rotate-0 opacity-100 font-inter font-medium text-lg leading-[100%] tracking-[0%] text-white">
            Company Information
          </span>
        </div>
        {/* Row: Company Name + Domain */}
        <div
          className="flex flex-col md:flex-row items-stretch md:items-start justify-between w-[814px] min-h-[78px] rotate-0 opacity-100
                      gap-4 sm:gap-5 md:gap-6"
        >
          {/* company name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full w-[395px] min-h-[78px] rotate-0 opacity-100 gap-2">
                <FormLabel className="flex items-center w-full w-[395px] h-[20px] rotate-0 opacity-100">
                  {" "}
                  <span className="w-full w-[112px] h-[20px] rotate-0 opacity-100 font-inter font-normal text-sm leading-[100%] tracking-[0%] text-[#B6BCCA]">
                    Company Name
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full w-[395px] h-[50px] rotate-0 opacity-100 px-4 gap-3 rounded-xl bg-[#4D5057] border-0 text-white placeholder:text-[#ADAEBC] placeholder:font-inter placeholder:font-normal placeholder:text-base placeholder:leading-6 placeholder:tracking-[0%] placeholder:align-middle"
                    placeholder="Enter company name"
                  />
                </FormControl>

                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          {/* company domain */}
          <FormField
            control={form.control}
            name="domain"
            render={({ field }) => (
              <FormItem className="flex flex-col w-[395px] min-h-[78px] rotate-0 opacity-100 gap-2">
                <FormLabel className="flex items-center max-w-[395px] h-[20px] rotate-0 opacity-100">
                  {" "}
                  <span className="w-full w-[112px] h-[20px] rotate-0 opacity-100 font-inter font-normal text-sm leading-[100%] tracking-[0%] text-[#B6BCCA]">
                    Company Domain
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full w-[395px] h-[50px] rotate-0 opacity-100 px-4 gap-3 rounded-xl bg-[#4D5057] border-0 text-white placeholder:text-[#ADAEBC] placeholder:font-inter placeholder:font-normal placeholder:text-base placeholder:leading-6 placeholder:tracking-[0%] placeholder:align-middle"
                    placeholder="company.com"
                  />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
        {/* Address */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="w-[814px] min-h-[132px] rotate-0 opacity-100">
              <FormLabel className="flex items-center w-full w-[814px] h-[20px] rotate-0 opacity-100">
                <span className="w-[130px] h-[20px] rotate-0 opacity-100 font-inter font-normal text-sm leading-[100%] tracking-[0%] text-[#B6BCCA]">
                  Address (Optional)
                </span>
              </FormLabel>
              <FormControl>
                <div className="mt-2">
                  <Textarea
                    {...field}
                    className="w-[814px] h-[98px] rotate-0 opacity-100 pt-3 pr-4 pb-3 pl-4 gap-3 rounded-xl bg-[#4D5057] border-0 text-white placeholder:text-[#ADAEBC] placeholder:font-inter placeholder:font-normal placeholder:text-base placeholder:leading-6 placeholder:tracking-[0%] resize-none"
                    placeholder="Enter company address"
                    id="address"
                  />
                </div>
              </FormControl>
              <div className="min-h-[20px]">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        {/* Error Message */}
        {updateCompanyMutation.isError && (
          <div className="w-full md:w-[448px] mb-4 rounded-lg bg-red-500/10 border border-red-500/50 p-3">
            <span className="font-inter font-normal text-sm text-red-400">
              {updateCompanyMutation.error instanceof Error
                ? updateCompanyMutation.error.message
                : "Failed to update company. Please try again."}
            </span>
          </div>
        )}

        {/* Success Message */}
        {isSuccess && (
          <div className="w-full md:w-[448px] mb-4 rounded-lg bg-green-500/10 border border-green-500/50 p-3">
            <span className="font-inter font-normal text-sm text-green-400">
              Company updated successfully!
            </span>
          </div>
        )}
        {/* Button */}
        <Button
          type="submit"
          disabled={isSubmitting || updateCompanyMutation.isPending}
          className=" w-[144px] [40px] rotate-0 opacity-100 pr-4 pl-4 gap-2 rounded-lg bg-[#00FFFF] shadow-[0px_-20px_20px_0px_#01FF013D_inset] mt-2 sm:mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting || updateCompanyMutation.isPending ? (
            <span className="w-[112px] rotate-0 opacity-100 font-inter font-bold text-base leading-6 tracking-[0%] align-middle text-[#1D2027]">
              Saving...
            </span>
          ) : (
            <span className="w-[112px] rotate-0 opacity-100 font-inter font-bold text-base leading-6 tracking-[0%] align-middle text-[#1D2027]">
              Save Changes
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CompanyInformation;
