import WebSocket, { WebSocketServer } from "ws";
import { PriceData } from "../models/price";
import { priceStore } from "../store/priceStore";

export const wss = new WebSocketServer({ port: 4050 });

const subscriptions = new Map<WebSocket, Set<string>>();

wss.on("connection", (ws: WebSocket) => {
  console.log("Client connected");

  subscriptions.set(
    ws,
    new Set(["BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT", "XRPUSDT", "ADAUSDT"]),
  );

  priceStore.forEach((data) => {
    ws.send(JSON.stringify(data));
  });

  ws.on("message", (raw) => {
    try {
      const msg = JSON.parse(raw.toString());

      if (msg.subscribe && Array.isArray(msg.subscribe)) {
        const symbols = msg.subscribe.map((s: string) => s.toUpperCase());
        subscriptions.set(ws, new Set(symbols));
        console.log(`Client subscribed to: ${symbols.join(", ")}`);

        symbols.forEach((symbol: string) => {
          const data = priceStore.get(symbol);
          if (data) ws.send(JSON.stringify(data));
        });
      }
    } catch (err) {
      console.error("Invalid message from client:", err);
    }
  });

  ws.on("close", () => {
    subscriptions.delete(ws);
    console.log("Client disconnected");
  });
});

export const broadcastPrice = (data: PriceData) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      const subs = subscriptions.get(client);

      if (subs && subs.has(data.symbol)) {
        client.send(JSON.stringify(data));
      }
    }
  });
};

console.log("WebSocket server running on port 4050");
