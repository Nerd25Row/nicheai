import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "./ui/button";
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
  <div
    className={`rounded-[20px] border border-[#4D5057] bg-gray-200 dark:bg-[#2E3137] ${className}`}
  >
    {children}
  </div>
);
const UsageChart = () => {
  return (
    <Card className="w-full max-w-[1120px] p-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <span className="font-inter font-bold dark:text-white text-lg">
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
          <LineChart
            data={usageData}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          >
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
                fill: "var(--chart-xaxis)",
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
                fill: "var(--chart-xaxis)",
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
  );
};

export default UsageChart;
