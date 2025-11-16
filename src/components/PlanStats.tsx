import { Progress } from "./ui/progress";

const PlanStats = () => {
  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:justify-between w-full lg:max-w-[1120px] min-h-[170px] gap-4">
      {/* Card 1 */}
      <div className="flex flex-col items-center justify-between flex-1 basis-full lg:basis-[357.328125px] min-w-0 w-full h-auto min-h-[170px] rounded-3xl border border-[#4D5057] bg-gray-200 dark:bg-[#2E3137] p-3 lg:p-4">
        {/* Header */}
        <div className="flex items-center justify-between min-w-0 w-full lg:max-w-[307.328125px] h-10">
          <div className="min-w-0">
            <span className="block truncate font-inter font-semibold text-base sm:text-lg leading-none dark:text-white">
              Credits Used
            </span>
          </div>
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#FFC54233] shrink-0">
            <img
              src="/assets/images/bolt.svg"
              alt="credits"
              className="w-3 lg:w-[12px] h-4 object-contain"
            />
          </div>
        </div>

        {/* Value */}
        <div className="flex items-center min-w-0 w-full lg:max-w-[307.328125px] h-9">
          <span className="font-inter font-bold text-2xl lg:text-[30px] leading-none dark:text-white">
            847
          </span>
          <span className="ml-2 font-inter font-normal text-sm lg:text-base leading-none text-gray-600 dark:text-[#B6BCCA]">
            / 1000
          </span>
        </div>

        {/* Progress */}
        <Progress
          value={85}
          className="w-full lg:max-w-[307.328125px] h-2 rounded-full bg-[#4D5057]"
          indicatorColor="bg-[#FFC542]"
        />
      </div>

      {/* Card 2 */}
      <div className="flex flex-col items-center justify-between flex-1 basis-full lg:basis-[357.328125px] min-w-0 w-full h-auto min-h-[170px] rounded-3xl border border-[#4D5057] bg-gray-200 dark:bg-[#2E3137] p-3 lg:p-4">
        {/* Header */}
        <div className="flex items-center justify-between min-w-0 w-full lg:max-w-[307.328125px] h-10">
          <div className="min-w-0">
            <span className="block truncate font-inter font-semibold text-base sm:text-lg leading-none dark:text-white">
              Current Plan
            </span>
          </div>
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#3DD59833] shrink-0">
            <img
              src="/assets/images/premium.svg"
              alt="plan"
              className="w-[18px] h-[14px] object-contain"
            />
          </div>
        </div>

        {/* Plan name */}
        <div className="min-w-0 w-full lg:max-w-[307.328125px]">
          <span className="block truncate font-inter font-bold text-xl lg:text-2xl leading-none  dark:text-white">
            Extraction
          </span>
        </div>

        {/* Price */}
        <div className="min-w-0 w-full lg:max-w-[307.328125px]">
          <span className="font-inter font-normal text-sm lg:text-base leading-none text-gray-600 dark:text-[#B6BCCA]">
            $29/month
          </span>
        </div>
      </div>

      {/* Card 3 */}
      <div className="flex flex-col items-center justify-between flex-1 basis-full lg:basis-[357.34375px] min-w-0 w-full h-auto min-h-[170px] rounded-3xl border border-[#4D5057] bg-gray-200 dark:bg-[#2E3137] p-3 lg:p-4">
        {/* Header */}
        <div className="flex items-center justify-between min-w-0 w-full lg:max-w-[307.34375px] h-10">
          <div className="min-w-0">
            <span className="block truncate font-inter font-semibold text-base sm:text-lg leading-none dark:text-white">
              Next Billing
            </span>
          </div>
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#00FFFF33] shrink-0">
            <img
              src="/assets/images/billing_2.svg"
              alt="billing"
              className="w-[14px] h-4 object-contain"
            />
          </div>
        </div>

        {/* Date */}
        <div className="min-w-0 w-full lg:max-w-[307.34375px]">
          <span className="block truncate font-inter font-bold text-xl lg:text-2xl leading-none dark:text-white">
            Dec 15
          </span>
        </div>

        {/* Year */}
        <div className="min-w-0 w-full lg:max-w-[307.34375px]">
          <span className="font-inter font-normal text-sm lg:text-base leading-none text-gray-600 dark:text-[#B6BCCA]">
            2025
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlanStats;
