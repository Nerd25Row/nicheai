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
  return (
    <div className="flex w-full h-[43px] rotate-0 opacity-100 gap-8 border-b border-b-[#4D5057]">
      <Button
        className={cn(
          `w-[119.078125px] h-[43px] rotate-0 opacity-100 bg-[#1E2128]`,
          `${
            currentActiveTabe === "user-settings"
              ? "border-b-2 border-b-[#00FFFF]"
              : "border-b border-b-[#4D5057]"
          }`
        )}
        onClick={() => setCurrentActiveTab("user-settings")}
      >
        <span
          className={cn(
            `w-[109px] h-[24px] rotate-0 opacity-100 top-[2px] left-[8px] font-inter font-medium text-base leading-[100%] tracking-[0%] text-center`,
            `${
              currentActiveTabe === "user-settings"
                ? " text-white"
                : "text-[#B6BCCA]"
            }`
          )}
        >
          User Settings
        </span>
      </Button>
      <Button
        className={cn(
          `w-[154.59375px] h-[43px]  bg-[#1E2128] rotate-0 opacity-100`,
          `${
            currentActiveTabe === "company-settings"
              ? "border-b-2 border-b-[#00FFFF]"
              : "border-b border-b-[#4D5057]"
          }`
        )}
        onClick={() => setCurrentActiveTab("company-settings")}
      >
        {/* NEXT TO DO */}
        <span
          className={cn(
            `w-[144px] h-[24px] rotate-0 opacity-100 top-[3px] left-[8px] font-inter font-normal text-base leading-[100%] tracking-[0%] text-center`,
            `${
              currentActiveTabe === "company-settings"
                ? "text-white"
                : "text-[#B6BCCA]"
            }`
          )}
        >
          Company Settings
        </span>
      </Button>
    </div>
  );
};
export default SettingsTabs;
