import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const AvailablePlans = () => {
  return (
    <div className="flex flex-col items-center w-full lg:max-w-[1120px] min-h-[424px] gap-6 lg:gap-8">
      {/* Header */}
      <div className="flex flex-col justify-between w-full lg:max-w-[1120px] h-[64px]">
        <div className="flex items-center w-full lg:max-w-[1120px] h-[32px] mb-2 lg:mb-0">
          <span className="w-auto lg:max-w-[260px] h-[32px] font-inter font-bold text-xl lg:text-2xl leading-7 lg:leading-8 tracking-tight dark:text-white">
            Review available plans
          </span>
        </div>
        <div className="flex items-center w-full lg:max-w-[1120px] h-[24px]">
          <p className="w-auto lg:max-w-[558px] h-[24px] font-inter font-normal text-sm lg:text-base leading-5 lg:leading-none text-gray-600 dark:text-[#B6BCCA]">
            Choose the perfect plan that fits your needs and scale your AI
            operations
          </p>
        </div>
      </div>

      {/* Cards Container */}
      <div className="flex flex-col lg:flex-row items-stretch justify-between w-full lg:max-w-[1120px] min-h-[328px] gap-4 lg:gap-6">
        {/* Card 1 */}
        <div className="cursor-pointer flex flex-col items-center flex-1 basis-full lg:basis-[357.328125px] min-w-0 w-full lg:max-w-[357.328125px] h-auto min-h-[324px] gap-6 lg:gap-8 rounded-3xl border border-[#4D5057] p-2 lg:p-8 bg-gray-200 dark:bg-[#2E3137]  transition-all duration-300 ease-out hover:scale-[1.03]  hover:shadow-[0px_8px_25px_rgba(0,0,0,0.25)] dark:hover:shadow-[0px_8px_25px_rgba(0,0,0,0.55)] ">
          <div className="flex flex-col w-full lg:max-w-[291.328125px] h-[80px] gap-2">
            <div className="flex items-center min-w-0 w-full lg:max-w-[291.328125px] h-[24px] gap-2">
              <span className="min-w-0 w-auto lg:max-w-[191px] h-[24px] truncate font-inter font-bold text-lg lg:text-xl leading-none dark:text-white">
                Extraction Solution
              </span>
              <Button className="w-auto lg:max-w-[89px] h-[24px] bg-gray-200 hover:bg-gray-300 dark:bg-[#2E3137] pt-[3px] pr-2 pb-[3px] pl-2 rounded-2xl border border-[#72E6E5] text-xs">
                <span className="w-auto lg:max-w-[73px] h-[18px] font-inter font-medium text-xs leading-[18px] tracking-wide text-center text-black dark:text-[#72E6E5]">
                  Current plan
                </span>
              </Button>
            </div>
            <span className="w-auto lg:max-w-[293px] h-[48px] font-inter font-normal text-sm lg:text-base leading-5 lg:leading-6 text-gray-600 dark:text-[#B6BCCA]">
              Production-Scale AI Designed for Massive Throughput
            </span>
          </div>

          <div className="flex flex-col w-full lg:max-w-[293.328125px] h-[80px] gap-2">
            <span className="w-auto lg:max-w-[293.328125px] font-inter font-medium text-sm lg:text-base leading-5 lg:leading-6 text-gray-600 dark:text-[#CACFDA]">
              Amount
            </span>
            <Select>
              <SelectTrigger
                className="
      w-full lg:max-w-[293.328125px] h-[48px]
      pr-4 pl-4 gap-3 rounded-xl
      bg-gray-50 dark:bg-[#4D5057]
      text-black dark:text-white
      [&>span]:text-black dark:[&>span]:text-white
      [&>svg]:text-black dark:[&>svg]:text-white
      [&>svg]:opacity-100
    "
              >
                <SelectValue placeholder="100 images" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="100">100 images</SelectItem>
                <SelectItem value="200">200 images</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center w-full lg:max-w-[291.328125px] h-[36px] gap-2">
            <span className="font-inter font-bold text-2xl lg:text-[30px] leading-none dark:text-white">
              $29
            </span>
            <span className="font-inter font-normal text-sm lg:text-base leading-none text-gray-600 dark:text-[#B6BCCA]">
              /month
            </span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="cursor-pointer flex flex-col items-center flex-1 basis-full lg:basis-[357.328125px] min-w-0 w-full lg:max-w-[357.328125px] h-auto min-h-[324px] gap-6 lg:gap-8 rounded-3xl border border-[#4D5057] p-2 lg:p-8 bg-gray-200 dark:bg-[#2E3137]  transition-all duration-300 ease-out hover:scale-[1.03]  hover:shadow-[0px_8px_25px_rgba(0,0,0,0.25)] dark:hover:shadow-[0px_8px_25px_rgba(0,0,0,0.55)] ">
          <div className="flex flex-col w-full lg:max-w-[291.328125px] min-h-[80px] gap-2">
            <div className="flex items-center flex-wrap min-w-0 w-full lg:max-w-[291.328125px] h-[24px] gap-2">
              <span className="min-w-0 font-inter font-bold text-lg lg:text-xl leading-none dark:text-white">
                Fusion Solution
              </span>
            </div>
            <div className="w-full font-inter font-normal text-sm lg:text-base leading-5 lg:leading-6 text-gray-600 dark:text-[#B6BCCA]">
              Production-Scale AI Designed for Massive Throughput
            </div>
          </div>

          <div className="flex flex-col  w-full lg:max-w-[293.328125px] h-[80px] gap-2">
            <span className="font-inter font-medium text-sm lg:text-base leading-5 text-gray-600 dark:text-[#CACFDA]">
              Amount
            </span>
            <Select>
              <SelectTrigger
                className="
      w-full lg:max-w-[293.328125px] h-[48px]
      pr-4 pl-4 gap-3 rounded-xl
      bg-gray-50 dark:bg-[#4D5057]
      text-black dark:text-white
      [&>span]:text-black dark:[&>span]:text-white
      [&>svg]:text-black dark:[&>svg]:text-white
      [&>svg]:opacity-100
    "
              >
                <SelectValue placeholder="100 images" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="100">100 images</SelectItem>
                <SelectItem value="200">200 images</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center w-full lg:max-w-[291.328125px] h-[36px] gap-2">
            <span className="font-inter font-bold text-2xl md:text-[30px] leading-none dark:text-white">
              $79
            </span>
            <span className="font-inter font-normal text-sm md:text-base leading-none text-gray-600 dark:text-[#B6BCCA]">
              /month
            </span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="cursor-pointer flex flex-col items-center flex-1 basis-full lg:basis-[357.328125px] min-w-0 w-full lg:max-w-[357.328125px] h-auto min-h-[324px] gap-6 lg:gap-8 rounded-3xl border border-[#4D5057] p-6 lg:p-8 bg-gray-200 dark:bg-[#2E3137]  transition-all duration-300 ease-out hover:scale-[1.03]  hover:shadow-[0px_8px_25px_rgba(0,0,0,0.25)] dark:hover:shadow-[0px_8px_25px_rgba(0,0,0,0.55)]">
          <div className="flex flex-col w-full lg:max-w-[291.328125px] h-[80px] gap-2">
            <div className="flex items-center flex-wrap min-w-0 w-full lg:max-w-[291.328125px] h-[24px] gap-2">
              <span className="min-w-0 w-auto truncate font-inter font-bold text-lg lg:text-xl leading-none dark:text-white">
                Immersion Solution
              </span>
            </div>
            <span className="font-inter font-normal text-sm lg:text-base leading-5 text-gray-600 dark:text-[#B6BCCA]">
              Production-Scale AI Designed for Massive Throughput
            </span>
          </div>

          <div className="flex flex-col w-full lg:max-w-[293.328125px] h-[80px] gap-2">
            <span className="font-inter font-medium text-sm lg:text-base leading-5 text-gray-600 dark:text-[#CACFDA]">
              Amount
            </span>
            <Select>
              <SelectTrigger
                className="
      w-full lg:max-w-[293.328125px] h-[48px]
      pr-4 pl-4 gap-3 rounded-xl
      bg-gray-50 dark:bg-[#4D5057]
      text-black dark:text-white
      [&>span]:text-black dark:[&>span]:text-white
      [&>svg]:text-black dark:[&>svg]:text-white
      [&>svg]:opacity-100
    "
              >
                <SelectValue placeholder="100 images" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="100">100 images</SelectItem>
                <SelectItem value="200">200 images</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center w-full lg:max-w-[291.328125px] h-[36px] gap-2">
            <span className="font-inter font-bold text-2xl lg:text-[30px] leading-none dark:text-white">
              $199
            </span>
            <span className="font-inter font-normal text-sm lg:text-base leading-none text-gray-600 dark:text-[#B6BCCA]">
              /month
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailablePlans;
