import { useState } from "react";
import { useTickers, useTickerHistory } from "./hooks/useTickers";
import { useWebSocket } from "./hooks/useWebSokcet";
import { useAlerts } from "./hooks/useAlerts";
import TickerList from "./components/TickerList";
import PriceChart from "./components/PriceChart";
import AlertModal from "./components/AlertModal";
import Toast from "./components/Toast";

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
  const [showAlertModal, setShowAlertModal] = useState(false);

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
  const { alerts, notifications, addAlert, checkAlerts, dismissNotification } =
    useAlerts();
  const { prices: livePrices } = useWebSocket(SYMBOLS, checkAlerts);

  const currentPrice = livePrices[selected]?.price ?? 0;

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
      <header className="px-4 md:px-6 py-4 border-b border-[#1e1e1e] bg-[#121212] flex items-center justify-between">
        <h1 className="text-lg md:text-xl font-semibold text-[#00c896]">
          Live Trading Dashboard
        </h1>
        <button
          onClick={() => setShowAlertModal(true)}
          className="text-sm px-3 py-1.5 rounded-lg border border-[#00c896] text-[#00c896] hover:bg-[#0d2e23] transition-all"
        >
          🔔 Set Alert
        </button>
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
        {alerts.filter((a) => a.symbol === selected && !a.triggered).length >
          0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {alerts
              .filter((a) => a.symbol === selected && !a.triggered)
              .map((alert) => (
                <span
                  key={alert.id}
                  className="text-xs px-3 py-1 rounded-full border border-[#00c896] text-[#00c896] bg-[#0d2e23]"
                >
                  🔔 {alert.condition === "above" ? "↑" : "↓"} $
                  {alert.targetPrice}
                </span>
              ))}
          </div>
        )}

        <PriceChart
          symbol={selected}
          history={history}
          isLoading={isHistoryLoading}
          isError={isHistoryError}
        />
      </main>

      {showAlertModal && (
        <AlertModal
          symbol={selected}
          currentPrice={currentPrice}
          onAdd={addAlert}
          onClose={() => setShowAlertModal(false)}
        />
      )}

      <Toast notifications={notifications} onDismiss={dismissNotification} />
    </div>
  );
}
