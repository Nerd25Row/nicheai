import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCompanyInformation } from "../../services/company/companyService";

export const useUpdateCompanyInformationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      name,
      domain,
      address,
    }: {
      name: string;
      domain: string;
      address: string;
    }) => updateCompanyInformation({ name, domain, address }),
    onSuccess: async () => {
      // Invalidate company query to refetch updated data
      await queryClient.invalidateQueries({ queryKey: ["company"] });
    },
    onError: (error) => {
      console.error("Company information update error:", error);
    },
  });
};
