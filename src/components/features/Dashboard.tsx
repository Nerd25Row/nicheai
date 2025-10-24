import { ArrowUp, ChartLine } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import React from "react";

const usageData = [
  { name: "1", value: 0 },
  { name: "2", value: 50 },
  { name: "3", value: 100 },
  { name: "4", value: 120 },
  { name: "5", value: 110 },
  { name: "6", value: 90 },
  { name: "7", value: 70 },
  { name: "8", value: 60 },
  { name: "9", value: 100 },
  { name: "10", value: 130 },
  { name: "11", value: 120 },
  { name: "12", value: 100 },
  { name: "13", value: 100 },
  { name: "14", value: 60 },
  { name: "15", value: 50 },
  { name: "16", value: 45 },
  { name: "17", value: 40 },
  { name: "18", value: 60 },
  { name: "19", value: 100 },
  { name: "20", value: 150 },
  { name: "21", value: 320 },
  { name: "22", value: 200 },
  { name: "23", value: 100 },
  { name: "24", value: 50 },
  { name: "25", value: 45 },
  { name: "26", value: 40 },
  { name: "27", value: 60 },
  { name: "28", value: 120 },
  { name: "29", value: 100 },
  { name: "30", value: 0 },
];

const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  className = "",
  children,
}) => (
  <div className={`rounded-[20px] border border-[#4D5057] bg-[#2E3137] ${className}`}>
    {children}
  </div>
);

const StatLabel: React.FC<React.PropsWithChildren> = ({ children }) => (
  <span className="font-inter text-sm text-[#B0B3B8]">{children}</span>
);

const StatValue: React.FC<React.PropsWithChildren> = ({ children }) => (
  <span className="font-inter font-semibold text-2xl text-white">{children}</span>
);

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen gap-8 p-4 md:p-6 bg-[#1E2128]">
      {/* Top stat cards */}
      <div className="w-full max-w-[1120px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Credits Used */}
        <Card className="p-5">
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
              <span className="font-inter text-xs text-[#B0B3B8]">
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
            <span className="font-inter text-sm text-[#B0B3B8]">
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
              <span className="font-inter text-xs text-[#B0B3B8]">
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
            <span className="font-inter text-sm text-[#B0B3B8]">
              Pro Plan - $29/month
            </span>
          </div>
        </Card>
      </div>

      {/* Usage Over Time */}
      <Card className="w-full max-w-[1120px] p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <span className="font-inter font-bold text-white text-lg">
            Usage Over Time
          </span>

          <div className="flex items-center gap-2">
            <Button className="h-[34px] rounded-[6px] bg-[#00FFFF] text-[#1D2027] hover:opacity-90">
              <span className="font-inter text-sm">30 Days</span>
            </Button>
            <Button
              variant="ghost"
              className="h-[34px] rounded-[6px] text-[#B0B3B8] hover:text-white"
            >
              <span className="font-inter text-sm">7 Days</span>
            </Button>
            <Button
              variant="ghost"
              className="h-[34px] rounded-[6px] text-[#B0B3B8] hover:text-white"
            >
              <span className="font-inter text-sm">24 Hours</span>
            </Button>
          </div>
        </div>

        <div className="mt-5 h-[220px] sm:h-[260px] md:h-[300px] lg:h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={usageData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid
                stroke="#36373B"
                strokeWidth={1.43}
                horizontal
                vertical={false}
              />
              <CartesianGrid
                stroke="#36373B"
                strokeWidth={1.43}
                horizontal={false}
                vertical
                strokeDasharray="11.89 11.89"
              />
              <XAxis
                dataKey="name"
                ticks={["1", "12", "24", "30"]}
                tickMargin={10}
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#B0B3B8",
                  fontSize: 12,
                  fontFamily: "Inter",
                  fontWeight: 400,
                }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                ticks={[100, 250, 500]}
                tick={{
                  fill: "#B0B3B8",
                  fontSize: 12,
                  fontFamily: "Mona-Sans",
                  fontWeight: 500,
                }}
              />
              <Line
                type="linear"
                dataKey="value"
                stroke="#01FF01"
                strokeWidth={2}
                dot={false}
                strokeLinejoin="round"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Test our models */}
      <div className="w-full max-w-[1120px]">
        <span className="font-inter font-bold text-2xl text-white">
          Test our models
        </span>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Segmentation */}
          <Card className="p-5 flex flex-col gap-4">
            <div className="relative h-40 sm:h-48 rounded-[8px] overflow-hidden bg-[url('/assets/images/segmentation.svg')] bg-cover bg-no-repeat bg-center flex items-end justify-center">
              <img
                src="/assets/images/segmentation_generated.png"
                className="w-40 h-40 object-contain"
                alt="Segmentation preview"
              />
            </div>
            <div>
              <span className="font-inter font-semibold text-white text-xl">
                Segmentation
              </span>
            </div>
            <div>
              <span className="font-inter text-sm text-[#B0B3B8]">
                Advanced object segmentation and background removal
              </span>
            </div>
          </Card>

          {/* Fusion */}
          <Card className="p-5 flex flex-col gap-4">
            <div className="relative h-40 sm:h-48 rounded-[8px] overflow-hidden bg-[#111825] flex items-end justify-center">
              <img
                src="/assets/images/fusion.png"
                className="w-40 h-40 object-contain"
                alt="Fusion preview"
              />
            </div>
            <div>
              <span className="font-inter font-semibold text-white text-xl">
                Fusion
              </span>
            </div>
            <div>
              <span className="font-inter text-sm text-[#B0B3B8]">
                Intelligent image fusion and composition tools
              </span>
            </div>
          </Card>

          {/* Immersion */}
          <Card className="p-5 flex flex-col gap-4">
            <div className="relative h-40 sm:h-48 rounded-[8px] overflow-hidden bg-[url('/assets/images/immersion.png')] bg-cover bg-no-repeat bg-center" />
            <div>
              <span className="font-inter font-semibold text-white text-xl">
                Immersion
              </span>
            </div>
            <div>
              <span className="font-inter text-sm text-[#B0B3B8]">
                Create immersive visual experiences with AI
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
