import { useMutation } from "@tanstack/react-query";
import { createInviteLink } from "../../services/companyTeamMembers/companyTeamMemberService";
import { useCompanyTeamMembersStore } from "../../store/companyTeamMembers/companyTeamMembersStore";

export const useCreateInviteLinkMutation = () => {
  const { setInviteLink, setError } = useCompanyTeamMembersStore();
  return useMutation({
    mutationFn: createInviteLink,
    onSuccess: (data) => {
      setInviteLink(data.inviteUrl);
    },
    onError: (error) => {
      setError(error.message);
    },
  });
};

