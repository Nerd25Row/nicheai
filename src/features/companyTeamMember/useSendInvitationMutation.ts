import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  sendInvitationLink,
  type SendInvitationParams,
} from "../../services/companyTeamMembers/companyTeamMemberService";

export const useSendInvitationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: SendInvitationParams) => sendInvitationLink(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companyTeamMembers"] });
    },
  });
};


