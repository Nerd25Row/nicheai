import React from "react";
import TestModels from "./TestModels";
import UsageChart from "./UsageChart";
import DashboardStats from "./DashboardStats";

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen gap-8 p-4 md:p-6 ">
      {/* Top stat cards */}
      <DashboardStats />
      {/* Usage Over Time */}
      <UsageChart />
      {/* Test our models */}
      <TestModels />
    </div>
  );
};

export default Dashboard;
