import { ChevronDown } from "lucide-react";

const ProfileAvatar = () => {
  return (
    <div className="flex items-center w-auto lg:w-[68px] h-[44px] gap-2">
      {/* Avatar */}
      <div className="w-8 h-8 lg:w-11 lg:h-11">
        <img
          src="/assets/images/profile_avatar.png"
          alt="Profile avatar"
          className="rounded-full w-full h-full object-cover"
        />
      </div>
      {/* Chevron */}
      <div className="hidden lg:flex items-center justify-center w-4 h-4">
        <ChevronDown className="w-4 h-4 text-[#B6BCCA]" />
      </div>
    </div>
  );
};

export default ProfileAvatar;
