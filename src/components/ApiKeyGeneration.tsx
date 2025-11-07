import { AlertDialog, AlertDialogContent } from "./ui/alert-dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Copy, X } from "lucide-react";

const ApiKeyGeneration = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className="
          w-[92vw] max-w-[545px] sm:w-[545px]
          h-auto sm:h-[476px]
          opacity-100
          rounded-2xl
          border border-[#393B41]
          bg-[#1D2027]
          shadow-[0px_15px_70px_-4px_rgba(16,24,40,0.1)]
          pt-8 pr-6 pb-6 pl-6 sm:pt-12 sm:pr-12 sm:pb-8 sm:pl-12
        "
      >
        {/* Close Button */}
        <Button
          onClick={() => onOpenChange(false)}
          className="
            absolute top-4 right-4
            text-[#B6BCCA]
            hover:text-white
            transition-colors
          "
        >
          <X className="w-5 h-5" />
        </Button>
        {/* Wrapper */}
        <div
          className="
            flex flex-col
            w-full sm:w-[449px]
            h-auto sm:h-[396px]
            opacity-100
            gap-6 sm:gap-8
            mx-auto
          "
        >
          {/* Heading */}
          <div
            className="
              flex flex-col items-center
              w-full sm:w-[449px]
              h-auto sm:h-[76px]
              opacity-100
              gap-3 sm:gap-4
              text-center
            "
          >
            <span className="w-full sm:w-[204px] h-[36px] opacity-100 font-inter font-bold text-[28px] leading-[36px] tracking-[-2%] text-center text-white">
              Welcome back!
            </span>
            <span className="w-full sm:w-[449px] h-auto opacity-100 font-inter font-normal text-base leading-6 tracking-[0%] text-center text-[#B6BCCA]">
              Your account is ready. Here's your API key to start testing.
            </span>
          </div>

          {/* API Key Row */}
          <div
            className="
              flex flex-col sm:flex-col items-center
              w-full sm:w-[449px]
              h-auto sm:h-[84px]
              opacity-100
              gap-3
            "
          >
            <span className="w-full sm:w-[449px] h-[24px] opacity-100 font-inter font-medium text-base leading-6 tracking-[0%] align-middle text-[#CACFDA]">
              Your API Key
            </span>

            <div
              className="
                flex flex-col sm:flex-row
                items-stretch sm:items-center
                w-full sm:w-[449px]
                h-auto sm:h-[48px]
                opacity-100
                gap-3
              "
            >
              <Input
                type="text"
                placeholder="sk-1234567890abcdef1234567890abcdef"
                className="
                  w-full sm:w-[283px]
                  h-[48px]
                  opacity-100 gap-2
                  bg-[#2E3137] border-none
                  text-white placeholder:text-white
                  focus:outline-none
                "
                readOnly
              />

              <Button
                className="
                  flex items-center justify-center
                  w-full sm:w-[154px]
                  h-[48px]
                  opacity-100 gap-2
                  bg-[#2E3137]
                  border border-[#4D5057]
                  shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]
                  text-white
                  hover:bg-[#2E3137]
                "
              >
                <Copy className="w-[16.25px] h-[17.92px] opacity-100 text-white" />
                <span className="w-auto sm:w-[78px] h-[24px] opacity-100 font-inter font-bold text-base leading-6 tracking-[0%] align-middle text-white">
                  Copy Link
                </span>
              </Button>
            </div>
          </div>

          {/* Info Row */}
          <div
            className="
              flex items-start sm:items-center
              w-full sm:w-[449px]
              h-auto sm:h-[40px]
              opacity-100 gap-3 rounded-md
            "
          >
            <div className="flex items-center justify-center w-4 h-[18px] opacity-100">
              <img
                src="/assets/images/i.svg"
                className="w-4 h-4 opacity-100 object-cover"
                alt="info"
              />
            </div>
            <span className="w-auto sm:w-[421px] h-auto sm:h-[40px] opacity-100 font-inter font-normal text-sm leading-5 tracking-[1%] text-[#B6BCCA]">
              You have 100 free images to start testing. No credit card
              required.
            </span>
          </div>

          {/* Buttons */}
          <div
            className="
              flex flex-col items-center
              w-full sm:w-[449px]
              h-auto sm:h-[100px]
              opacity-100 gap-3
            "
          >
            <Button
              className="
                w-full sm:w-[449px]
                h-[48px]
                opacity-100 gap-2
                rounded-lg px-6 py-3
                bg-[#00FFFF]
                shadow-[0px_-20px_20px_0px_rgba(1,255,1,0.24)]
                text-black font-semibold
                hover:bg-[#00FFFF]
              "
            >
              <span className="w-auto sm:w-[99px] h-[24px] opacity-100 font-inter font-bold text-base leading-6 tracking-[0%] align-middle text-[#1D2027]">
                Start testing
              </span>
            </Button>

            <Button
              className="
                w-full sm:w-[201px]
                h-[40px]
                opacity-100 gap-2
                rounded-md px-1 py-2
                bg-transparent border-none
                text-white
                hover:bg-transparent
              "
              variant="ghost"
            >
              <span className="w-auto sm:w-[193px] h-[24px] opacity-100 font-inter font-bold text-base leading-6 tracking-[0%] align-middle text-[#72E6E5]">
                View Api documentation
              </span>
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ApiKeyGeneration;
