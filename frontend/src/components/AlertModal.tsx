import { useState } from "react";

interface Props {
  symbol: string;
  currentPrice: number;
  onAdd: (
    symbol: string,
    targetPrice: number,
    condition: "above" | "below",
  ) => void;
  onClose: () => void;
}

export default function AlertModal({
  symbol,
  currentPrice,
  onAdd,
  onClose,
}: Props) {
  const [targetPrice, setTargetPrice] = useState(currentPrice.toString());
  const [condition, setCondition] = useState<"above" | "below">("above");

  const handleSubmit = () => {
    const price = parseFloat(targetPrice);
    if (isNaN(price) || price <= 0) return;
    onAdd(symbol, price, condition);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="bg-[#121212] border border-[#1e1e1e] rounded-xl p-6 w-full max-w-sm">
        <h3 className="text-white font-semibold text-lg mb-1">
          Set Price Alert
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          {symbol} — Current: ${currentPrice}
        </p>

        {/* Condition */}
        <div className="flex gap-2 mb-4">
          {(["above", "below"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCondition(c)}
              className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all
                ${
                  condition === c
                    ? "border-[#00c896] bg-[#0d2e23] text-[#00c896]"
                    : "border-[#1e1e1e] text-gray-400 hover:border-[#00c896]"
                }`}
            >
              {c === "above" ? "↑ Above" : "↓ Below"}
            </button>
          ))}
        </div>

        {/* Target price input */}
        <input
          type="number"
          value={targetPrice}
          onChange={(e) => setTargetPrice(e.target.value)}
          className="w-full bg-[#1a1a1a] border border-[#1e1e1e] text-white rounded-lg px-4 py-2 text-sm mb-4 focus:outline-none focus:border-[#00c896]"
          placeholder="Enter target price"
        />

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg border border-[#1e1e1e] text-gray-400 text-sm hover:border-[#00c896] transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-2 rounded-lg bg-[#00c896] text-black text-sm font-semibold hover:bg-[#00b384] transition-all"
          >
            Set Alert
          </button>
        </div>
      </div>
    </div>
  );
}
