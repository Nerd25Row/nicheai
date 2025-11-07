import { useMutation } from "@tanstack/react-query";
import { signInWithOAuth } from "../../services/auth/authService";
import { useAuthStore } from "../../store/auth/authStore";

export const useOAuthSignIn = () => {
  const { setStatus } = useAuthStore();

  return useMutation({
    mutationFn: (provider: "google" | "github") => signInWithOAuth(provider),
    onMutate: () => {
      setStatus("oauth_loading");
    },
    onSuccess: async (_, provider) => {
      // OAuth redirects the user, so we don't need to handle success here
      // The auth state will be updated when the user returns from OAuth
      console.log(`${provider} OAuth initiated successfully`);
    },
    onError: (error, provider) => {
      console.error(`${provider} OAuth error:`, error);
      setStatus("unauthenticated");
    },
  });
};
