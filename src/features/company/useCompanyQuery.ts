import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../store/auth/authStore";
import { getCompanyInformation } from "../../services/company/companyService";

export const useCompanyQuery = () => {
  const { user, status } = useAuthStore();

  return useQuery({
    queryKey: ["company", user?.id],
    queryFn: getCompanyInformation,
    enabled: status === "authenticated" && !!user,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
};


