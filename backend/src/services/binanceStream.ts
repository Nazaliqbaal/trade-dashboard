import WebSocket from "ws";
import { PriceData } from "../models/price";

export const priceStore = new Map<string, PriceData>();

const BINANCE_WS_URL =
  "wss://stream.binance.com:9443/stream?streams=btcusdt@ticker/ethusdt@ticker";

export const startBinanceStream = () => {
  const ws = new WebSocket(BINANCE_WS_URL);

  ws.on("open", () => {
    console.log("Connected to Binance WebSocket");
  });

  ws.on("message", (data) => {
    const parsed = JSON.parse(data.toString());

    const symbol = parsed.data.s;
    const price = parseFloat(parsed.data.c);

    const priceData: PriceData = {
      symbol,
      price,
      timestamp: Date.now(),
    };

    priceStore.set(symbol, priceData);

    console.log(priceData);
  });

  ws.on("close", () => {
    console.log("Close binance web socket");
  });

  ws.on("error", (err) => {
    console.error("Error occured:", err);
  });
};
