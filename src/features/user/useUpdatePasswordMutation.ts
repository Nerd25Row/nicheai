import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../../services/auth/authService";
import { useAuthStore } from "../../store/auth/authStore";
import { supabase } from "../../lib/supabase";

export const useUpdatePasswordMutation = () => {
  const { setSession } = useAuthStore();

  return useMutation({
    mutationFn: ({
      current_password,
      new_password,
    }: {
      current_password: string;
      new_password: string;
    }) => updatePassword({ current_password, new_password }),
    onSuccess: async () => {
      // After password update, refresh the session
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setSession(session);
      }
    },
    onError: (error) => {
      console.error("Password update error:", error);
    },
  });
};
