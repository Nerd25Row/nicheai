import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "../../services/user/userService";
import { useUserProfileStore } from "../../store/user/userProfileStore";

export const useUpdateUserInformationMutation = () => {
  const queryClient = useQueryClient();
  const { setStatus } = useUserProfileStore();

  return useMutation({
    mutationFn: ({
      first_name,
      last_name,
      email,
      phone_number,
    }: {
      first_name: string;
      last_name: string;
      email: string;
      phone_number: string;
    }) => updateUserProfile({ first_name, last_name, email, phone_number }),
    onMutate: () => {
      setStatus("loading");
    },
    onSuccess: async (data) => {
      // Update Zustand store
      useUserProfileStore.getState().setUserProfile(data);
      // Invalidate and refetch user profile query
      await queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      setStatus("idle");
    },
    onError: (error) => {
      setStatus("idle");
      console.error("Profile update error:", error);
    },
  });
};
