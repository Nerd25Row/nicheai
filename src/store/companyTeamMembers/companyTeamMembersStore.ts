import { create } from "zustand";

type InviteState = {
  inviteLink: string | null;
  inviteToken: string | null;
  email: string;
  copied: boolean;
  error: string | null;
  success: string | null;
  setInviteLink: (link: string | null) => void;
  setInviteToken: (token: string | null) => void;
  setEmail: (email: string) => void;
  setCopied: (copied: boolean) => void;
  setError: (error: string | null) => void;
  setSuccess: (success: string | null) => void;
  reset: () => void;
};

export const useCompanyTeamMembersStore = create<InviteState>((set) => ({
  inviteLink: null,
  inviteToken: null,
  email: "",
  copied: false,
  error: null,
  success: null,
  setInviteLink: (link) => set({ inviteLink: link }),
  setInviteToken: (token) => set({ inviteToken: token }),
  setEmail: (email) => set({ email }),
  setCopied: (copied) => set({ copied }),
  setError: (error) => set({ error }),
  setSuccess: (success) => set({ success }),
  reset: () =>
    set({
      inviteLink: null,
      inviteToken: null,
      email: "",
      copied: false,
      error: null,
      success: null,
    }),
}));


