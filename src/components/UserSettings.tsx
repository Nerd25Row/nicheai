import { useState } from "react";
import ApiKeyManagement from "./ApiKeyManagement";
import PasswordManagement from "./PasswordManagement";
import Preferences from "./Preferences";
import ProfileInformation from "./ProfileInformation";
import ApiKeyGeneration from "./ApiKeyGeneration";

const UserSettings = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col items-center w-full min-h-[1486px] rotate-0 opacity-100 gap-8 px-4 sm:px-6 lg:px-8">
      {/* Profile Info */}
      <ProfileInformation />
      <PasswordManagement />
      <ApiKeyManagement setOpen={setOpen} />
      <Preferences />
      <ApiKeyGeneration open={open} onOpenChange={setOpen} />
    </div>
  );
};

export default UserSettings;
