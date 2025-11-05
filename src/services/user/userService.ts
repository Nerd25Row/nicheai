import { supabase } from "../../lib/supabase";
import { getUser } from "../auth/authService";

export type BusinessAccount = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export const getLoggedInUserProfile =
  async (): Promise<BusinessAccount | null> => {
    const user = await getUser();

    if (!user) {
      return null;
    }

    try {
      const { data, error } = await supabase
        .from("accounts")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  };

export const uploadProfileAvatar = async (
  selectedFile: File
): Promise<string> => {
  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Please log in to upload an avatar");
  }

  // Create a unique file name
  const fileExt = selectedFile.name.split(".").pop();
  const filePath = `${user.id}-${Date.now()}.${fileExt}`;

  // Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from("profile-avatars")
    .upload(filePath, selectedFile, {
      cacheControl: "3600",
      upsert: true,
    });

  if (uploadError) {
    // Provide clearer error message for RLS policy violations
    if (uploadError.message?.includes("row-level security policy")) {
      throw new Error(
        "Storage bucket access denied. Please configure RLS policies for the 'profile-avatars' bucket in Supabase."
      );
    }
    throw uploadError;
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("profile-avatars").getPublicUrl(filePath);

  // Update user profile with avatar URL
  const { error: updateError } = await supabase
    .from("accounts")
    .update({ avatar_url: publicUrl })
    .eq("id", user.id);

  if (updateError) {
    // If update fails, still return the URL so the upload isn't lost
    console.error("Failed to update profile:", updateError);
  }

  return publicUrl;
};

export const updateUserProfile = async ({
  first_name,
  last_name,
  email,
  phone_number,
}: {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}): Promise<BusinessAccount> => {
  const user = await getUser();

  if (!user) {
    throw new Error("User not found. Please log in.");
  }

  // Normalize phone_number - convert empty string to null
  const normalizedPhoneNumber = phone_number?.trim() || null;

  const { data, error } = await supabase
    .from("accounts")
    .update({
      first_name,
      last_name,
      email,
      phone_number: normalizedPhoneNumber,
    })
    .eq("id", user.id)
    .select()
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error("Failed to update profile");
  }

  return data;
};
