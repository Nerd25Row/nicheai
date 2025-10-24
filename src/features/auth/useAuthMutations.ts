import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../store/auth/authStore";
import {
  getSession,
  getUser,
  signIn,
  signOut,
  signUp,
} from "../../services/auth/authService";

export const useSignIn = () => {
  const qc = useQueryClient();
  const { setUser, setSession, setStatus } = useAuthStore();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signIn({email, password}),
    onMutate: () => setStatus("loading"),
    onSuccess: async (data) => {
      // Use the data returned from signIn instead of making additional API calls
      setUser(data.user);
      setSession(data.session);
      setStatus("authenticated");
      await qc.invalidateQueries({ queryKey: ["session"] });
      await qc.invalidateQueries({ queryKey: ["user"] });
    },
    onError: () => setStatus("unauthenticated"),
  });
};

export const useSignUp = () => {
  const qc = useQueryClient();
  const { setUser, setSession, setStatus } = useAuthStore();

  return useMutation({
    mutationFn: ({
      first_name,
      last_name,
      company_name,
      phone_number,
      email,
      password,
    }: {
      first_name: string;
      last_name: string;
      company_name: string;
      phone_number: string;
      email: string;
      password: string;
    }) =>
      signUp({
        first_name,
        last_name,
        company_name,
        phone_number,
        email,
        password,
      }),
    onMutate: () => setStatus("loading"),
    onSuccess: async (data) => {
      // Use the data returned from signUp instead of making additional API calls
      setUser(data.user);
      setSession(data.session);
      setStatus(data.session ? "authenticated" : "unauthenticated");
      await qc.invalidateQueries({ queryKey: ["session"] });
      await qc.invalidateQueries({ queryKey: ["user"] });
    },
    onError: () => setStatus("unauthenticated"),
  });
};

export const useSignOut = () => {
  const qc = useQueryClient();
  const { reset } = useAuthStore();

  return useMutation({
    mutationFn: () => signOut(),
    onSuccess: async () => {
      reset();
      await qc.invalidateQueries({ queryKey: ["session"] });
      await qc.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
