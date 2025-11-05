import { supabase } from "../../lib/supabase";
import { getUser } from "../auth/authService";

export type Company = {
  id: string;
  name: string;
  domain: string | null;
  address: string | null;
  owner_id: string;
  created_at: string;
  updated_at: string;
};

export async function getCompanyInformation(): Promise<Company | null> {
  const user = await getUser();
  if (!user) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .eq("owner_id", user.id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateCompanyInformation({
  name,
  domain,
  address,
}: {
  name: string;
  domain: string;
  address: string;
}): Promise<Company> {
  const user = await getUser();
  if (!user) {
    throw new Error("User not found. Please log in.");
  }

  // Normalize empty strings to null
  const normalizedDomain = domain?.trim() || null;
  const normalizedAddress = address?.trim() || null;

  const { data, error } = await supabase
    .from("companies")
    .update({
      name,
      domain: normalizedDomain,
      address: normalizedAddress,
    })
    .eq("owner_id", user.id)
    .select()
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error("Failed to update company information");
  }

  return data;
}
export async function getUserCompanyId(userId: string): Promise<string> {
  // First, check if user is a company owner
  const { data: ownerCompany, error: ownerError } = await supabase
    .from("companies")
    .select("id")
    .eq("owner_id", userId)
    .maybeSingle();

  if (ownerError) throw ownerError;
  if (ownerCompany) return ownerCompany.id;

  // If not owner, check if user is a team member
  const { data: teamMember, error: teamError } = await supabase
    .from("company_team_members")
    .select("company_id")
    .eq("business_account_id", userId)
    .eq("status", "active")
    .maybeSingle();

  if (teamError) throw teamError;
  if (teamMember) return teamMember.company_id;

  throw new Error("User is not associated with any company");
}