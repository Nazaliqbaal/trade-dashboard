import express from "express";
import { startBinanceStream } from "./services/binanceStream";

const app = express();
const PORT = 4000;

app.get("/", (req, res) => {
  res.send("Backend Test");
});

startBinanceStream();

app.listen(PORT, () => {
  console.log(`Running server port ${PORT}`);
});
