import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const Preferences = () => {
  return (
    <div className="flex flex-col w-full md:max-w-[864px] md:min-h-[342px] rotate-0 opacity-100 gap-6 rounded-[20px] border p-[25px] border-[#4D5057] bg-[#2E3137]">
      <div className="w-full h-[28px] rotate-0 opacity-100">
        <span className="w-[111px] h-[28px] rotate-0 opacity-100 top-[3px] font-inter font-semibold text-lg leading-[100%] tracking-[0%] text-white">
          Preferences
        </span>
      </div>
      <div className="flex flex-col w-full md:min-h-[240px] rotate-0 opacity-100 gap-6">
        <div className="flex flex-col sm:flex-row justify-between w-full min-h-[44px] rotate-0 opacity-100 gap-4">
          <div className="w-full sm:w-[195.625px] h-[44px] rotate-0 opacity-100">
            <div className="w-full sm:w-[195.625px] h-[24px] rotate-0 opacity-100">
              <span className="w-[55px] h-[24px] rotate-0 opacity-100 top-[2px] font-inter font-bold text-base leading-6 tracking-[0%] text-white">
                Theme
              </span>
            </div>
            <div className="w-full sm:w-[195.625px] h-[20px] rotate-0 opacity-100 top-[24px]">
              <span className="w-full sm:w-[196px] h-[20px]  truncate rotate-0 opacity-100 top-[1px] font-inter font-normal text-sm leading-[100%] tracking-[0%] text-[#B6BCCA]">
                Choose your preferred theme
              </span>
            </div>
          </div>

          <RadioGroup
            defaultValue="light"
            className="flex w-full sm:w-[151px] h-[26px] rotate-0 opacity-100 gap-4"
          >
            {/* light  */}
            <div className="flex items-center w-[69px] h-[26px] rotate-0 opacity-100 gap-3">
              <RadioGroupItem
                value="light"
                id="r2"
                className="w-[18px] h-[18px] rotate-0 opacity-100 rounded-full bg-[#4D5057]"
              />
              <Label
                htmlFor="r2"
                className="w-[39px] h-[24px] rotate-0 opacity-100 font-inter font-medium text-base leading-6 tracking-[0%] text-white"
              >
                Light
              </Label>
            </div>

            {/* dark */}
            <div className="flex items-center w-[66px] h-[26px] rotate-0 opacity-100 gap-3">
              <RadioGroupItem
                value="dark"
                id="r3"
                className="w-[18px] h-[18px] rotate-0 opacity-100 rounded-full bg-[#00C0C1]"
              />

              <Label
                htmlFor="r3"
                className="w-[36px] h-[24px] rotate-0 opacity-100 font-inter font-medium text-base leading-6 tracking-[0%] text-white"
              >
                Dark
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex flex-col w-full md:min-h-[172px] rotate-0 opacity-100 pt-6 gap-2 border-t border-t-[#4D5057]">
          <div className="flex flex-col w-full min-h-[148px] rotate-0 opacity-100 gap-2">
            <div className="w-full sm:w-[200px] h-[32px] rotate-0 opacity-100 pb-2">
              <span className="w-[200px] h-[24px] truncate rotate-0 opacity-100 font-inter font-bold text-base leading-6 tracking-[0%] text-white">
                Notification Preferences
              </span>
            </div>
            <div className="flex flex-col w-full sm:w-[287px] min-h-[108px] rotate-0 opacity-100 gap-2">
              {/* check box 1 */}
              <div className="flex items-center w-full min-h-[20px] rotate-0 opacity-100 gap-2">
                <Checkbox
                  id="terms"
                  className="w-4 h-4 rotate-0 opacity-100 rounded border-0 bg-[#4D5057]"
                />
                {/* NEXT TO DO */}
                <Label
                  htmlFor="terms"
                  className="w-full h-5 truncate rotate-0 opacity-100 font-inter font-medium text-sm leading-5 tracking-[1%] text-white"
                >
                  Email notifications for API usage alerts
                </Label>
              </div>
              {/* check box 2 */}
              <div className="flex items-center w-full min-h-[20px] rotate-0 opacity-100 gap-2">
                <Checkbox
                  id="terms2"
                  className="w-4 h-4  rotate-0 opacity-100 rounded border-0 bg-[#4D5057]"
                />
                {/* NEXT TO DO */}
                <Label
                  htmlFor="terms2"
                  className="w-full h-5 truncate rotate-0 opacity-100 font-inter font-medium text-sm leading-5 tracking-[1%] text-white"
                >
                  Push notifications for system updates
                </Label>
              </div>
              {/* check box 3 */}
              <div className="flex items-center w-full min-h-[20px] rotate-0 opacity-100 gap-2">
                <Checkbox
                  id="terms3"
                  className="w-4 h-4 rotate-0 opacity-100 rounded border-0 bg-[#4D5057]"
                />
                {/* NEXT TO DO */}
                <Label
                  htmlFor="terms3"
                  className="w-full h-5 truncate  rotate-0 opacity-100 font-inter font-medium text-sm leading-5 tracking-[1%] text-white"
                >
                  Weekly usage reports
                </Label>
              </div>
              {/* check box 4 */}
              <div className="flex items-center w-full min-h-[20px] rotate-0 opacity-100 gap-2">
                <Checkbox
                  id="terms4"
                  className="w-4 h-4 rotate-0 opacity-100 rounded border-0 bg-[#4D5057]"
                />
                {/* NEXT TO DO */}
                <Label
                  htmlFor="terms4"
                  className="w-full h-5 truncate  rotate-0 opacity-100 font-inter font-medium text-sm leading-5 tracking-[1%] text-white"
                >
                  Marketing communications
                </Label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Preferences;
