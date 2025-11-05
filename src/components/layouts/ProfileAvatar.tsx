import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useLoggedInUserProfile } from "../../features/user/useUserQuery";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import AvatarUploadDialog from "../AvatarUploadDialog";

const ProfileAvatar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data: userProfile, isLoading, error } = useLoggedInUserProfile();

  const avatarUrl =
    userProfile?.avatar_url || "/assets/images/profile_avatar.png";
  const altText = userProfile
    ? `${userProfile.first_name || ""} ${userProfile.last_name || ""}`.trim() ||
      userProfile.email
    : "Profile avatar";

  if (error) {
    console.error("Error fetching user profile:", error);
  }

  const handleAvatarClick = () => {
    setIsDialogOpen(true);
  };

  const handleUploadSuccess = (url: string) => {
    // Invalidate and refetch user profile to show updated avatar
    queryClient.invalidateQueries({ queryKey: ["userProfile"] });
  };

  return (
    <>
      <div className="flex items-center w-auto lg:w-[68px] h-[44px] gap-2">
        {/* Avatar */}
        <div
          className="cursor-pointer w-8 h-8 lg:w-11 lg:h-11 transition-opacity hover:opacity-80"
          onClick={handleAvatarClick}
        >
          {isLoading ? (
            <div className="rounded-full w-full h-full bg-[#4D5057] animate-pulse" />
          ) : (
            <img
              src={avatarUrl}
              alt={altText}
              className="rounded-full w-full h-full object-cover"
              onError={(e) => {
                // Fallback to default avatar if image fails to load
                e.currentTarget.src = "/assets/images/profile_avatar.png";
              }}
            />
          )}
        </div>
        {/* Chevron */}
        <div className="flex items-center justify-center w-4 h-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <ChevronDown className="w-4 h-4 text-[#B6BCCA]" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                {`${userProfile?.first_name}` + `${userProfile?.last_name}`}
              </DropdownMenuItem>
              <DropdownMenuItem>{userProfile?.email}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <AvatarUploadDialog
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        currentAvatarUrl={userProfile?.avatar_url}
        onUploadSuccess={handleUploadSuccess}
      />
    </>
  );
};

export default ProfileAvatar;
