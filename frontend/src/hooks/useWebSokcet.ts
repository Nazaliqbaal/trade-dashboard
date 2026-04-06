import { useEffect, useRef, useState } from "react";
import type { PriceData } from "../types/price";

const WS_URL = import.meta.env.VITE_WS_URL || "ws://localhost:4050";

export const useWebSocket = (
  symbols: string[],
  onPriceUpdate?: (symbol: string, price: number) => void,
) => {
  const ws = useRef<WebSocket | null>(null);
  const [prices, setPrices] = useState<Record<string, PriceData>>({});

  useEffect(() => {
    ws.current = new WebSocket(WS_URL);

    ws.current.onopen = () => {
      console.log("Connected to WS");
      ws.current?.send(JSON.stringify({ subscribe: symbols }));
    };

    ws.current.onmessage = (event) => {
      const data: PriceData = JSON.parse(event.data);
      setPrices((prev) => ({ ...prev, [data.symbol]: data }));


      onPriceUpdate?.(data.symbol, data.price);
    };

    ws.current.onclose = () => console.log("WS disconnected");
    ws.current.onerror = (err) => console.error("WS error:", err);

    return () => {
      ws.current?.close();
    };
  }, []);

  return { prices };
};
