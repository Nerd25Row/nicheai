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
import { Link, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import LogoComponent from "./LogoComponent";
import { useSignOut } from "../../features/auth/useAuthMutations";

const MobileNavigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return (
      location.pathname === path ||
      (path === "/" && location.pathname === "/dashboard")
    );
  };
  const logoutMutation = useSignOut();
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden bg-[#00FFFF]">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[280px] bg-[#2E3137] border-[#4D5057]"
      >
        <SheetHeader>
          <SheetTitle className="text-white">
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
              <Link to="/" className="block">
                <div
                  className={`w-full h-[48px] rounded-xl flex items-center gap-3 px-4 py-3 ${
                    isActive("/") ? "bg-[#4D5057]" : "hover:bg-[#3A3D44]"
                  }`}
                >
                  <LayoutDashboard
                    className={`w-5 h-5 ${
                      isActive("/") ? "text-white" : "text-[#B6BCCA]"
                    }`}
                  />
                  <span
                    className={`font-inter font-medium text-base ${
                      isActive("/") ? "text-white" : "text-[#B6BCCA]"
                    }`}
                  >
                    Dashboard
                  </span>
                </div>
              </Link>

              <Link to="/models" className="block">
                <div
                  className={`w-full h-[48px] rounded-xl flex items-center gap-3 px-4 py-3 ${
                    isActive("/models") ? "bg-[#4D5057]" : "hover:bg-[#3A3D44]"
                  }`}
                >
                  <Network
                    className={`w-5 h-5 ${
                      isActive("/models") ? "text-white" : "text-[#B6BCCA]"
                    }`}
                  />
                  <span
                    className={`font-inter font-medium text-base ${
                      isActive("/models") ? "text-white" : "text-[#B6BCCA]"
                    }`}
                  >
                    Models
                  </span>
                </div>
              </Link>

              <Link to="/gallery" className="block">
                <div
                  className={`w-full h-[48px] rounded-xl flex items-center gap-3 px-4 py-3 ${
                    isActive("/gallery") ? "bg-[#4D5057]" : "hover:bg-[#3A3D44]"
                  }`}
                >
                  <Image
                    className={`w-5 h-5 ${
                      isActive("/gallery") ? "text-white" : "text-[#B6BCCA]"
                    }`}
                  />
                  <span
                    className={`font-inter font-medium text-base ${
                      isActive("/gallery") ? "text-white" : "text-[#B6BCCA]"
                    }`}
                  >
                    Gallery
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <div className="w-full h-[48px] rounded-xl flex items-center gap-3 px-4 py-3">
                <Settings className="w-5 h-5 text-[#B6BCCA]" />
                <span className="font-inter font-medium text-base text-[#B6BCCA]">
                  Settings
                </span>
              </div>
              <div
                className="w-full h-[48px] cursor-pointer rounded-xl flex items-center gap-3 px-4 py-3"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5 text-[#B6BCCA]" />
                <span className="font-inter font-medium text-base text-[#B6BCCA]">
                  Log out
                </span>
              </div>
            </div>

            {/* Theme Toggle */}
            <div className="w-full h-[48px] rounded-xl bg-[#2E3137] flex">
              <Button className="flex-1 h-[48px] gap-2 rounded-xl bg-[#4D5057] text-lg">
                <Moon className="w-5 h-5 text-white" />
                <span className="font-inter font-bold text-base text-white">
                  Dark
                </span>
              </Button>
              <Button className="flex-1 h-[48px] gap-2 rounded-xl opacity-30 text-lg">
                <Sun className="w-5 h-5 text-white" />
                <span className="font-inter font-bold text-base text-white">
                  Light
                </span>
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
