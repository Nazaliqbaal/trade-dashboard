import express from "express";
import { startBinanceStream } from "./services/binanceStream";
import "./websocket/server";
import tickerRoutes from "./routes/tickers";
import cors from "cors";

const app = express();
const PORT = 4000;
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);


app.use(express.json());
app.use("/tickers", tickerRoutes);

app.get("/", (req, res) => {
  res.send("Backend running");
});

startBinanceStream();

app.listen(PORT, () => {
  console.log(`REST API running on port ${PORT}`);
});
