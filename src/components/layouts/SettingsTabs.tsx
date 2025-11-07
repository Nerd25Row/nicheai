import type { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

interface SettingsTabProps {
  currentActiveTabe: string;
  setCurrentActiveTab: Dispatch<SetStateAction<string>>;
}

const SettingsTabs = ({
  currentActiveTabe,
  setCurrentActiveTab,
}: SettingsTabProps) => {
  const baseTab =
    "shrink-0 rounded-none bg-[#1E2128] px-3 sm:px-4 py-2 h-[43px] transition-colors";
  const baseText =
    "font-inter text-sm sm:text-base leading-[100%] tracking-[0%] text-center whitespace-nowrap";

  return (
    <div className="w-full border-b border-b-[#4D5057]">
      <div
        className="
          flex items-end gap-3 sm:gap-8
          overflow-x-auto no-scrollbar
          [scrollbar-width:none] [-ms-overflow-style:none]
          snap-x snap-mandatory
        "
      >
        {/* User Settings */}
        <Button
          className={cn(
            baseTab,
            "snap-start",
            currentActiveTabe === "user-settings"
              ? "border-b-2 border-b-[#00FFFF]"
              : "border-b border-b-[#4D5057]"
          )}
          onClick={() => setCurrentActiveTab("user-settings")}
        >
          <span
            className={cn(
              baseText,
              currentActiveTabe === "user-settings"
                ? "text-white"
                : "text-[#B6BCCA]"
            )}
          >
            User Settings
          </span>
        </Button>

        {/* Company Settings */}
        <Button
          className={cn(
            baseTab,
            "snap-start",
            currentActiveTabe === "company-settings"
              ? "border-b-2 border-b-[#00FFFF]"
              : "border-b border-b-[#4D5057]"
          )}
          onClick={() => setCurrentActiveTab("company-settings")}
        >
          <span
            className={cn(
              baseText,
              currentActiveTabe === "company-settings"
                ? "text-white"
                : "text-[#B6BCCA]"
            )}
          >
            Company Settings
          </span>
        </Button>
      </div>
    </div>
  );
};

export default SettingsTabs;
