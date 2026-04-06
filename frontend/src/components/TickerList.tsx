import type { PriceData } from "../types/price";
import Tabs from "./Tabs";

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
  const tabs = tickers.map((ticker) => {
    const live = livePrices[ticker.symbol];
    const price = live?.price ?? ticker.price;

    return {
      key: ticker.symbol,
      label: ticker.symbol,
      sublabel: `$${price.toLocaleString()}`,
    };
  });

  return <Tabs tabs={tabs} selected={selected} onSelect={onSelect} />;
}
