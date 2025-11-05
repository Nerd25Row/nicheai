import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import DashboardHeaderInfo from "./DashboardHeaderIntro";
import MobileNavigation from "./MobileNavigation";
import ProfileAvatar from "./ProfileAvatar";

const DashboardHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 z-50 w-full h-[112px] rotate-0 opacity-100 gap-6 bg-[#1E2128] p-4 lg:p-10">
      <div className="flex items-center justify-between w-full h-[64px] rotate-0 opacity-100 gap-4 lg:gap-16">
        {/* Mobile Navigation + INTRO */}
        <div className="flex items-center gap-4 min-w-0">
          <div className="lg:hidden">
            <MobileNavigation />
          </div>
          <DashboardHeaderInfo />
        </div>
        {/* PROFILE SELECTION*/}
        <div className="flex items-center w-auto lg:w-[368.52px] h-[48px] rotate-0 opacity-100 gap-4 lg:gap-8">
          {/* Desktop: Full profile section */}
          <div className="hidden lg:flex items-center w-[268.52px] h-[48px] rotate-0 opacity-100 gap-6">
            {/* image quota */}
            <div className="flex flex-col gap-2 w-[86.52px] h-[48px] rotate-0 opacity-100 bg-[#1E2128] ">
              {/* images used */}
              <div className="w-[86.52px] h-[20px] rotate-0 opacity-100 bg-[#1E2128] ">
                <span className="w-[87px] h-[20px] rotate-0 opacity-100 top-[1px] font-inter font-normal text-sm leading-[100%] tracking-normal text-[#B6BCCA]">
                  Images Used
                </span>
              </div>
              <div className="w-[69.61px] h-[28px] rotate-0 opacity-100 bg-[#1E2128] ">
                <span className="w-[71px] h-[28px] rotate-0 opacity-100 top-[3px] font-inter font-semibold text-lg leading-[100%] tracking-normal text-white">
                  47 / 100
                </span>
              </div>
            </div>
            <div className="w-[1px] h-[32px] rotate-0 opacity-100 bg-[#4D5057]" />
            <Button
              className="cursor-pointer w-[133px] h-[40px] rotate-0 opacity-100 gap-2 rounded-lg pr-4 pl-4 bg-[#00FFFF] shadow-[0px_-20px_20px_0px_#01FF013D_inset]"
              onClick={() => navigate("/dashboard/upgrade")}
            >
              <span className="w-[105px] h-[24px] rotate-0 opacity-100 font-inter font-bold text-base leading-6 tracking-normal align-middle text-[#1D2027]">
                Upgrade Plan
              </span>
            </Button>
          </div>
          {/* Mobile: Compact profile section */}
          <div className="flex lg:hidden items-center gap-2">
            <Button
              className="cursor-pointer h-[32px] px-3 text-sm bg-[#00FFFF] shadow-[0px_-20px_20px_0px_#01FF013D_inset]"
              onClick={() => navigate("/dashboard/upgrade")}
            >
              <span className="font-inter font-bold text-sm text-[#1D2027]">
                Upgrade
              </span>
            </Button>
          </div>
          <ProfileAvatar />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
