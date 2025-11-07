import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const UpgradePlan = () => {
  return (
    <div className="flex flex-col w-full flex-1 min-h-full items-center py-4 md:py-10 px-4 md:px-0">
      <div className="flex flex-col items-center w-full lg:w-[1120px] h-auto  md:h-[814px] gap-8 md:gap-12  rounded-lg p-4 md:p-8">
        {/*  */}
        <div className="flex flex-col md:flex-row items-center md:justify-between w-full md:w-[1120px] h-auto md:h-[170px]  gap-4">
          {/*card 1  */}
          <div className="flex flex-col items-center justify-center gap-4 w-full md:w-[357.328125px] h-[170px] rounded-3xl border border-[#4D5057] bg-[#2E3137] p-4 md:p-0">
            {/*  */}
            <div className="items-center w-full md:w-[307.328125px] h-[40px] flex justify-between">
              {/*  */}
              <div className="w-auto md:w-[112.25px] h-[28px] ">
                <span className="w-auto md:w-[113px] h-[28px]  font-inter font-semibold text-lg leading-none text-white">
                  Credits Used
                </span>
              </div>
              {/*  */}
              <div className="flex items-center justify-center w-[40px] h-[40px] rounded-xl bg-[#FFC54233] flex-shrink-0">
                <img
                  src="/assets/images/bolt.svg"
                  className="w-[12.002591133117676px] h-[16.000564575195312px] object-cover"
                />
              </div>
            </div>
            {/*  */}
            <div className="flex items-center w-full md:w-[307.328125px] h-[36px] ">
              <span className="w-auto md:w-[59px] h-[36px] font-inter font-bold text-[30px] leading-none text-white">
                847
              </span>
              <span className="w-auto md:w-[48px] h-[24px] font-inter font-normal text-base leading-none text-[#B6BCCA]">
                / 1000
              </span>
            </div>
            {/*  */}

            <Progress
              value={85}
              className="w-full md:w-[307.328125px] h-[8px] rounded-full bg-[#4D5057] "
              indicatorColor="bg-[#FFC542]"
            />
          </div>
          {/* card 2 */}
          <div className="flex flex-col items-center justify-center gap-4 w-full md:w-[357.328125px] h-[170px] rounded-3xl border border-[#4D5057] bg-[#2E3137] p-4 md:p-0">
            <div className="flex items-center justify-between w-full md:w-[307.328125px] h-[40px]">
              <div className="w-auto md:w-[108.578125px] h-[28px] ">
                <span className="w-auto md:w-[109px] h-[28px]  font-inter font-semibold text-lg leading-none text-white">
                  Current Plan
                </span>
              </div>
              <div className="flex items-center justify-center w-[40px] h-[40px] rounded-xl  bg-[#3DD59833] flex-shrink-0">
                <img
                  src="/assets/images/premium.svg"
                  className="w-[18px] h-[14px] object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-[307.328125px] h-[32px]">
              <div className="w-auto md:w-[120.09375px] h-[29px]">
                <span className="w-auto md:w-[121px] h-[32px] font-inter font-bold text-2xl leading-none text-white">
                  Extraction
                </span>
              </div>
            </div>
            <div className="w-full md:w-[307.328125px] h-[20px] ">
              <span className="w-auto md:w-[84px] h-[24px] font-inter font-normal text-base leading-none text-[#B6BCCA]">
                $29/month
              </span>
            </div>
          </div>
          {/* card 3 */}
          <div className="flex flex-col items-center justify-center gap-4 w-full md:w-[357.34375px] h-[170px]  rounded-3xl border border-[#4D5057] bg-[#2E3137] p-4 md:p-0">
            {/*  */}
            <div className="w-full md:w-[307.34375px] h-[40px]  flex justify-between ">
              <div className="flex items-center w-auto md:w-[110.34375px] h-[28px] ">
                <span className="w-auto md:w-[98px] h-[28px] font-inter font-semibold text-lg leading-none text-white">
                  Next Billing
                </span>
              </div>
              <div className="flex items-center justify-center w-[40px] h-[40px] rounded-xl  bg-[#00FFFF33] flex-shrink-0">
                <img
                  src="/assets/images/billing_2.svg"
                  className="w-[14px] h-[16px] rotate-0 opacity-100 object-cover"
                />
              </div>
            </div>
            {/*  */}
            <div className="w-full md:w-[307.34375px] h-[32px]  ">
              <span className="w-auto md:w-[79px] h-[32px] font-inter font-bold text-2xl leading-none text-white">
                Dec 15
              </span>
            </div>
            {/*  */}
            <div className="w-full md:w-[307.34375px] h-[20px]  ">
              <span className="w-auto md:w-[40px] h-[24px] font-inter font-normal text-base leading-none text-[#B6BCCA]">
                2025
              </span>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="flex flex-col items-center w-full md:w-[1120px] h-auto md:h-[424px] gap-6 md:gap-8">
          {/*  */}
          <div className="flex flex-col items-center justify-between h-auto w-full md:w-[1120px]">
            <div className="flex items-center w-full md:w-[1120px] h-auto md:h-[32px] mb-2 md:mb-0">
              <span className="w-full md:w-[260px] h-auto md:h-[32px] font-inter font-bold text-xl md:text-2xl leading-7 md:leading-8 tracking-tight text-white">
                Review available plans
              </span>
            </div>
            <div className="flex items-center w-full md:w-[1120px] h-auto md:h-[24px] ">
              {/* NEXT TO DO */}
              <p className="w-full md:w-[558px] h-auto md:h-[24px]  font-inter font-normal text-sm md:text-base leading-5 md:leading-none text-[#B6BCCA]">
                Choose the perfect plan that fits your needs and scale your AI
                operations
              </p>
            </div>
          </div>
          {/*  */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full md:w-[1120px] h-auto md:h-[328px] gap-4 md:gap-6 ">
            {/* card 1 */}
            <div className="flex flex-col items-center w-full md:w-[357.328125px] h-auto md:h-[324px] gap-6 md:gap-8 rounded-3xl border border-[#4D5057] p-6 md:p-8 bg-[#2E3137]">
              {/*  */}
              <div className="flex flex-col w-full md:w-[291.328125px] h-auto md:h-[80px] gap-2">
                {/*  */}
                <div className="flex items-center flex-wrap w-full md:w-[291.328125px] h-auto md:h-[24px] gap-2 ">
                  <span className="w-auto md:w-[191px] h-auto md:h-[24px] font-inter font-bold text-lg md:text-xl leading-none text-white">
                    Extraction Solution
                  </span>
                  <Button className="w-auto md:w-[89px] h-[24px] bg-[#2E3137] pt-[3px] pr-2 pb-[3px] pl-2 rounded-2xl border border-[#72E6E5] text-xs">
                    <span className="w-auto md:w-[73px] h-[18px] font-inter font-medium text-xs leading-[18px] tracking-wide text-center text-[#72E6E5]">
                      Current plan
                    </span>
                  </Button>
                </div>
                {/*  */}
                <div className="w-full md:w-[293px] h-auto md:h-[48px] font-inter font-normal text-sm md:text-base leading-5 md:leading-6 text-[#B6BCCA]">
                  Production-Scale AI Designed for Massive Throughput
                </div>
              </div>
              <div className="flex flex-col items-center w-full md:w-[293.328125px] h-auto md:h-[80px] gap-2">
                <span className="w-full md:w-[293.328125px] h-auto md:h-[24px] font-inter font-medium text-sm md:text-base leading-5 md:leading-6 align-middle text-[#CACFDA]">
                  Amount
                </span>
                <Select>
                  <SelectTrigger className="w-full md:w-[293.328125px] h-[48px] rotate-0 opacity-100 pr-4 pl-4 gap-3 rounded-xl bg-[#4D5057] text-white [&>*]:text-white [&_svg]:text-white">
                    <SelectValue
                      placeholder="100 images"
                      className="w-full md:w-[229.328125px] h-[24px] rotate-0 opacity-100 font-inter font-normal text-sm leading-[100%] tracking-[0%] align-middle !text-white"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100">100 images</SelectItem>
                    <SelectItem value="200">200 images</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center w-full md:w-[291.328125px] h-auto md:h-[36px] gap-2 ">
                <div className="w-auto md:w-[58.03125px] h-auto md:h-[36px]">
                  <span className="w-auto md:w-[59px] h-auto md:h-[36px] font-inter font-bold text-2xl md:text-[30px] leading-none text-white">
                    $29
                  </span>
                </div>
                <div className="w-auto md:w-[53.53125px] h-auto md:h-[24px] ">
                  <span className="w-auto md:w-[54px] h-auto md:h-[24px]  font-inter font-normal text-sm md:text-base leading-none text-[#B6BCCA]">
                    /month
                  </span>
                </div>
              </div>
            </div>
            {/* card 2 */}
            <div className="flex flex-col items-center w-full md:w-[357.328125px] h-auto md:h-[324px] gap-6 md:gap-8 rounded-3xl border border-[#4D5057] p-6 md:p-8 bg-[#2E3137]">
              {/*  */}
              <div className="flex flex-col w-full md:w-[291.328125px] h-auto md:h-[80px] gap-2">
                {/*  */}
                <div className="flex items-center flex-wrap w-full md:w-[291.328125px] h-auto md:h-[24px] gap-2 ">
                  <span className="w-auto md:w-[191px] h-auto md:h-[24px] font-inter font-bold text-lg md:text-xl leading-none text-white">
                    Fusion Solution
                  </span>
                </div>
                {/*  */}
                <div className="w-full md:w-[293px] h-auto md:h-[48px] font-inter font-normal text-sm md:text-base leading-5 md:leading-6 text-[#B6BCCA]">
                  Production-Scale AI Designed for Massive Throughput
                </div>
              </div>
              <div className="flex flex-col items-center w-full md:w-[293.328125px] h-auto md:h-[80px] gap-2">
                <span className="w-full md:w-[293.328125px] h-auto md:h-[24px] font-inter font-medium text-sm md:text-base leading-5 md:leading-6 align-middle text-[#CACFDA]">
                  Amount
                </span>
                <Select>
                  <SelectTrigger className="w-full md:w-[293.328125px] h-[48px] rotate-0 opacity-100 pr-4 pl-4 gap-3 rounded-xl bg-[#4D5057] text-white [&>*]:text-white [&_svg]:text-white">
                    <SelectValue
                      placeholder="100 images"
                      className="w-full md:w-[229.328125px] h-[24px] rotate-0 opacity-100 font-inter font-normal text-sm leading-[100%] tracking-[0%] align-middle !text-white"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100">100 images</SelectItem>
                    <SelectItem value="200">200 images</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center w-full md:w-[291.328125px] h-auto md:h-[36px] gap-2 ">
                <div className="w-auto md:w-[58.03125px] h-auto md:h-[36px]">
                  <span className="w-auto md:w-[59px] h-auto md:h-[36px] font-inter font-bold text-2xl md:text-[30px] leading-none text-white">
                    $79
                  </span>
                </div>
                <div className="w-auto md:w-[53.53125px] h-auto md:h-[24px] ">
                  <span className="w-auto md:w-[54px] h-auto md:h-[24px]  font-inter font-normal text-sm md:text-base leading-none text-[#B6BCCA]">
                    /month
                  </span>
                </div>
              </div>
            </div>
            {/* card 3 */}
            <div className="flex flex-col items-center w-full md:w-[357.328125px] h-auto md:h-[324px] gap-6 md:gap-8 rounded-3xl border border-[#4D5057] p-6 md:p-8 bg-[#2E3137]">
              {/*  */}
              <div className="flex flex-col w-full md:w-[291.328125px] h-auto md:h-[80px] gap-2">
                {/*  */}
                <div className="flex items-center flex-wrap w-full md:w-[291.328125px] h-auto md:h-[24px] gap-2 ">
                  <span className="w-auto md:w-[191px] h-auto md:h-[24px] font-inter font-bold text-lg md:text-xl leading-none text-white">
                    Immersion Solution
                  </span>
                </div>
                {/*  */}
                <div className="w-full md:w-[293px] h-auto md:h-[48px] font-inter font-normal text-sm md:text-base leading-5 md:leading-6 text-[#B6BCCA]">
                  Production-Scale AI Designed for Massive Throughput
                </div>
              </div>
              <div className="flex flex-col items-center w-full md:w-[293.328125px] h-auto md:h-[80px] gap-2">
                <span className="w-full md:w-[293.328125px] h-auto md:h-[24px] font-inter font-medium text-sm md:text-base leading-5 md:leading-6 align-middle text-[#CACFDA]">
                  Amount
                </span>
                <Select>
                  <SelectTrigger className="w-full md:w-[293.328125px] h-[48px] rotate-0 opacity-100 pr-4 pl-4 gap-3 rounded-xl bg-[#4D5057] text-white [&>*]:text-white [&_svg]:text-white">
                    <SelectValue
                      placeholder="100 images"
                      className="w-full md:w-[229.328125px] h-[24px] rotate-0 opacity-100 font-inter font-normal text-sm leading-[100%] tracking-[0%] align-middle !text-white"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100">100 images</SelectItem>
                    <SelectItem value="200">200 images</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center w-full md:w-[291.328125px] h-auto md:h-[36px] gap-2 ">
                <div className="w-auto md:w-[71.55px] h-auto md:h-[36px]">
                  <span className="w-auto md:w-[59px] h-auto md:h-[36px] font-inter font-bold text-2xl md:text-[30px] leading-none text-white">
                    $199
                  </span>
                </div>
                <div className="w-auto md:w-[53.53125px] h-auto md:h-[24px] ">
                  <span className="w-auto md:w-[54px] h-auto md:h-[24px]  font-inter font-normal text-sm md:text-base leading-none text-[#B6BCCA]">
                    /month
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[1120px] h-auto md:h-[124px] rounded-[20px] md:rounded-[24px] opacity-100 bg-black shadow-[0px_32px_40px_-12px_rgba(0,0,0,0.25)]">
          <div className="flex items-center justify-center w-full md:w-[1120px] h-auto md:h-[124px] rounded-[20px] md:rounded-[24px]  opacity-100 bg-gradient-to-r from-[#00FFFF] to-[#07EC17] p-4 md:p-0">
            <div className="flex flex-col md:flex-row items-center w-full md:w-[1056px] h-auto md:h-[60px] justify-between gap-4 md:gap-0">
              <div className="flex flex-col items-center md:items-start justify-between w-full md:w-[442.3125px] h-auto md:h-[60px] gap-2 md:gap-0">
                <div className="w-full md:w-[442.3125px] h-auto md:h-[28px] text-center md:text-left">
                  <span className="w-full md:w-[345px] h-auto md:h-[28px]  font-inter font-bold text-lg md:text-xl leading-tight md:leading-none text-[#1D2027]">
                    Need help choosing the right plan?
                  </span>
                </div>
                <div className="w-full md:w-[442.3125px] h-auto md:h-[24px]  opacity-80 text-center md:text-left">
                  <span className="w-full md:w-[443px] h-auto md:h-[24px]  font-inter font-normal text-sm md:text-base leading-5 md:leading-none text-[#1D2027]">
                    Contact our sales team for personalized recommendations
                  </span>
                </div>
              </div>
              <Button className="w-full md:w-[157px] h-[48px] pr-6 pl-6 gap-2 rounded-lg bg-white shadow-[0px_-20px_20px_0px_rgba(1,255,1,0.24)] text-black font-medium ">
                {/* NEXT TO DO */}
                <span className="w-auto md:w-[110px] h-auto md:h-[24px] font-inter font-bold text-base leading-6 align-middle text-[#1D2027] ">
                  Contact Sales
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePlan;
