import {
  Image,
  LayoutDashboard,
  LogOut,
  Network,
  Settings,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoComponent from "./LogoComponent";
import { useSignOutMutation } from "../../features/auth/useAuthMutations";
import ThemeToggler from "../ThemeToggler";
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path: string) => {
    return (
      location.pathname === path ||
      (path === "/" && location.pathname === "/dashboard")
    );
  };

  const logoutMutation = useSignOutMutation();
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="w-full lg:w-[256px] h-auto lg:h-screen flex flex-col justify-between rotate-0 opacity-100 pt-4 lg:pt-8 pr-3 lg:pr-5 pb-4 lg:pb-8 pl-3 lg:pl-5 bg-gray-200 dark:bg-[#2E3137]">
      <div className="flex flex-col w-full lg:w-[216px] h-auto lg:h-[248px] rotate-0 opacity-100 gap-4 lg:gap-8">
        {/* logo */}
        <LogoComponent />
        {/* navigations */}
        <div className="w-full lg:max-w-[216px] h-[168px] rotate-0 opacity-100 gap-3 flex flex-col lg:flex-col">
          <Link to="/" className="block">
            <div
              className={`w-full lg:max-w-[216px] h-[48px] rotate-0 opacity-100 rounded-xl flex items-center justify-center gap-3 px-4 py-3 relative ${
                isActive("/")
                  ? "bg-gray-500 dark:bg-[#4D5057] text-white "
                  : "hover:bg-gray-400 dark:hover:bg-[#3A3D44] text-black dark:text-[#B6BCCA]"
              }`}
            >
              <div className="w-5 h-5 rotate-0 opacity-100 rounded">
                <LayoutDashboard
                  className={`w-[17.08px] h-[17.08px] rotate-0 opacity-100`}
                />
              </div>
              <span
                className={`w-full lg:max-w-[156px] h-[24px] rotate-0 opacity-100 font-inter font-medium text-base leading-6 tracking-normal `}
              >
                Dashboard
              </span>
            </div>
          </Link>

          <Link to="/models" className="block">
            <div
              className={`w-full lg:max-w-[216px] h-[48px] rotate-0 opacity-100 rounded-xl flex items-center justify-center gap-3 px-4 py-3 ${
                isActive("/models")
                  ? "bg-gray-500 dark:bg-[#4D5057] text-white "
                  : "hover:bg-gray-400 dark:hover:bg-[#3A3D44] text-black dark:text-[#B6BCCA]"
              }`}
            >
              <div className="w-5 h-5 rotate-0 opacity-100 relative">
                <Network
                  className={`w-[17.92px] h-[17.92px] rotate-0 opacity-100 absolute top-[1.04px] left-[1.04px]`}
                />
              </div>
              <span
                className={`w-full lg:max-w-[156px] h-[24px] rotate-0 opacity-100 font-inter font-medium text-base leading-6 tracking-normal `}
              >
                Models
              </span>
            </div>
          </Link>

          <Link to="/gallery" className="block">
            <div
              className={`w-full lg:max-w-[216px] h-[48px] rotate-0 opacity-100 gap-4 p-3 flex items-center rounded-xl ${
                isActive("/gallery")
                  ? "bg-gray-500 dark:bg-[#4D5057] text-white "
                  : "hover:bg-gray-400 dark:hover:bg-[#3A3D44] text-black dark:text-[#B6BCCA]"
              }`}
            >
              <div className="w-5 h-5 rotate-0 opacity-100 relative">
                <Image
                  className={`w-[17.92px] h-[17.08px] rotate-0 opacity-100 absolute top-[1.88px] left-[1.04px]`}
                />
              </div>
              <span
                className={`w-full lg:max-w-[156px] h-[24px] rotate-0 opacity-100 font-inter font-medium text-base leading-6 tracking-normal `}
              >
                Gallery
              </span>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center w-full lg:max-w-[216px] h-[180px] rotate-0 opacity-100 gap-4 lg:gap-6">
        <div className="w-full lg:max-w-[216px] h-[108px] flex flex-col items-center rotate-0 opacity-100 gap-3">
          {/* settings */}
          <div
            className={`cursor-pointer w-full lg:max-w-[216px] h-[48px] rotate-0 opacity-100 rounded-xl flex items-center justify-center gap-3 px-4 py-3 ${
              isActive("/settings")
                ? "bg-gray-500 dark:bg-[#4D5057] text-white"
                : "hover:bg-gray-400 dark:hover:bg-[#3A3D44] text-black dark:text-[#B6BCCA]"
            }`}
            onClick={() => navigate("/settings")}
          >
            <div className="w-full lg:max-w-[216px] h-[48px] rotate-0 opacity-100 gap-4 rounded p-3 flex items-center">
              <div className="w-5 h-5 rotate-0 opacity-100 rounded relative">
                <Settings
                  className={`w-[16.96px] h-[17.92px] rotate-0 opacity-100  `}
                />
              </div>
              <span
                className={`w-full lg:max-w-[156px] h-[24px] rotate-0 opacity-100 font-inter font-medium text-base leading-6 tracking-normal  `}
              >
                Settings
              </span>
            </div>
          </div>
          {/* logout */}
          <div
            className="w-full lg:max-w-[216px] h-[48px] cursor-pointer rotate-0 opacity-100 rounded-xl flex items-center justify-center gap-3 px-4 py-3 hover:bg-gray-400 dark:hover:bg-[#3A3D44] text-black dark:text-[#B6BCCA]"
            onClick={handleLogout}
          >
            <div className="w-full lg:w-[216px] h-[48px] rotate-0 opacity-100 gap-4 rounded p-3 flex items-center ">
              <div className="w-5 h-5 rotate-0 opacity-100 rounded relative">
                <LogOut className="w-[16.96px] h-[17.92px] rotate-0 opacity-100  " />
              </div>
              <span className="w-full lg:max-w-[156px] h-[24px] rotate-0 opacity-100 font-inter font-medium text-base leading-6 tracking-normal ">
                Log out
              </span>
            </div>
          </div>
        </div>
        <ThemeToggler />
      </div>
    </div>
  );
};

export default Sidebar;
