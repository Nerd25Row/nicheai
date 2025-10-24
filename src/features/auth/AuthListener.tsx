import { useEffect } from "react";
import { useAuthStore } from "../../store/auth/authStore";
import { supabase } from "../../lib/supabase";
import { getUser } from "../../services/auth/authService";


const AuthListener = () => {
  const { setUser, setSession, setStatus } = useAuthStore();

  useEffect(() => {
    (async () => {
      setStatus("loading");
      const { data } = await supabase.auth.getSession();
      setSession(data.session ?? null);
      setUser(data.session ? await getUser() : null);
      setStatus(data.session ? "authenticated" : "unauthenticated");
    })();

    // Subscribe to auth state changes
    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session ?? null);
      setUser(session ? await getUser() : null);
      setStatus(session ? "authenticated" : "unauthenticated");
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, [setSession, setUser, setStatus]);

  return null;
};

export default AuthListener;
