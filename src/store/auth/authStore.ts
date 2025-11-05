import { create } from "zustand";
import type { Session, User } from "@supabase/supabase-js";

type AuthState = {
  user: User | null;
  session: Session | null;
  status: "idle" | "loading" | "authenticated" | "unauthenticated" | "oauth_loading";

  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setStatus: (s: AuthState["status"]) => void;
  reset: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  status: "idle",
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session, status: session ? "authenticated" : "unauthenticated" }),
  setStatus: (status) => set({ status }),
  reset: () => set({ user: null, session: null, status: "unauthenticated" }),
}));
