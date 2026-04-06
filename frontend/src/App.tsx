import { useState } from "react";
import { useTickers, useTickerHistory } from "./hooks/useTickers";
import { useWebSocket } from "./hooks/useWebSokcet";
import TickerList from "./components/TickerList";
import PriceChart from "./components/PriceChart";

const SYMBOLS = [
  "BTCUSDT",
  "ETHUSDT",
  "SOLUSDT",
  "BNBUSDT",
  "XRPUSDT",
  "ADAUSDT",
];

export default function App() {
  const [selected, setSelected] = useState("BTCUSDT");

  const {
    data: tickers = [],
    isLoading,
    isError: isTickersError,
  } = useTickers();
  const {
    data: history = [],
    isLoading: isHistoryLoading,
    isError: isHistoryError,
  } = useTickerHistory(selected);
  const { prices: livePrices } = useWebSocket(SYMBOLS);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen bg-[#0f0f0f] text-gray-400 text-sm">
        Loading tickers...
      </div>
    );

  if (isTickersError)
    return (
      <div className="flex items-center justify-center h-screen bg-[#0f0f0f] text-red-400 text-sm px-4 text-center">
        Failed to load tickers. Please check your connection and try again.
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-[#0f0f0f] text-white">
      <header className="px-4 md:px-6 py-4 border-b border-[#1e1e1e] bg-[#121212]">
        <h1 className="text-lg md:text-xl font-semibold text-[#00c896]">
          Live Trading Dashboard
        </h1>
      </header>

      <div className="bg-[#121212] border-b border-[#1e1e1e] px-4">
        <TickerList
          tickers={tickers}
          livePrices={livePrices}
          selected={selected}
          onSelect={setSelected}
        />
      </div>

      <main className="flex-1 p-4 md:p-6">
        <PriceChart
          symbol={selected}
          history={history}
          isLoading={isHistoryLoading}
          isError={isHistoryError}
        />
      </main>
    </div>
  );
}
