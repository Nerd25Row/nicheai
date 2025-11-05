import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../store/auth/authStore";
import { getLoggedInUserProfile } from "../../services/user/userService";

export const useLoggedInUserProfileQuery = () => {
  const { user, status } = useAuthStore();

  return useQuery({
    queryKey: ["userProfile", user?.id],
    queryFn: getLoggedInUserProfile,
    enabled: status === "authenticated" && !!user,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
};

// Alias for backward compatibility
export const useLoggedInUserProfile = useLoggedInUserProfileQuery;