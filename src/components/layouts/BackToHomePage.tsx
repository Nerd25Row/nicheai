import { ArrowLeftIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const BackToPage = ({title, route}:{title:string,route:string}) => {
  const navigate = useNavigate();
  return (
    <Button
      className="flex w-auto cursor-pointer sm:w-[189px] h-[48px] items-center gap-2 rounded-md opacity-100 px-2 bg-transparent hover:bg-transparent transition"
      onClick={() => {
        navigate(route);
      }}
    >
      <ArrowLeftIcon className="w-5 h-5 opacity-100 text-[#CACFDA]" />
      <span className="font-inter font-bold text-sm sm:text-base leading-6 text-[#CACFDA]">
        {title}
      </span>
    </Button>
  );
};
export default BackToPage;
