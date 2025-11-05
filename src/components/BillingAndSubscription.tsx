import type { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";

const BillingAndSubscription = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div
      className="flex flex-col items-center justify-center w-full md:max-w-[864px] md:min-h-[273px] rounded-[20px] border border-[#4D5057] bg-[#2E3137] relative
                    p-4 sm:p-5 md:p-6 gap-4 sm:gap-5"
    >
      {/* Title */}
      <div className="w-full md:max-w-[814px] md:min-h-[28px]">
        <span className="md:max-w-[188px] md:min-h-[28px]  font-inter font-medium text-lg leading-[100%] text-white">
          Billing & Subscription
        </span>
      </div>

      {/* Current plan card */}
      <div
        className="w-full md:max-w-[814px] md:min-h-[106px] px-4 py-4 rounded-xl bg-[#4D5057] flex flex-col md:flex-row items-stretch md:items-center justify-between
                      gap-3 sm:gap-4"
      >
        <div className="w-full md:max-w-[780px] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
          <div className="flex flex-col items-start md:max-w-[195.171875px] md:min-h-[72px] gap-1.5">
            <div className="flex items-center md:max-w-[195.171875px] md:min-h-[28px]">
              <span className="w-full md:max-w-[187px] md:min-h-[24px]  font-inter font-bold text-xl leading-[100%] text-white">
                Extraction Solution
              </span>
            </div>

            <div className="flex items-center w-full md:max-w-[195.171875px] md:min-h-[24px]">
              <span className="w-full md:max-w-[89px] md:min-h-[24px] font-inter font-normal text-base leading-[100%] text-[#B6BCCA]">
                $99/month
              </span>
            </div>

            <div className="flex items-center w-full md:max-w-[195.171875px] md:min-h-[20px]">
              <span className="w-full md:max-w-[196px] md:min-h-[20px] font-inter font-normal text-sm leading-[100%] text-[#B6BCCA]">
                Next billing: January 15, 2025
              </span>
            </div>
          </div>

          <Button
            className="w-full sm:w-auto md:max-w-[133px] md:min-h-[40px] pr-4 pl-4 gap-2 rounded-lg bg-[#00FFFF] shadow-[0px_-20px_20px_0px_#01FF013D_inset]"
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className="md:max-w-[105px] h-[24px] font-inter font-bold text-base leading-6 text-[#1D2027]">
              Upgrade Plan
            </span>
          </Button>
        </div>
      </div>

      {/* Footer actions */}
      <div
        className="w-full md:max-w-[814px] md:min-h-[41px] pt-4 border-t border-[#4D5057] flex flex-col md:flex-row items-stretch md:items-center justify-between
                      gap-3 sm:gap-4"
      >
        <div className="flex items-center w-full md:max-w-[225.90625px] h-[24px]">
          <span className="md:max-w-[227px] h-[24px] truncate font-inter font-normal text-base leading-[100%] text-[#B6BCCA]">
            Need to review past invoices?
          </span>
        </div>

        <Button className="w-full sm:w-auto md:max-w-[147.640625px] h-[40px] bg-[#2E3137]">
          <span className="md:max-w-[147px] h-[24px] font-inter font-medium text-base leading-[100%] text-center text-[#00FFFF]">
            View Billing History
          </span>
        </Button>
      </div>
    </div>
  );
};

export default BillingAndSubscription;
