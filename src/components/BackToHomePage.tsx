import { ArrowLeftIcon } from "lucide-react";
import { Button } from "./ui/button";

const BackToHomePage = () => {
  return (
    <Button className="flex w-auto sm:w-[189px] h-[48px] items-center gap-2 rounded-md opacity-100 px-2 bg-transparent hover:bg-transparent transition">
      <ArrowLeftIcon className="w-5 h-5 opacity-100 text-[#CACFDA]" />
      <span className="font-inter font-bold text-sm sm:text-base leading-6 text-[#CACFDA]">
        Back to homepage
      </span>
    </Button>
  );
};
export default BackToHomePage;
