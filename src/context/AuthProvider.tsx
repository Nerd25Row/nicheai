import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/auth/authStore';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setUser, setSession, setStatus } = useAuthStore();

  useEffect(() => {
    // Initialize auth state
    const initializeAuth = async () => {
      try {
        setStatus('loading');

        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          setStatus('unauthenticated');
          return;
        }

        if (session) {
          setUser(session.user);
          setSession(session);
          setStatus('authenticated');
        } else {
          setUser(null);
          setSession(null);
          setStatus('unauthenticated');
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setStatus('unauthenticated');
      }
    };

    initializeAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        
        if (session) {
          setUser(session.user);
          setSession(session);
          setStatus('authenticated');
        } else {
          setUser(null);
          setSession(null);
          setStatus('unauthenticated');
        }
      }
    );

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setSession, setStatus]);

  return <>{children}</>;
};

