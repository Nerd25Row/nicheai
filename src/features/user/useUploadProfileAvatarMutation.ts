import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadProfileAvatar } from "../../services/user/userService";
import { useUserProfileStore } from "../../store/user/userProfileStore";

export const useUploadProfileAvatarMutation = () => {
  const queryClient = useQueryClient();
  const { setStatus } = useUserProfileStore();

  return useMutation({
    mutationFn: uploadProfileAvatar,
    onMutate: () => {
      setStatus("loading");
    },
    onSuccess: async (publicUrl) => {
      // Invalidate user profile query to refetch updated data
      await queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      setStatus("idle");
      return publicUrl;
    },
    onError: (error) => {
      setStatus("idle");
      console.error("Avatar upload error:", error);
      // Don't re-throw - let the component handle the error display
    },
  });
};