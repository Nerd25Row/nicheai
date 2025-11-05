import { supabase } from "../../lib/supabase";
import { getUser } from "../auth/authService";
import { getUserCompanyId } from "../company/companyService";

export type GalleryItem = {
  id: string;
  company_id: string;
  generated_by: string;
  model_id: string;
  model_option_id: string | null;
  original_image_name: string | null;
  original_image_url: string | null;
  processed_image_url: string | null;
  status: "processing" | "completed" | "failed";
  error_message: string | null;
  file_size_mb: number | null;
  processing_time_ms: number | null;
  metadata: Record<string, any> | null;
  created_at: string;
  updated_at: string;
};

export async function uploadImage(file: File) {
  // Get current user
  const user = await getUser();
  if (!user) {
    throw new Error("Please log in to upload an image");
  }

  // Get user's company_id
  const company_id = await getUserCompanyId(user.id);
  if (!company_id) throw new Error("No User Company Found");
  // Create a unique file name
  const fileExt = file.name.split(".").pop();
  const timestamp = Date.now();
  const fileName = `${user.id}-${timestamp}.${fileExt}`;
  const filePath = `${company_id}/${fileName}`;

  // Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from("gallery")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    // Provide clearer error message for RLS policy violations
    if (uploadError.message?.includes("row-level security policy")) {
      throw new Error(
        "Storage bucket access denied. Please configure RLS policies for the 'gallery' bucket in Supabase."
      );
    }
    throw uploadError;
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("gallery").getPublicUrl(filePath);
  return publicUrl;
}

/**
 * Upload a base64 image to Supabase storage and return the public URL
 */
export async function uploadBase64Image(
  base64Data: string,
  fileName?: string
): Promise<string> {
  // Get current user
  const user = await getUser();
  if (!user) {
    throw new Error("Please log in to upload an image");
  }

  // Get user's company_id
  const company_id = await getUserCompanyId(user.id);
  if (!company_id) throw new Error("No User Company Found");

  // Convert base64 to blob
  const base64String = base64Data.startsWith("data:")
    ? base64Data.split(",")[1]
    : base64Data;

  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "image/png" });

  // Create a File from the blob
  const timestamp = Date.now();
  const file = new File([blob], fileName || `${user.id}-${timestamp}.png`, {
    type: "image/png",
  });

  // Upload using the existing uploadImage function
  return uploadImage(file);
}

export async function saveToGallery(
  modelId: string,
  processedImageUrl: string,
  fileSizeMb: number,
  modelOptionId?: string | null
): Promise<GalleryItem> {
  // Get current user
  const user = await getUser();
  if (!user) {
    throw new Error("Please log in to upload an image");
  }

  // Get user's company_id
  const company_id = await getUserCompanyId(user.id);
  if (!company_id) throw new Error("No User Company Found");

  // Create gallery record
  const { data: galleryItem, error: insertError } = await supabase
    .from("gallery")
    .insert({
      company_id: company_id,
      generated_by: user.id,
      model_id: modelId,
      model_option_id: modelOptionId || null,
      original_image_name: null,
      original_image_url: null,
      processed_image_url: processedImageUrl,
      status: "completed",
      file_size_mb: fileSizeMb,
      metadata: {},
    })
    .select()
    .single();

  if (insertError) {
    throw insertError;
  }

  if (!galleryItem) {
    throw new Error("Failed to create gallery record");
  }

  return galleryItem;
}

 
export const getAllCompanyGallery = async ()=>{
  const user = await getUser();
  if(!user) throw new Error("No User Session Found");
  const company_id = await getUserCompanyId(user.id);
  if (!company_id) throw new Error("No User Company Found");
  const {data,error} = await supabase.from("gallery").select("*").eq("company_id",company_id);
  if(error) throw error;
  return data; 
}