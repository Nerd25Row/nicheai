import {
  Image,
  LayoutDashboard,
  LogOut,
  Moon,
  Network,
  Settings,
  Sun,
  Menu,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import LogoComponent from "./LogoComponent";
import { useSignOutMutation } from "../../features/auth/useAuthMutations";
import ThemeToggler from "../ThemeToggler";
import { useState } from "react";

const MobileNavigation = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden bg-[#00FFFF] text-black "
          onClick={() => setOpen(true)}
        >
          <Menu className="h-6 w-6 text-inherit"  />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[280px] bg-gray-200 dark:bg-[#2E3137] border-[#4D5057]"
      >
        <SheetHeader>
          <SheetTitle className="dark:text-white">
            {" "}
            {/* Logo */}
            <div className="mb-6">
              <LogoComponent />
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full justify-between mt-8">
          <div className="flex flex-col gap-4">
            {/* Navigation Items */}
            <div className="flex flex-col gap-3">
              <Link to="/" className="block" onClick={() => setOpen(false)}>
                <div
                  className={`w-full h-[48px] rounded-xl flex items-center gap-3 px-4 py-3 ${
                    isActive("/")
                      ? "bg-gray-500 dark:bg-[#4D5057] text-white "
                      : "hover:bg-gray-400 dark:hover:bg-[#3A3D44] text-black dark:text-[#B6BCCA]"
                  }`}
                >
                  <LayoutDashboard className={`w-5 h-5 `} />
                  <span className={`font-inter font-medium text-base`}>
                    Dashboard
                  </span>
                </div>
              </Link>

              <Link
                to="/models"
                className="block"
                onClick={() => setOpen(false)}
              >
                <div
                  className={`w-full h-[48px] rounded-xl flex items-center gap-3 px-4 py-3 ${
                    isActive("/models")
                      ? "bg-gray-500 dark:bg-[#4D5057] text-white "
                      : "hover:bg-gray-400 dark:hover:bg-[#3A3D44] text-black dark:text-[#B6BCCA]"
                  }`}
                >
                  <Network className={`w-5 h-5`} />
                  <span className={`font-inter font-medium text-base `}>
                    Models
                  </span>
                </div>
              </Link>

              <Link
                to="/gallery"
                className="block"
                onClick={() => setOpen(false)}
              >
                <div
                  className={`w-full h-[48px] rounded-xl flex items-center gap-3 px-4 py-3 ${
                    isActive("/gallery")
                      ? "bg-gray-500 dark:bg-[#4D5057] text-white "
                      : "hover:bg-gray-400 dark:hover:bg-[#3A3D44] text-black dark:text-[#B6BCCA]"
                  }`}
                >
                  <Image className={`w-5 h-5 `} />
                  <span className={`font-inter font-medium text-base`}>
                    Gallery
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Link to="/settings" onClick={() => setOpen(false)}>
                <div
                  className={`w-full h-[48px] cursor-pointer rounded-xl flex items-center gap-3 px-4 py-3 ${
                    isActive("/settings")
                      ? "bg-gray-500 dark:bg-[#4D5057] text-white "
                      : "hover:bg-gray-400 dark:hover:bg-[#3A3D44] text-black dark:text-[#B6BCCA]"
                  }`}
                  onClick={() => navigate("/settings")}
                >
                  <Settings className="w-5 h-5 " />
                  <span className="font-inter font-medium text-base ">
                    Settings
                  </span>
                </div>
              </Link>

              <div
                className="w-full h-[48px] cursor-pointer rounded-xl flex items-center gap-3 px-4 py-3 hover:bg-gray-400 dark:hover:bg-[#3A3D44] text-black dark:text-[#B6BCCA]"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5 " />
                <span className="font-inter font-medium text-base ">
                  Log out
                </span>
              </div>
            </div>
            <ThemeToggler setOpen={setOpen}/>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
