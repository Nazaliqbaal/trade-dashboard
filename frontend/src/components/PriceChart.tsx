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
}

export default function PriceChart({ symbol, history }: PriceChartProps) {

  const chartData = [
    ...history.map((d) => ({
      price: d.price,
      time: new Date(d.time).toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    })),
  ];

  return (
    <div className="chart-container">
      <h2 className="chart-title">{symbol}</h2>
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
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
