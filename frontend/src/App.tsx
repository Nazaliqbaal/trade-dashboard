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

  const { data: tickers = [], isLoading } = useTickers();
  const { data: history = [] } = useTickerHistory(selected);
  const { prices: livePrices } = useWebSocket(SYMBOLS);

  if (isLoading) return <div className="loading">Loading tickers...</div>;

  return (
    <div className="app">
      <header className="header">
        <h1>Live Trading Dashboard</h1>
      </header>
      <div className="layout">
        <aside className="sidebar">
          <TickerList
            tickers={tickers}
            livePrices={livePrices}
            selected={selected}
            onSelect={setSelected}
          />
        </aside>
        <main className="main">
          <PriceChart symbol={selected} history={history} />
        </main>
      </div>
    </div>
  );
}
