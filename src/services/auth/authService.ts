import type { User, Session } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";

// Handy alias for just the data payload shape
type AuthData = { user: User | null; session: Session | null };
interface SignupProps {
  first_name: string;
  last_name: string;
  company_name: string;
  phone_number?: string | undefined;
  email: string;
  password: string;
}
export const signUp = async ({
  first_name,
  last_name,
  company_name,
  phone_number,
  email,
  password,
}: SignupProps): Promise<AuthData> => {

  const { data: emailExists, error: emailExistsError } = await supabase.rpc(
    "check_email_exists",
    {
      target_email: email,
    }
  );
  if (emailExistsError) throw emailExistsError;
  if (emailExists) throw new Error("Email Already Registered");

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name,
        last_name,
        company_name,
        phone_number,
      },
      emailRedirectTo: `${window.location.origin}/auth/confirm-email`
    },
  });
  if (error) throw error;
  return data;
};

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<AuthData> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const signOut = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session ?? null;
};

export const getUser = async (): Promise<User | null> => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user ?? null;
};

// Optional: OAuth (Google/GitHub/etc.)
export const signInWithOAuth = async (
  provider: "google" | "github"
): Promise<any> => {

  const { data, error } = await supabase.auth.signInWithOAuth({ 
    provider,
    options: {
      redirectTo: `${window.location.origin}/`
    }
  });

  if (error) throw error;
  return data;
};

export const resendSignupEmail = async (email: string): Promise<AuthData> => {
  const { data, error } = await supabase.auth.resend({
    type: "signup",
    email,

    options: {
      emailRedirectTo: `${window.location.origin}/auth/confirm-email`
    }

  });
  if (error) throw error;
  return data;
};

export const requestPasswordReset = async (email: string): Promise<any> => {

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "https://nicheai-six.vercel.app/auth/reset-password",
  });

  if (error) throw error;
  return data;
};

export async function resetPassword(

  password: string

): Promise<any> {
  if (!password) throw new Error("Password is required.");

  const { data, error } = await supabase.auth.updateUser({ password });

  if (error) {
    throw error;
  }

  return data;
}



export async function checkEmailConfirmationStatus() {
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    throw error;
  }
  
  return {
    isConfirmed: !!session,
    session,
    user: session?.user || null
  };
}

export async function updatePassword({
  current_password,
  new_password,
}: {
  current_password: string;
  new_password: string;
}): Promise<void> {
  // Get current user to verify they're logged in
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user || !user.email) {
    throw new Error("User not found. Please log in.");
  }

  // Verify current password by attempting to sign in with it
  const { error: verifyError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: current_password,
  });

  if (verifyError) {
    if (verifyError.message?.includes("Invalid login credentials")) {
      throw new Error("Current password is incorrect");
    }
    throw verifyError;
  }

  // If verification succeeds, update to new password
  const { error: updateError } = await supabase.auth.updateUser({
    password: new_password,
  });

  if (updateError) {
    throw updateError;
  }
}

