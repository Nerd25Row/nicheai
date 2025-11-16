import { useEffect } from "react";
import z from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoggedInUserProfile } from "../features/user/useUserQuery";
import { useUpdateUserInformationMutation } from "../features/user/useUpdateUserInformationMutation";
const formSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "First Name must be at least 2 characters" }),
  last_name: z
    .string()
    .min(2, { message: "Last Name must be at least 2 characters" }),
  email: z.string().email("Please enter a valid email"),
  phone_number: z.string().max(15, "Too long").optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

const ProfileInformation = () => {
  const { data: userProfile, isLoading: isLoadingProfile } =
    useLoggedInUserProfile();
  const updateUserProfileInformationMutation =
    useUpdateUserInformationMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  // Load user profile data into form when available
  useEffect(() => {
    if (userProfile) {
      reset({
        first_name: userProfile.first_name || "",
        last_name: userProfile.last_name || "",
        email: userProfile.email || "",
        phone_number: userProfile.phone_number || "",
      });
    }
  }, [userProfile, reset]);

  const saveChanges = async (values: FormValues) => {
    try {
      await updateUserProfileInformationMutation.mutateAsync({
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        phone_number: values.phone_number || "",
      });
      // Success is handled by query invalidation - form will update automatically
    } catch (error) {
      console.error("Failed to update profile:", error);
      // Error handling is done by the mutation hook
    }
  };

  if (isLoadingProfile) {
    return (
      <div className="flex flex-col items-center justify-center w-full lg:max-w-[864px] min-h-[330px] rounded-[20px] border border-[#4D5057] bg-[#2E3137] p-4">
        <Loader2 className="w-6 h-6 animate-spin text-[#B6BCCA]" />
      </div>
    );
  }
  return (
    <form
      onSubmit={handleSubmit(saveChanges)}
      className="flex flex-col items-center lg:items-start justify-between w-full lg:max-w-[864px] min-h-[330px] rotate-0 opacity-100 rounded-[20px] border border-[#4D5057] bg-gray-200 dark:bg-[#2E3137] p-4"
    >
      {/* Header */}
      <div className="flex items-center justify-center lg:justify-start w-full lg:max-w-[864px] h-[28px] rotate-0 opacity-100 mb-4">
        <span className="w-full lg:max-w-[167px] h-[28px] rotate-0 opacity-100 font-inter font-semibold text-lg leading-[100%] tracking-[0%] dark:text-white">
          Profile Information
        </span>
      </div>

      {/* Form */}
      <div className="w-full lg:max-w-[814px] grid grid-cols-1 lg:grid-cols-2 min-h-[164px] rotate-0 opacity-100 gap-4">
        {/* First Name */}
        <div className="flex flex-col justify-between w-full lg:max-w-[395px] min-h-[70px] rotate-0 opacity-100">
          <div className="w-full h-[20px] rotate-0 opacity-100 mb-2">
            <span className="w-[77px] h-[20px] rotate-0 opacity-100 top-[1px] font-inter font-normal text-sm leading-[100%] tracking-[0%] text-gray-600 dark:text-[#B6BCCA]">
              First Name
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center w-full h-[42px] rotate-0 opacity-100 px-4 gap-3 rounded-xl bg-white dark:bg-[#4D5057]">
              <Input
                {...register("first_name")}
                className="w-full h-[24px] rotate-0 opacity-100 font-inter font-normal border-0 text-base leading-6 tracking-[0%] dark:text-white dark:placeholder:text-white bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="John"
              />
            </div>
            {errors.first_name && (
              <span className="text-xs text-red-400">
                {errors.first_name.message}
              </span>
            )}
          </div>
        </div>

        {/* Last Name */}
        <div className="flex flex-col justify-between w-full lg:max-w-[395px] min-h-[70px] rotate-0 opacity-100">
          <div className="w-full h-[20px] rotate-0 opacity-100 mb-2">
            <span className="w-[77px] h-[20px] rotate-0 opacity-100 top-[1px] font-inter font-normal text-sm leading-[100%] tracking-[0%] text-gray-600 dark:text-[#B6BCCA]">
              Last Name
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center w-full h-[42px] rotate-0 opacity-100 px-4 gap-3 rounded-xl bg-white dark:bg-[#4D5057]">
              <Input
                {...register("last_name")}
                className="w-full h-[24px] rotate-0 opacity-100 font-inter font-normal border-0 text-base leading-6 tracking-[0%] dark:text-white dark:placeholder:text-white bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Doe"
              />
            </div>
            {errors.last_name && (
              <span className="text-xs text-red-400">
                {errors.last_name.message}
              </span>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col justify-between w-full lg:max-w-[395px] min-h-[70px] rotate-0 opacity-100">
          <div className="w-full h-[20px] rotate-0 opacity-100 mb-2">
            <span className="w-[77px] h-[20px] rotate-0 opacity-100 top-[1px] font-inter font-normal text-sm leading-[100%] tracking-[0%] text-gray-600 dark:text-[#B6BCCA]">
              Business Email
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center w-full h-[42px] rotate-0 opacity-100 px-4 gap-3 rounded-xl bg-white dark:bg-[#4D5057]">
              <Input
                {...register("email")}
                type="email"
                className="w-full h-[24px] rotate-0 opacity-100 font-inter font-normal border-0 text-base leading-6 tracking-[0%] dark:text-white dark:placeholder:text-white bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="john.doe@company.com"
              />
            </div>
            {errors.email && (
              <span className="text-xs text-red-400">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>

        {/* Phone Number */}
        <div className="flex flex-col justify-between w-full lg:max-w-[395px] min-h-[70px] rotate-0 opacity-100">
          <div className="w-full h-[20px] rotate-0 opacity-100 mb-2">
            <span className="w-[77px] h-[20px] rotate-0 opacity-100 top-[1px] font-inter font-normal text-sm leading-[100%] tracking-[0%] text-gray-600 dark:text-[#B6BCCA]">
              Phone Number (Optional)
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center w-full h-[42px] rotate-0 opacity-100 px-4 gap-3 rounded-xl bg-white dark:bg-[#4D5057]">
              <Input
                {...register("phone_number")}
                className="w-full h-[24px] rotate-0 opacity-100 font-inter font-normal border-0 text-base leading-6 tracking-[0%] dark:text-white dark:placeholder:text-white bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            {errors.phone_number && (
              <span className="text-xs text-red-400">
                {errors.phone_number.message}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {updateUserProfileInformationMutation.isError && (
        <div className="w-full mt-2 rounded-lg bg-red-500/10 border border-red-500/50 p-3">
          <span className="font-inter font-normal text-sm text-red-400">
            {updateUserProfileInformationMutation.error instanceof Error
              ? updateUserProfileInformationMutation.error.message
              : "Failed to update profile. Please try again."}
          </span>
        </div>
      )}

      {/* Success Message */}
      {updateUserProfileInformationMutation.isSuccess && (
        <div className="w-full mt-2 rounded-lg bg-green-500/10 border border-green-500/50 p-3">
          <span className="font-inter font-normal text-sm text-green-400">
            Profile updated successfully!
          </span>
        </div>
      )}

      {/* Save Button */}
      <Button
        type="submit"
        disabled={
          isSubmitting || updateUserProfileInformationMutation.isPending
        }
        className="w-[144px] h-[40px] rotate-0 opacity-100 mt-4 pr-4 pl-4 gap-2 rounded-lg border border-[#4D5057] bg-gray-200 hover:bg-gray-300 dark:bg-[#2E3137] dark:hover:bg-[#4D5057]/50 shadow-[0px_1px_2px_0px_#1018280D] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting || updateUserProfileInformationMutation.isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            <span className="font-inter font-bold text-base leading-6 tracking-[0%] align-middle text-black dark:text-white">
              Saving...
            </span>
          </>
        ) : (
          <span className="w-[112px] h-[24px] rotate-0 opacity-100 font-inter font-bold text-base leading-6 tracking-[0%] align-middle text-black dark:text-white">
            Save Changes
          </span>
        )}
      </Button>
    </form>
  );
};

export default ProfileInformation;
