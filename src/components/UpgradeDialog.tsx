import { Check, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { Dispatch, SetStateAction } from "react";

const UpgradeDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="flex flex-col items-center justify-between w-[357.34375px] h-[524px] rounded-3xl border border-[#4D5057] bg-gray-200 dark:bg-[#2E3137]">
        {/* Close Button */}
        <Button
          onClick={() => setOpen(false)}
          className="
            absolute top-4 right-4
            text-black
            bg-gray-200
            hover:bg-gray-300
            dark:text-[#B6BCCA]
            dark:hover:text-white
            transition-colors
          "
        >
          <X className="w-5 h-5" />
        </Button>
        {/*  */}
        <div className="flex flex-col items-center justify-between w-[291.34375px] h-[136px]">
          <div className="w-[291.34375px] h-[28px] ">
            <span className="w-[194px] h-[28px]  font-inter font-bold text-xl leading-none dark:text-white">
              Immersion Solution
            </span>
          </div>
          <div className="w-[291.34375px] h-[48px]  ">
            <span className="w-[266px] h-[24px] font-inter font-normal text-base leading-none text-gray-600 dark:text-[#B6BCCA]">
              Enterprise-grade solution for large organizations
            </span>
          </div>
          <div className="w-[291.34375px] h-[36px]  gap-2 ">
            <span className="w-[74px] h-[36px] font-inter font-bold text-[30px] leading-none dark:text-white">
              $199
            </span>

            <span className="w-[54px] h-[24px] font-inter font-normal text-base leading-none text-gray-600 dark:text-[#B6BCCA]">
              /month
            </span>
          </div>
        </div>
        {/*  */}
        <div className="flex flex-col items-center justify-between w-[291.34375px] h-[116px]">
          {/* check 1 */}
          <div className="flex items-center w-[291.34375px] h-[20px] gap-3 ">
            <div className="flex items-center justify-center w-[12.25px] h-[20px]">
              <div className="flex items-center justify-center w-[12.25px] h-[14px] ">
                <Check className="w-[12.25px] h-[14px]  text-[#3DD598]" />
              </div>
            </div>
            <div className="flex items-center w-[111.234375px] h-[20px] ">
              <span className="w-[112px] h-[20px] font-inter font-normal text-sm leading-none dark:text-white">
                Unlimited credits
              </span>
            </div>
          </div>
          {/* check 2 */}
          <div className="flex items-center w-[291.34375px] h-[20px] gap-3 ">
            <div className="flex items-center justify-center w-[12.25px] h-[20px]">
              <div className="flex items-center justify-center w-[12.25px] h-[14px] ">
                <Check className="w-[12.25px] h-[14px]  text-[#3DD598]" />
              </div>
            </div>
            <div className="flex items-center w-[111.234375px] h-[20px] ">
              <span className="w-[112px] h-[20px] font-inter font-normal text-sm leading-none dark:text-white">
                All AI models
              </span>
            </div>
          </div>
          {/* check 3 */}
          <div className="flex items-center w-[291.34375px] h-[20px] gap-3 ">
            <div className="flex items-center justify-center w-[12.25px] h-[20px]">
              <div className="flex items-center justify-center w-[12.25px] h-[14px] ">
                <Check className="w-[12.25px] h-[14px]  text-[#3DD598]" />
              </div>
            </div>
            <div className="flex items-center w-[155.36px] h-[20px] ">
              <span className="w-[155.36px] h-[20px] font-inter font-normal text-sm leading-none dark:text-white">
                24/7 dedicated support
              </span>
            </div>
          </div>
          {/* check 4 */}
          <div className="flex items-center w-[291.34375px] h-[20px] gap-3 ">
            <div className="flex items-center justify-center w-[12.25px] h-[20px]">
              <div className="flex items-center justify-center w-[12.25px] h-[14px] ">
                <Check className="w-[12.25px] h-[14px]  text-[#3DD598]" />
              </div>
            </div>
            <div className="flex items-center w-[132.95px] h-[20px] ">
              <span className="w-[132.95px] h-[20px] font-inter font-normal text-sm leading-none dark:text-white">
                Custom integrations
              </span>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="flex flex-col items-center justify-between w-[291.34375px] h-[76px]">
          <div className="w-[291.34375px] h-[20px] ">
            <span className="w-[58px] h-[20px] font-inter font-medium text-sm leading-none dark:text-white">
              Amount
            </span>
          </div>
          {/* NEXT TO DO */}
          <Select>
            <SelectTrigger className="w-[291.34375px] h-[48px] rounded-xl border border-[#4D5057] bg-gray-50 dark:bg-[#1D2027] rotate-0 opacity-100 pr-4 pl-4 gap-3 rounded-xl text-black dark:text-white dark:[&>*]:text-white dark:[&_svg]:text-white">
              <SelectValue
                placeholder="100 images"
                className="w-[229.328125px] h-[48px] rotate-0 opacity-100 font-inter font-normal text-sm leading-[100%] tracking-[0%] align-middle !text-white"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="100">100 images</SelectItem>
              <SelectItem value="200">200 images</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/*  */}
        <Button className="w-[291px] h-[48px]  gap-2 pr-6 pl-6 rounded-lg bg-[#00FFFF] shadow-[0px_-20px_20px_0px_#01FF013D_inset] text-[#1D2027] hover:text-white font-medium">
          <span className="w-[108px] h-[24px] font-inter font-bold text-base leading-6 align-middle ">
            Contact sales
          </span>
        </Button>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default UpgradeDialog;
