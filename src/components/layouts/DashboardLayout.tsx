import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#FFFFFF] dark:bg-[#1E2128]">
      {/* Sidebar - Hidden on mobile, visible on lg+ screens */}
      <div className="hidden lg:block flex-shrink-0">
        <Sidebar />
      </div>
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Dashboard Header */}
        <DashboardHeader />

        {/* Dashboard Content */}
        <div className="flex-1  min-h-0  bg-[#FFFFFF] dark:bg-[#1E2128] overflow-y-auto scrollbar-hidden  mb-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default DashboardLayout;
