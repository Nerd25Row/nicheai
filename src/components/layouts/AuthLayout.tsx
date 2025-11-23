import { Outlet } from "react-router-dom";
import ThemeTogglerTwo from "../ThemeTogglerTwo";

const AuthLayout = () => {
  return (
    <div className="relative w-full flex flex-col bg-white dark:bg-[#000000] shadow-[0px_32px_40px_-12px_#00000040] min-h-screen overflow-y-auto scrollbar-hidden  bg-[url('/assets/images/gradient.png')] bg-cover bg-center bg-no-repeat">
      <div className="relative z-10 flex justify-center py-4 min-h-screen">
        <Outlet />
      </div>
      <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
        <ThemeTogglerTwo />
      </div>
    </div>
  );
};

export default AuthLayout;
