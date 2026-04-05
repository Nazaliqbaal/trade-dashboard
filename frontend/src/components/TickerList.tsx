import type { PriceData } from "../types/price";

interface Props {
  tickers: PriceData[];
  livePrices: Record<string, PriceData>;
  selected: string;
  onSelect: (symbol: string) => void;
}

export default function TickerList({
  tickers,
  livePrices,
  selected,
  onSelect,
}: Props) {
  return (
    <div className="ticker-list">
      {tickers.map((ticker) => {
        const live = livePrices[ticker.symbol];
        const price = live?.price ?? ticker.price;

        return (
          <div
            key={ticker.symbol}
            className={`ticker-item ${selected === ticker.symbol ? "active" : ""}`}
            onClick={() => onSelect(ticker.symbol)}
          >
            <span className="ticker-symbol">{ticker.symbol}</span>
            <span className="ticker-price">${price.toLocaleString()}</span>
          </div>
        );
      })}
    </div>
  );
}
