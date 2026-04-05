import { Router } from "express";
import { priceStore } from "../store/priceStore";
import axios from "axios";

const router = Router();

/**
 * @swagger
 * /tickers:
 *   get:
 *     summary: Get all available tickers with current prices
 *     responses:
 *       200:
 *         description: List of all tickers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   symbol:
 *                     type: string
 *                     example: BTCUSDT
 *                   price:
 *                     type: number
 *                     example: 95000
 *                   time:
 *                     type: number
 *                     example: 1712000000000
 *       500:
 *         description: Internal server error
 */
router.get("/", (req, res) => {
  try {
    const tickers = Array.from(priceStore.values());
    res.json(tickers);
  } catch (error) {
    console.error("Error fetching tickers:", error);
    res.status(500).json({ message: "Failed to fetch tickers" });
  }
});

/**
 * @swagger
 * /tickers/{symbol}:
 *   get:
 *     summary: Get current price for a specific ticker
 *     parameters:
 *       - in: path
 *         name: symbol
 *         required: true
 *         schema:
 *           type: string
 *         example: BTCUSDT
 *     responses:
 *       200:
 *         description: Ticker data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 symbol:
 *                   type: string
 *                   example: BTCUSDT
 *                 price:
 *                   type: number
 *                   example: 95000
 *                 time:
 *                   type: number
 *                   example: 1712000000000
 *       400:
 *         description: Invalid symbol format
 *       404:
 *         description: Ticker not found
 *       500:
 *         description: Internal server error
 */
router.get("/:symbol", (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();

    // validate symbol format — only letters and numbers allowed
    if (!/^[A-Z0-9]+$/.test(symbol)) {
      res.status(400).json({ error: `Invalid symbol format: ${symbol}` });
      return;
    }

    const data = priceStore.get(symbol);

    if (!data) {
      res.status(404).json({ error: `Ticker ${symbol} not found` });
      return;
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching ticker:", error);
    res.status(500).json({ message: "Failed to fetch ticker" });
  }
});

/**
 * @swagger
 * /tickers/{symbol}/history:
 *   get:
 *     summary: Get 15m interval historical price data from Binance
 *     parameters:
 *       - in: path
 *         name: symbol
 *         required: true
 *         schema:
 *           type: string
 *         example: BTCUSDT
 *     responses:
 *       200:
 *         description: Historical price data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 symbol:
 *                   type: string
 *                   example: BTCUSDT
 *                 history:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       price:
 *                         type: number
 *                         example: 95300
 *                       time:
 *                         type: number
 *                         example: 1712000000000
 *       400:
 *         description: Invalid symbol format
 *       500:
 *         description: Failed to fetch historical data
 */
router.get("/:symbol/history", async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();

    // validate symbol format
    if (!/^[A-Z0-9]+$/.test(symbol)) {
      res.status(400).json({ error: `Invalid symbol format: ${symbol}` });
      return;
    }

    const response = await axios.get("https://api.binance.com/api/v3/klines", {
      params: {
        symbol,
        interval: "15m",
        limit: 30,
      },
    });

    const history = response.data.map((candle: any) => ({
      price: parseFloat(candle[4]),
      time: candle[0],
    }));

    res.json({ symbol, history });
  } catch (error) {
    console.error("Error fetching Binance history:", error);
    res.status(500).json({ message: "Failed to fetch historical data" });
  }
});

export default router;
