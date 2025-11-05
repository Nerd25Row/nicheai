import { useState } from "react";
import SettingsTabs from "./layouts/SettingsTabs";
import CompanySettings from "./CompanySettings";
import UserSettings from "./UserSettings";

const Settings = () => {
  const [currentActiveTabe, setCurrentActiveTab] =
    useState<string>("user-settings");
  return (
    <div className="flex flex-col w-full min-h-screen rotate-0 opacity-100 pt-2 pr-8 pb-12 pl-8 gap-8 bg-[#1E2128]">
      {/* Sticky Settings Tabs */}
      <div className="sticky top-0 z-50 bg-[#1E2128] pt-2 pb-2">
        <SettingsTabs
          currentActiveTabe={currentActiveTabe}
          setCurrentActiveTab={setCurrentActiveTab}
        />
      </div>
      {/* Scrollable Content */}
      <div className="flex-1">
        {currentActiveTabe === "user-settings" ? (
          <UserSettings />
        ) : (
          <CompanySettings />
        )}
      </div>
    </div>
  );
};
export default Settings;
