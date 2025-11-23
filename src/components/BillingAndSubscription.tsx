import type { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";

const BillingAndSubscription = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div
      className="flex flex-col items-center justify-center w-full lg:max-w-[864px] min-h-[273px] rounded-[20px] border border-[#4D5057] bg-gray-200 dark:bg-[#2E3137] relative
                    p-4 sm:p-5 md:p-6 gap-4 sm:gap-5"
    >
      {/* Title */}
      <div className="w-full lg:max-w-[814px] min-h-[28px]">
        <span className="lg:max-w-[188px] min-h-[28px]  font-inter font-medium text-lg leading-[100%] text-black dark:text-white">
          Billing & Subscription
        </span>
      </div>

      {/* Current plan card */}
      <div
        className="w-full lg:max-w-[814px] min-h-[106px] px-4 py-4 rounded-xl bg-gray-50 dark:bg-[#4D5057] flex flex-col lg:flex-row items-stretch lg:items-center justify-between
                      gap-3 sm:gap-4"
      >
        <div className="w-full lg:max-w-[780px] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 sm:gap-4">
          <div className="flex flex-col items-start lg:max-w-[195.171875px] min-h-[72px] gap-1.5">
            <div className="flex items-center lg:max-w-[195.171875px] min-h-[28px]">
              <span className="w-full lg:max-w-[187px] min-h-[24px]  font-inter font-bold text-xl leading-[100%] dark:text-white">
                Extraction Solution
              </span>
            </div>

            <div className="flex items-center w-full lg:max-w-[195.171875px] min-h-[24px]">
              <span className="w-full lg:max-w-[89px] min-h-[24px] font-inter font-normal text-base leading-[100%] text-gray-600 dark:text-[#B6BCCA]">
                $99/month
              </span>
            </div>

            <div className="flex items-center w-full lg:max-w-[195.171875px] min-h-[20px]">
              <span className="w-full lg:max-w-[196px] min-h-[20px] font-inter font-normal text-sm leading-[100%] text-gray-600 dark:text-[#B6BCCA]">
                Next billing: January 15, 2025
              </span>
            </div>
          </div>

          <Button
            className="w-full lg:max-w-[133px] min-h-[40px] pr-4 pl-4 gap-2 rounded-lg bg-[#00FFFF] shadow-[0px_-20px_20px_0px_#01FF013D_inset] text-[#1D2027] hover:text-white"
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className="w-fufll lg:max-w-[105px] h-[24px] font-inter font-bold text-base leading-6 ">
              Upgrade Plan
            </span>
          </Button>
        </div>
      </div>

      {/* Footer actions */}
      <div
        className="w-full lg:max-w-[814px] min-h-[41px] pt-4 border-t border-[#4D5057] flex flex-col lg:flex-row items-stretch lg:items-center justify-between
                      gap-3 sm:gap-4"
      >
        <div className="flex items-center w-full lg:max-w-[225.90625px] h-[24px]">
          <span className="w-full lg:max-w-[227px] h-[24px] truncate font-inter font-normal text-base leading-[100%] text-gray-600 dark:text-[#B6BCCA]">
            Need to review past invoices?
          </span>
        </div>

        <Button className="w-full  lg:max-w-[147.640625px] h-[40px] bg-gray-200 hover:bg-gray-200 dark:bg-[#2E3137] cursor-pointer ">
          <span className=" h-[24px] font-inter font-medium text-base leading-[100%] text-center  text-black dark:text-[#00FFFF] ">
            View Billing History
          </span>
        </Button>
      </div>
    </div>
  );
};

export default BillingAndSubscription;
