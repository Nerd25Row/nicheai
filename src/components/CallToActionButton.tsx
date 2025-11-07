import { Button } from "./ui/button";

const CallToActionButton = () => {
  return (
    <div className="w-full lg:max-w-[1120px] min-h-[124px] rounded-[20px] lg:rounded-[24px] bg-black shadow-[0px_32px_40px_-12px_rgba(0,0,0,0.25)]">
      {/* Gradient Bar */}
      <div className="flex items-center justify-center w-full min-h-[124px] rounded-[20px] lg:rounded-[24px] bg-gradient-to-r from-[#00FFFF] to-[#07EC17] p-3 sm:p-4">
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between w-full lg:max-w-[1056px] gap-4">
          {/* Text */}
          <div className="flex flex-col items-center lg:items-start w-full lg:max-w-[442.3125px] gap-1.5">
            <div className="w-full text-center lg:text-left">
              <span className="font-inter font-bold text-lg lg:text-xl leading-tight text-[#1D2027]">
                Need help choosing the right plan?
              </span>
            </div>
            <div className="w-full opacity-80 text-center lg:text-left">
              <span className="font-inter font-normal text-sm lg:text-base leading-5 text-[#1D2027]">
                Contact our sales team for personalized recommendations
              </span>
            </div>
          </div>

          {/* Button */}
          <Button
            className="
              w-full sm:w-auto h-[48px]
              px-6 gap-2 rounded-lg bg-white
              shadow-[0px_-20px_20px_0px_rgba(1,255,1,0.24)]
              text-black font-medium
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1D2027] focus-visible:ring-offset-white
            "
            aria-label="Contact Sales"
          >
            <span className="font-inter font-bold text-base leading-6 text-[#1D2027]">
              Contact Sales
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CallToActionButton;
