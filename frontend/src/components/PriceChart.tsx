import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { HistoryData } from "../types/price";

interface PriceChartProps {
  symbol: string;
  history: HistoryData[];
  isLoading: boolean;
  isError: boolean;
}

export default function PriceChart({
  symbol,
  history,
  isLoading,
  isError,
}: PriceChartProps) {
  const chartData = history.map((d) => ({
    price: d.price,
    time: new Date(d.time).toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));

  return (
    <div className="bg-[#121212] border border-[#1e1e1e] rounded-xl md:p-6">
      <h2 className="text-lg font-semibold text-white mb-4">{symbol}</h2>

      {isLoading && (
        <div className="flex items-center justify-center h-full text-gray-500 text-sm">
          Loading chart data...
        </div>
      )}

      {isError && (
        <div className="flex items-center justify-center h-full text-red-400 text-sm">
          Failed to load chart data for {symbol}. Please try again.
        </div>
      )}

      {!isLoading && !isError && chartData.length === 0 && (
        <div className="flex items-center justify-center h-full text-gray-500 text-sm">
          No data available for {symbol}.
        </div>
      )}

      {!isLoading && !isError && chartData.length > 0 && (
        <ResponsiveContainer width="100%" height={450}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 10, fill: "#888" }}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={["auto", "auto"]}
              tick={{ fontSize: 11, fill: "#888" }}
              tickFormatter={(v) => `$${v.toLocaleString()}`}
            />
            <Tooltip
              formatter={(value) => [
                `$${Number(value).toLocaleString()}`,
                "Price",
              ]}
              labelFormatter={(label) => `Time: ${label}`}
              contentStyle={{
                backgroundColor: "#1a1a1a",
                border: "1px solid #333",
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#00c896"
              dot={false}
              strokeWidth={2}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
