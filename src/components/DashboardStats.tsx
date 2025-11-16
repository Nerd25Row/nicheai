import { ArrowUp, ChartLine } from "lucide-react";
import { Progress } from "./ui/progress";

const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  className = "",
  children,
}) => (
  <div
    className={`rounded-[20px] border border-[#4D5057] bg-gray-200 dark:bg-[#2E3137] ${className}`}
  >
    {children}
  </div>
);

const StatLabel: React.FC<React.PropsWithChildren> = ({ children }) => (
  <span className="font-inter text-sm text-gray-600 dark:text-[#B0B3B8]">
    {children}
  </span>
);

const StatValue: React.FC<React.PropsWithChildren> = ({ children }) => (
  <span className="font-inter font-semibold text-2xl dark:text-white">
    {children}
  </span>
);
const DashboardStats = () => {
  return (
    <div className="w-full max-w-[1120px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Credits Used */}
      <Card className="p-5 bg-gray-200 ">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1 flex flex-col">
            <StatLabel>Credits Used</StatLabel>
            <StatValue>2,847</StatValue>
          </div>
          <div className="w-8 h-8 rounded-lg bg-[#2DA9FF33] flex items-center justify-center">
            <img src="/assets/images/credit.svg" className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-5 space-y-2">
          {/* You can tint indicator via child selector below */}
          <Progress
            value={80}
            className="h-2 rounded-full bg-[#374151] [&_[data-slot='progress-indicator']]:bg-[#00FFFF]"
          />
          <div>
            <span className="font-inter text-xs dark:text-[#B0B3B8]">
              of 3,500 credits
            </span>
          </div>
        </div>
      </Card>

      {/* Card 2: API Calls */}
      <Card className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1 flex flex-col">
            <StatLabel>API Calls</StatLabel>
            <StatValue>12,450</StatValue>
          </div>
          <div className="w-8 h-8 rounded-lg bg-[#3DD59833] flex items-center justify-center">
            <ChartLine className="w-4 h-4 text-[#3DD598]" />
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <ArrowUp className="w-[9px] h-[10.5px] text-[#3DD598]" />
          <span className="font-inter text-sm text-[#3DD598]">+12%</span>
          <span className="font-inter text-sm dark:text-[#B0B3B8]">
            vs last month
          </span>
        </div>
      </Card>

      {/* Card 3: Storage Used */}
      <Card className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1 flex flex-col">
            <StatLabel>Storage Used</StatLabel>
            <StatValue>4.2 GB</StatValue>
          </div>
          <div className="w-8 h-8 rounded-lg bg-[#01FF0133] flex items-center justify-center">
            <img src="/assets/images/storage.svg" className="w-[14px] h-4" />
          </div>
        </div>

        <div className="mt-5 space-y-2">
          <Progress
            value={40}
            className="h-2 rounded-full bg-[#374151] [&_[data-slot='progress-indicator']]:bg-[#01FF01]"
          />
          <div>
            <span className="font-inter text-xs dark:text-[#B0B3B8]">
              of 10 GB limit
            </span>
          </div>
        </div>
      </Card>

      {/* Card 4: Next Billing */}
      <Card className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1 flex flex-col">
            <StatLabel>Next Billing</StatLabel>
            <StatValue>Feb 15</StatValue>
          </div>
          <div className="w-8 h-8 rounded-lg bg-[#A855F733] flex items-center justify-center">
            <img src="/assets/images/billing.svg" className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-5">
          <span className="font-inter text-sm dark:text-[#B0B3B8]">
            Pro Plan - $29/month
          </span>
        </div>
      </Card>
    </div>
  );
};

export default DashboardStats;