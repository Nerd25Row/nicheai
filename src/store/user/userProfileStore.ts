import { create } from "zustand";
import type { BusinessAccount } from "../../services/user/userService";

type UserProfileState = {
  userProfile: BusinessAccount | null;
  status: "idle" | "loading";
  setUserProfile: (user: BusinessAccount | null) => void;
  setStatus: (s: UserProfileState["status"]) => void;
  reset: () => void;
};

export const useUserProfileStore = create<UserProfileState>((set) => ({
  userProfile: null,
  status: "idle",
  setUserProfile: (user) => set({ userProfile: user }),
  setStatus: (status) => set({ status }),
  reset: () => set({ userProfile: null, status: "idle" }),
}));
