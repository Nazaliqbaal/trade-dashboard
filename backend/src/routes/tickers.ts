import { Router } from "express";
import { priceStore } from "../store/priceStore";
import { mockHistory } from "../data/mockHistory";

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

router.get("/:symbol/history", (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  const history = mockHistory[symbol];

  if (!history) {
    res.status(404).json({ error: `No history for ${symbol}` });
    return;
  }

  res.json(history);
});

export default router;
