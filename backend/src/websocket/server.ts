import WebSocket, { WebSocketServer } from "ws";
import { PriceData } from "../models/price";
import { priceStore } from "../store/priceStore";

export const wss = new WebSocketServer({ port: 4050 });

wss.on("connection", (ws: WebSocket) => {
  console.log("Client connected");
   priceStore.forEach((data) => {
     ws.send(JSON.stringify(data));
   });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server running");

export const broadcastPrice = (data: PriceData) => {
  console.log("Broadcast data", data); 

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};
