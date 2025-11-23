import { supabase } from "../../lib/supabase";
import { getUser } from "../auth/authService";

export async function getAllCompanyTeamMembers() {
  const user = await getUser();
  if (!user) {
    throw new Error("User not found. Please log in.");
  }

  // Get user's company
  const { data: company, error: companyError } = await supabase
    .from("companies")
    .select("id")
    .eq("owner_id", user.id)
    .maybeSingle();

  if (companyError) throw companyError;
  if (!company) {
    return []; // Return empty array if no company
  }

  // Get all team members for the company
  const { data, error } = await supabase
    .from("company_team_members")
    .select("*")
    .eq("company_id", company.id);

  if (error) throw error;
  return data || [];
}

export interface InviteLinkResponse {
  token: string;
  inviteUrl: string;
}

export async function createInviteLink(): Promise<InviteLinkResponse> {
  const user = await getUser();
  if (!user) {
    throw new Error("User not found. Please log in.");
  }

  // Get user's company
  const { data: company, error: companyError } = await supabase
    .from("companies")
    .select("id")
    .eq("owner_id", user.id)
    .maybeSingle();

  if (companyError) throw companyError;
  if (!company) {
    throw new Error("Company not found. Please create a company first.");
  }

  // Get business account ID
  const { data: account, error: accountError } = await supabase
    .from("accounts")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (accountError) throw accountError;
  if (!account) {
    throw new Error("Business account not found.");
  }

  // Create invitation with placeholder email (for general invite links)
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30); // 30 days for invite links

  const placeholderEmail = `invite-link+${
    company.id
  }+${Date.now()}@system.internal`;

  const { data: invitation, error: inviteError } = await supabase
    .from("invitations")
    .insert({
      company_id: company.id,
      email: placeholderEmail,
      role: "member",
      invited_by: account.id,
      expires_at: expiresAt.toISOString(),
      status: "pending",
    })
    .select("token")
    .single();

  if (inviteError) throw inviteError;

  const inviteUrl = `${window.location.origin}/auth/invite/${invitation.token}`;

  return {
    token: invitation.token,
    inviteUrl,
  };
}

export interface SendInvitationParams {
  email: string;
  invite_link: string;
}

export async function sendInvitationLink({
  email,
  invite_link,
}: SendInvitationParams): Promise<void> {
  const user = await getUser();
  if (!user) {
    throw new Error("User not found. Please log in.");
  }

  // SEND EMAIL
  const { data, error } = await supabase.functions.invoke("sendInviteLink", {
    body: {
      email,
      invite_link,
    },
  });
  if (error) throw error;
  return data;
}
