import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../store/auth/authStore";
import { getAllCompanyTeamMembers } from "../../services/companyTeamMembers/companyTeamMemberService";

export const useGetAllCompanyTeamMembersQuery = () => {
  const { user, status } = useAuthStore();

  return useQuery({
    queryKey: ["companyTeamMembers", user?.id],
    queryFn: getAllCompanyTeamMembers,
    enabled: status === "authenticated" && !!user,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
};