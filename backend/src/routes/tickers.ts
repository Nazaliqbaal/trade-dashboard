import { Router } from "express";
import { priceStore } from "../store/priceStore";
import axios from "axios";

const router = Router();

router.get("/", (req, res) => {
  const tickers = Array.from(priceStore.values());
  res.json(tickers);
});

router.get("/:symbol", (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  const data = priceStore.get(symbol);

  if (!data) {
    res.status(404).json({ error: `Ticker ${symbol} not found` });
    return;
  }

  res.json(data);
});

router.get("/:symbol/history", async (req, res) => {
  const { symbol } = req.params;

  try {
    const response = await axios.get("https://api.binance.com/api/v3/klines", {
      params: {
        symbol,
        interval: "15m",
        limit: 30,
      },
    });

    console.log("response");

    const history = response.data.map((candle: any) => ({
      price: parseFloat(candle[4]),
      time: candle[0],
    }));

    res.json({ symbol, history });
  } catch (error) {
    console.error("Error fetching Binance history:", error);
    res.status(500).json({ message: "Failed to fetch history data" });
  }
});

export default router;
