import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import MobileNavigation from "./MobileNavigation";

const DashboardHeader = () => {
  return (
    <div className="sticky top-0 z-50 w-full h-[112px] rotate-0 opacity-100 gap-6 bg-[#1E2128] p-4 lg:p-10">
      <div className="flex items-center justify-between w-full h-[64px] rotate-0 opacity-100 gap-4 lg:gap-16">
        {/* Mobile Navigation + INTRO */}
        <div className="flex items-center gap-4">
          {/* Mobile Navigation - only visible on small screens */}
          <div className="lg:hidden">
            <MobileNavigation />
          </div>
          
          {/* INTRO */}
          <div className="flex flex-col w-auto h-[64px] rotate-0 opacity-100 gap-2">
            <h1 className="w-auto h-[32px] rotate-0 opacity-100 font-inter font-bold text-xl lg:text-2xl leading-8 tracking-[-0.01em] text-white">
              AI Image Processing Dashboard
            </h1>
            <p className="w-auto h-[24px] rotate-0 opacity-100 font-inter font-normal text-sm lg:text-base leading-6 tracking-normal text-[#B6BCCA] hidden sm:block">
              Upload and process your images with advanced AI models
            </p>
          </div>
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
            <Button className="w-[133px] h-[40px] rotate-0 opacity-100 gap-2 rounded-lg pr-4 pl-4 bg-[#00FFFF] shadow-[0px_-20px_20px_0px_#01FF013D_inset]">
              <span className="w-[105px] h-[24px] rotate-0 opacity-100 font-inter font-bold text-base leading-6 tracking-normal align-middle text-[#1D2027]">
                Upgrade Plan
              </span>
            </Button>
          </div>
          
          {/* Mobile: Compact profile section */}
          <div className="flex lg:hidden items-center gap-2">
            <Button className="h-[32px] px-3 text-sm bg-[#00FFFF] shadow-[0px_-20px_20px_0px_#01FF013D_inset]">
              <span className="font-inter font-bold text-sm text-[#1D2027]">
                Upgrade
              </span>
            </Button>
          </div>
          
          <div className="flex items-center w-auto lg:w-[68px] h-[44px] rotate-0 opacity-100 gap-2">
            {/* avatar */}
            <div className="w-8 h-8 lg:w-11 lg:h-11 rotate-0 opacity-100">
              <img
                src="/assets/images/profile_avatar.png"
                className="rounded-full w-full h-full object-cover"
              />
            </div>
            <div className="w-4 h-4 rotate-0 opacity-100 relative hidden lg:block">
              <ChevronDown className="w-[10.56px] h-[4.73px] rotate-0 opacity-100 absolute top-[5.97px] left-[2.72px] border-[1.5px] border-[#B6BCCA] text-[#B6BCCA]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
