import { supabase } from "../../lib/supabase";
import { getUser } from "../auth/authService";
import { getUserCompanyId } from "../company/companyService";

const API_BASE_URL = "https://api.nichetech.ai/v1";
export type ProcessImageResponse = {
  status: "success" | "error";
  result_image?: string[];
  result_image_name?: string;
  result_videos?: string[];
  outputs?: Array<{
    url: string;
    mimeType: string;
  }>;
  error?: string;
  details?: string;
};

export type ProcessImageOptions = {
  modelSlug: string;
  imageFile?: File;
  imageUrl?: string;
  r2Url?: boolean;
  backgroundRemoved?: boolean;
  modelId?: string;
  modelOptionId?: string | null;
};

/**
 * Model slugs from OpenAPI documentation:
 *
 * Segmentation (Background Removal):
 * - extraction_full_premium - Background Removal
 * - extraction_headshot - Background Removal Headshot
 * - extraction_full_premium_2503
 * - extraction_headshot_2503
 *
 * Fusion:
 * - fusion_full_penguin_2503 - Penguin on Hands
 * - fusion_penguin_all_hands_mm_2508 - Penguin Fusion on ALL Hands
 * - fusion_3butterfly - ButterFly Group
 * - fusion_3butterfly_headshot_2503 - ButterFly Headshot
 *
 * Immersion (Face Swap):
 * - faceswap_child_tiger_safari_mm_2507 - Tiger Hug - Still
 * - faceswap_child_tiger_safari_motion_mp4_mm_2508 - Tiger Hug - Motion
 * - faceswap_family_arctic_adventure_mm_2506 - Arctic Walking Family v2
 * - faceswap_family_arctic_adventure_2503 - Arctic Walking Family v1
 * - faceswap_youth_flying_wizard_2503
 */

export async function processUploadedImage(
  options: ProcessImageOptions
): Promise<ProcessImageResponse> {
  const user = await getUser();
  if (!user) {
    throw new Error("Please log in to process an image");
  }

  const companyId = await getUserCompanyId(user.id);
  if (!companyId) {
    throw new Error("No User Company Found");
  }

  // Get API key
  const apiKey = import.meta.env.VITE_API_KEY;

  // Validate that either imageFile or imageUrl is provided
  if (!options.imageFile && !options.imageUrl) {
    throw new Error("Either imageFile or imageUrl must be provided");
  }

  // Build URL with query parameters
  const url = new URL(`${API_BASE_URL}/${options.modelSlug}`);
  if (options.imageUrl) {
    url.searchParams.append("image_url", options.imageUrl);
  }
  if (options.r2Url) {
    url.searchParams.append("r2_url", "true");
  }
  if (options.backgroundRemoved) {
    url.searchParams.append("background_removed", "true");
  }

  // Prepare form data if file is provided
  let formData: FormData | undefined;
  if (options.imageFile) {
    formData = new FormData();
    formData.append("image_file", options.imageFile);
  }

  const startTime = Date.now();

  try {
    // Make API request
    const headers: HeadersInit = {
      "x-api-key": apiKey,
    };

    const response = await fetch(url.toString(), {
      method: "POST",
      headers,
      body: formData,
    });

    const responseTime = Date.now() - startTime;
    const responseData: ProcessImageResponse = await response.json();

    // Log API call if modelId is provided
    if (options.modelId) {
      const { data: apiKeyRecord } = await supabase
        .from("api_keys")
        .select("id")
        .eq("token", apiKey)
        .eq("is_active", true)
        .maybeSingle();

      if (apiKeyRecord) {
        await supabase.from("api_calls").insert({
          api_key_id: apiKeyRecord.id,
          company_id: companyId,
          model_id: options.modelId,
          endpoint: `/${options.modelSlug}`,
          method: "POST",
          status_code: response.status,
          response_time_ms: responseTime,
          credits_used: 1,
          error_message: responseData.error || responseData.details || null,
        });
      }
    }

    if (!response.ok) {
      throw new Error(
        responseData.error ||
          responseData.details ||
          `API request failed with status ${response.status}`
      );
    }

    if (responseData.status !== "success") {
      throw new Error(responseData.error || "Image processing failed");
    }

    return responseData;
  } catch (error) {
    // Log failed API call if modelId is provided
    if (options.modelId) {
      const { data: apiKeyRecord } = await supabase
        .from("api_keys")
        .select("id")
        .eq("token", apiKey)
        .eq("is_active", true)
        .maybeSingle();

      if (apiKeyRecord) {
        const responseTime = Date.now() - startTime;
        await supabase.from("api_calls").insert({
          api_key_id: apiKeyRecord.id,
          company_id: companyId,
          model_id: options.modelId,
          endpoint: `/${options.modelSlug}`,
          method: "POST",
          status_code: 500,
          response_time_ms: responseTime,
          credits_used: 1,
          error_message: error instanceof Error ? error.message : String(error),
        });
      }
    }

    throw error;
  }
}

export type Model = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string | null;
  api_endpoint: string;
  credits_per_call: number | null;
  is_active: boolean | null;
  display_order: number | null;
  thumbnail_url: string | null;
  metadata: Record<string, any> | null;
  features: string[] | null;
  created_at: string;
  updated_at: string;
};

/**
 * Get all active models, ordered by display_order
 */
export async function getAllModels(): Promise<Model[]> {
  const { data, error } = await supabase
    .from("models")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) throw error;
  return data || [];
}
