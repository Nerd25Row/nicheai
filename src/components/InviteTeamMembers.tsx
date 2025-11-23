import type { Dispatch, SetStateAction } from "react";
import { AlertDialog, AlertDialogContent } from "./ui/alert-dialog";
import { X, Copy, Send, Loader2, CheckCircle2 } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useSendInvitationMutation } from "../features/companyTeamMember/useSendInvitationMutation";
import { useCompanyTeamMembersStore } from "../store/companyTeamMembers/companyTeamMembersStore";
import { Alert, AlertDescription } from "./ui/alert";

const InviteTeamMembers = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    inviteLink,
    email,
    copied,
    error,
    success,
    setEmail,
    setCopied,
    setError,
    setSuccess,
  } = useCompanyTeamMembersStore();

  const sendInvitationMutation = useSendInvitationMutation();

  const handleCopyLink = async () => {
    if (!inviteLink) {
      setError("Invite link not available");
      return;
    }

    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setError(null);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError("Failed to copy link to clipboard");
    }
  };

  const handleSendInvite = async () => {
    if (!email.trim()) {
      setError("Please enter an email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address");
      return;
    }

    if (!inviteLink) {
      setError(
        "Invite link not available. Please wait for the link to be generated."
      );
      return;
    }

    setError(null);
    setSuccess(null);

    try {
      await sendInvitationMutation.mutateAsync({
        email: email.trim(),
        invite_link: inviteLink,
      });

      setSuccess(`Invitation sent successfully to ${email.trim()}`);
      setEmail("");

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to send invitation"
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendInvite();
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent
        className="
          flex flex-col items-center
          w-[calc(100vw-2rem)] sm:w-[520px] md:w-[540px] lg:w-[540px]
          max-w-[540px]
          rounded-2xl border border-[#393B41] bg-gray-200 dark:bg-[#1D2027]
          shadow-[0px_15px_70px_-4px_#1018281A]
          p-0
        "
      >
        {/* Header */}
        <div className="w-full py-4 px-4 sm:px-6 border-b border-b-[#4D5057]">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-[20px] leading-[28px] tracking-[-0.01em] text-black dark:text-[#FFFFFF]">
              Invite Team Members
            </h2>
            <Button
              onClick={() => setOpen(false)}
              className="
              cursor-pointer
            absolute top-4 right-4
            text-black
            bg-gray-200
            hover:bg-gray-300
            dark:text-[#B6BCCA]
            dark:hover:text-white
            transition-colors
          "
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Body */}
        <div className="w-full p-4 sm:p-6 space-y-6">
          <span className="block text-sm leading-5 tracking-[0.01em] text-gray-600 dark:text-[#CACFDA]">
            Add team members to your organization by sending them an invite link
            or email.
          </span>

          {/* Error/Success Messages */}
          {error && (
            <Alert
              variant="destructive"
              className="bg-red-500/10 border-red-500/50"
            >
              <AlertDescription className="text-red-400">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-500/10 border-green-500/50">
              <AlertDescription className="text-green-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                {success}
              </AlertDescription>
            </Alert>
          )}

          {/* 1. Copy Link */}
          <div className="space-y-3">
            <span className="block font-medium text-sm leading-5 tracking-[0.01em] text-black dark:text-[#FFFFFF]">
              1. Copy Invite Link
            </span>

            {/* On small screens stack; on md+ put input and button in a row */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2">
              <Input
                className="
                  w-full h-[48px]
                  bg-white
                  font-normal text-base leading-6 text-black dark:text-[#FFFFFF]
                  placeholder:text-black
                  dark:placeholder:text-[#FFFFFF]
                "
                placeholder="https://app.yourcompany.com/invite/abc123xyz"
                value={inviteLink || ""}
                readOnly
                disabled={!inviteLink}
              />
              <Button
                onClick={handleCopyLink}
                disabled={!inviteLink || copied}
                className="
                  w-full md:w-[154px] h-[48px] px-6 gap-2
                  rounded-lg border border-[#4D5057] bg-gray-200 hover:bg-gray-300 dark:bg-[#2E3137]
                  shadow-[0px_1px_2px_0px_#1018280D]
                  flex items-center justify-center
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-[16.25px] h-[17.92px] text-green-400" />
                    <span className="font-bold text-base leading-6 text-black dark:text-[#FFFFFF]">
                      Copied!
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-[16.25px] h-[17.92px] text-black dark:text-[#FFFFFF]" />
                    <span className="font-bold text-base leading-6 text-black dark:text-[#FFFFFF]">
                      Copy Link
                    </span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* 2. Invite by Email */}
          <div className="space-y-4">
            <div className="space-y-2">
              <span className="block font-medium text-sm leading-5 tracking-[0.01em] text-black dark:text-[#FFFFFF]">
                2. Invite by Email
              </span>
              <Input
                className="
                  w-full h-[48px]
                  bg-white
                  font-normal text-base leading-6 text-black dark:text-[#FFFFFF]
                  placeholder:text-black
                  dark:placeholder:text-[#B6BCCA]
                "
                placeholder="Enter email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={sendInvitationMutation.isPending}
              />
            </div>

            {/* Send button is full-width on small; fixed width feel on md+ */}
            <Button
              onClick={handleSendInvite}
              disabled={
                sendInvitationMutation.isPending || !email.trim() || !inviteLink
              }
              className="
                group
                w-full md:w-full h-[48px] px-6 gap-2
                rounded-lg 
                bg-[#00FFFF]
                shadow-[0px_-20px_20px_0px_#01FF013D_inset]
                flex items-center justify-center
                transition-all duration-200
                hover:brightness-110 hover:shadow-[0px_-22px_22px_0px_#01FF013D_inset]
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {sendInvitationMutation.isPending ? (
                <>
                  <Loader2 className="w-[17.5px] h-[17.5px] text-[#1D2027] animate-spin" />
                  <span className="font-bold text-base leading-6 text-[#1D2027]">
                    Sending...
                  </span>
                </>
              ) : (
                <>
                  <Send
                    className="
                      w-[17.5px] h-[17.5px]
                      text-[#1D2027]
                      group-hover:text-white
                      transition-colors duration-200
                    "
                  />
                  <span
                    className="
                      font-bold text-base leading-6
                      text-[#1D2027]
                      group-hover:text-white
                      transition-colors duration-200
                    "
                  >
                    Send Invite
                  </span>
                </>
              )}
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default InviteTeamMembers;
