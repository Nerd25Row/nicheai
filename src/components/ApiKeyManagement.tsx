import { Copy, RefreshCw, Trash } from "lucide-react";
import { Button } from "./ui/button";
import type { Dispatch, SetStateAction } from "react";

const ApiKeyManagement = ({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) => {
  return (
    <div className="flex flex-col items-center justify-between w-full md:max-w-[864px] md:min-h-[318px] rotate-0 opacity-100 rounded-[20px] border border-[#4D5057] bg-gray-200 dark:bg-[#2E3137] p-4">
      <div className="flex flex-col items-center md:flex-row justify-between w-full md:min-h-[40px] rotate-0 opacity-100 mb-4">
        <span className="w-[77px] h-[28px] rotate-0 opacity-100 font-inter font-semibold text-lg leading-[100%] tracking-[0%] dark:text-white">
          API Keys
        </span>
        <Button
          className="w-[176px] h-[40px] rotate-0 opacity-100 px-4 gap-2 rounded-lg border border-[#4D5057] bg-gray-200 hover:bg-gray-300 dark:bg-[#2E3137] dark:hover:bg-[#4D5057]/50 shadow-[0px_1px_2px_0px_#1018280D]"
          onClick={() => setOpen(true)}
        >

          <span className="w-[144px] h-[24px] rotate-0 opacity-100 font-inter font-bold text-base leading-6 tracking-[0%] align-middle text-black dark:text-white">
            Generate New Key
          </span>
        </Button>
      </div>
      <div className="flex flex-col w-full min-h-[204px] rotate-0 opacity-100 justify-between gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full min-h-[94px] rotate-0 opacity-100 p-4 rounded-xl bg-gray-50 dark:bg-[#4D5057] gap-4">
          {/*  */}
          <div className="w-full sm:w-auto h-[60px] rotate-0 opacity-100">
            <div className="w-full sm:w-[193.234375px] h-[24px] rotate-0 opacity-100">
              <span className="w-[152px] h-[24px] rotate-0 opacity-100 top-[2px] font-inter font-medium text-base leading-[100%] tracking-[0%] dark:text-white">
                Production API Key
              </span>
            </div>
            <div className="w-full sm:w-[193.234375px] h-[20px] rotate-0 opacity-100 top-[24px]">
              <span className="w-full sm:w-[194px] h-[20px] rotate-0 opacity-100 top-[2px] font-inter font-normal text-sm leading-[100%] tracking-[0%] text-gray-600 dark:text-[#B6BCCA]">
                sk-proj-abc123...xyz789
              </span>
            </div>
            <div className="w-full sm:w-[193.234375px] h-[16px] rotate-0 opacity-100 top-[44px]">
              <span className="w-[129px] h-[16px] rotate-0 opacity-100 font-inter font-normal text-xs leading-[100%] tracking-[0%] text-gray-600 dark:text-[#B6BCCA]">
                Created: Jan 15, 2025
              </span>
            </div>
          </div>
          {/*  */}
          <div className="flex flex-wrap items-center w-full sm:w-[194px] h-[40px] rotate-0 opacity-100 gap-2">
            <Button className="flex items-center md:w-[98px] md:h-[40px] rotate-0 opacity-100 pr-4 pl-4 gap-2 rounded-lg border border-[#4D5057] bg-gray-200  hover:bg-gray-300 dark:bg-[#2E3137] dark:hover:bg-black  shadow-[0px_1px_2px_0px_#1018280D]">
              <Copy className="md:w-[13px] md:h-[14.333px] rotate-0 opacity-100 top-[0.83px] left-[1.5px] text-black dark:text-white" />
              <span className="hidden md:flex w-[42px] h-[24px] rotate-0 opacity-100 font-inter font-bold text-base leading-6 tracking-[0%] align-middle text-black dark:text-white">
                Copy
              </span>
            </Button>
            <Button className="md:w-[40px] md:h-[40px] rotate-0 opacity-100 pr-4 pl-4 gap-2 rounded-lg border border-[#4D5057] bg-gray-200 hover:bg-gray-300 dark:bg-[#2E3137] dark:hover:bg-black shadow-[0px_1px_2px_0px_#1018280D]">
              <RefreshCw className="w-[14.333px] h-[13px] rotate-0 opacity-100 top-[1.5px] left-[0.83px] text-black dark:text-white" />
            </Button>
            <Button className="md:w-[40px] md:h-[40px] rotate-0 opacity-100 pr-4 pl-4 gap-2 rounded-lg border border-[#4D5057] bg-gray-200 hover:bg-gray-300 dark:bg-[#2E3137] dark:hover:bg-black shadow-[0px_1px_2px_0px_#1018280D]">
              {/* NEXT TO DO */}
              <Trash className="w-[12.333px] h-[13px] rotate-0 opacity-100 top-[1.5px] left-[1.83px] text-black dark:text-white" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full min-h-[94px] rotate-0 opacity-100 p-4 rounded-xl bg-gray-50 dark:bg-[#4D5057] gap-4">
          {/*  */}
          <div className="w-full sm:w-auto h-[60px] rotate-0 opacity-100">
            <div className="w-full sm:w-[193.234375px] h-[24px] rotate-0 opacity-100">
              <span className="w-[152px] h-[24px] rotate-0 opacity-100 top-[2px] font-inter font-medium text-base leading-[100%] tracking-[0%] text:text-white">
                Development API Key

              </span>
            </div>
            <div className="w-full sm:w-[193.234375px] h-[20px] rotate-0 opacity-100 top-[24px]">
              <span className="w-full sm:w-[194px] h-[20px] rotate-0 opacity-100 top-[2px] font-inter font-normal text-sm leading-[100%] tracking-[0%] text-gray-600 text:text-[#B6BCCA]">
                sk-proj-abc123...xyz789
              </span>
            </div>
            <div className="w-full sm:w-[193.234375px] h-[16px] rotate-0 opacity-100 top-[44px]">
              <span className="w-[129px] h-[16px] rotate-0 opacity-100 font-inter font-normal text-xs leading-[100%] tracking-[0%] text-gray-600 dark:text-[#B6BCCA]">
                Created: Jan 15, 2025
              </span>
            </div>
          </div>
          {/*  */}
          <div className="flex flex-wrap items-center w-full sm:w-[194px] h-[40px] rotate-0 opacity-100 gap-2">
            <Button className="flex items-center md:w-[98px] md:h-[40px] rotate-0 opacity-100 pr-4 pl-4 gap-2 rounded-lg border border-[#4D5057] bg-gray-200 hover:bg-gray-300 dark:bg-[#2E3137] dark:hover:bg-black shadow-[0px_1px_2px_0px_#1018280D]">
              <Copy className="w-[13px] h-[14.333px] rotate-0 opacity-100 top-[0.83px] left-[1.5px] text-black dark:text-white" />
              <span className="hidden md:flex w-[42px] h-[24px] rotate-0 opacity-100 font-inter font-bold text-base leading-6 tracking-[0%] align-middle text-black dark:text-white">
                Copy
              </span>
            </Button>
            <Button className="md:w-[40px] md:h-[40px] rotate-0 opacity-100 pr-4 pl-4 gap-2 rounded-lg border border-[#4D5057] bg-gray-200 hover:bg-gray-300 dark:bg-[#2E3137] dark:hover:bg-black  shadow-[0px_1px_2px_0px_#1018280D]">
              <RefreshCw className="w-[14.333px] h-[13px] rotate-0 opacity-100 top-[1.5px] left-[0.83px] text-black dark:text-white" />
            </Button>
            <Button className="md:w-[40px] md:h-[40px] rotate-0 opacity-100 pr-4 pl-4 gap-2 rounded-lg border border-[#4D5057] bg-gray-200 hover:bg-gray-300 dark:bg-[#2E3137] dark:hover:bg-black  shadow-[0px_1px_2px_0px_#1018280D]">
              {/* NEXT TO DO */}
              <Trash className="w-[12.333px] h-[13px] rotate-0 opacity-100 top-[1.5px] left-[1.83px] text-black dark:text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ApiKeyManagement;
