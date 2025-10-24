import {
  Image,
  LayoutDashboard,
  LogOut,
  Moon,
  Network,
  Settings,
  Sun,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import LogoComponent from "./LogoComponent";
import { Button } from "../ui/button";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return (
      location.pathname === path ||
      (path === "/" && location.pathname === "/dashboard")
    );
  };

  return (
    <div className="w-full lg:w-[256px] h-auto lg:h-screen flex flex-col justify-between rotate-0 opacity-100 pt-4 lg:pt-8 pr-3 lg:pr-5 pb-4 lg:pb-8 pl-3 lg:pl-5 bg-[#2E3137] lg:bg-[#2E3137]">
      <div className="flex flex-col w-full lg:w-[216px] h-auto lg:h-[248px] rotate-0 opacity-100 gap-4 lg:gap-8">
        {/* logo */}
        <LogoComponent />
        {/* navigations */}
        <div className="w-full lg:w-[216px] h-auto lg:h-[168px] rotate-0 opacity-100 gap-3 flex flex-col lg:flex-col">
          <Link to="/" className="block">
            <div
              className={`w-full lg:w-[216px] h-[48px] rotate-0 opacity-100 rounded-xl flex items-center justify-center gap-3 px-4 py-3 relative ${
                isActive("/") ? "bg-[#4D5057]" : "hover:bg-[#3A3D44]"
              }`}
            >
              <div className="w-5 h-5 rotate-0 opacity-100 rounded">
                <LayoutDashboard
                  className={`w-[17.08px] h-[17.08px] rotate-0 opacity-100 ${
                    isActive("/") ? "text-white" : "text-[#B6BCCA]"
                  }`}
                />
              </div>
              <span
                className={`w-full lg:w-[156px] h-[24px] rotate-0 opacity-100 font-inter font-medium text-base leading-6 tracking-normal ${
                  isActive("/") ? "text-white" : "text-[#B6BCCA]"
                }`}
              >
                Dashboard
              </span>
            </div>
          </Link>

          <Link to="/models" className="block">
            <div
              className={`w-full lg:w-[216px] h-[48px] rotate-0 opacity-100 rounded-xl flex items-center justify-center gap-3 px-4 py-3 ${
                isActive("/models") ? "bg-[#4D5057]" : "hover:bg-[#3A3D44]"
              }`}
            >
              <div className="w-5 h-5 rotate-0 opacity-100 relative">
                <Network
                  className={`w-[17.92px] h-[17.92px] rotate-0 opacity-100 absolute top-[1.04px] left-[1.04px] ${
                    isActive("/models") ? "text-white" : "text-[#B6BCCA]"
                  }`}
                />
              </div>
              <span
                className={`w-full lg:w-[156px] h-[24px] rotate-0 opacity-100 font-inter font-medium text-base leading-6 tracking-normal ${
                  isActive("/models") ? "text-white" : "text-[#B6BCCA]"
                }`}
              >
                Models
              </span>
            </div>
          </Link>

          <Link to="/gallery" className="block">
            <div
              className={`w-full lg:w-[216px] h-[48px] rotate-0 opacity-100 gap-4 p-3 flex items-center rounded-xl ${
                isActive("/gallery") ? "bg-[#4D5057]" : "hover:bg-[#3A3D44]"
              }`}
            >
              <div className="w-5 h-5 rotate-0 opacity-100 relative">
                <Image
                  className={`w-[17.92px] h-[17.08px] rotate-0 opacity-100 absolute top-[1.88px] left-[1.04px] ${
                    isActive("/gallery") ? "text-white" : "text-[#B6BCCA]"
                  }`}
                />
              </div>
              <span
                className={`w-full lg:w-[156px] h-[24px] rotate-0 opacity-100 font-inter font-medium text-base leading-6 tracking-normal ${
                  isActive("/gallery") ? "text-white" : "text-[#B6BCCA]"
                }`}
              >
                Gallery
              </span>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center w-full lg:w-[216px] h-auto lg:h-[180px] rotate-0 opacity-100 gap-4 lg:gap-6">
        <div className="w-full lg:w-[216px] h-auto lg:h-[108px] flex flex-col items-center rotate-0 opacity-100 gap-3">
          <div className="w-full lg:w-[216px] h-[48px] rotate-0 opacity-100 rounded-xl flex items-center justify-center gap-3 px-4 py-3">
            <div className="w-full lg:w-[216px] h-[48px] rotate-0 opacity-100 gap-4 rounded p-3 flex items-center">
              <div className="w-5 h-5 rotate-0 opacity-100 rounded relative">
                <Settings className="w-[16.96px] h-[17.92px] rotate-0 opacity-100 absolute top-[1.04px] left-[1.52px] text-[#B6BCCA]" />
              </div>
              <span className="w-full lg:w-[156px] h-[24px] rotate-0 opacity-100 font-inter font-medium text-base leading-6 tracking-normal text-[#B6BCCA]">
                Settings
              </span>
            </div>
          </div>
          <div className="w-full lg:w-[216px] h-[48px] rotate-0 opacity-100 rounded-xl flex items-center justify-center gap-3 px-4 py-3">
            <div className="w-full lg:w-[216px] h-[48px] rotate-0 opacity-100 gap-4 rounded p-3 flex items-center">
              <div className="w-5 h-5 rotate-0 opacity-100 rounded relative">
                <LogOut className="w-[16.96px] h-[17.92px] rotate-0 opacity-100 absolute top-[1.04px] left-[1.52px] text-[#B6BCCA]" />
              </div>
              <span className="w-full lg:w-[156px] h-[24px] rotate-0 opacity-100 font-inter font-medium text-base leading-6 tracking-normal text-[#B6BCCA]">
                Log out
              </span>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[216px] h-[48px] rotate-0 opacity-100 rounded-xl bg-[#2E3137] flex">
          {/* Dark */}
          <Button className="flex-1 lg:w-[101px] h-[48px] rotate-0 opacity-100 gap-2 rounded-xl pt-3 pr-4 pb-3 pl-4 bg-[#4D5057] text-lg">
            <div className="w-6 h-6 rotate-0 opacity-100 relative">
              <Moon className="w-[19.37px] h-[20.01px] rotate-0 opacity-100 absolute top-[2px] left-[2px] text-white" />
            </div>
            <span className="w-full lg:w-[37px] h-[24px] rotate-0 opacity-100 font-inter font-bold text-base leading-6 tracking-normal text-center text-white">
              Dark
            </span>
          </Button>
          {/* Light */}
          <Button className="flex-1 lg:w-[104px] h-[48px] rotate-0 opacity-30 gap-2 rounded-xl pt-3 pr-4 pb-3 pl-4 text-lg">
            <div className="w-6 h-6 rotate-0 opacity-100 relative">
              <Sun className="w-5 h-5 rotate-0 opacity-100 absolute top-[2px] left-[2px] text-white" />
            </div>
            <span className="w-full lg:w-[40px] h-[24px] rotate-0 opacity-100 font-inter font-bold text-base leading-6 tracking-normal text-center text-white">
              Light
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
