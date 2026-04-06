import axios from "axios";
import type { PriceData, TickerHistoryResponse } from "../types/price";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const client = axios.create({
  baseURL: API_URL,
});

export const fetchTickers = async (): Promise<PriceData[]> => {
  const res = await client.get("/tickers");
  return res.data;
};

export const fetchTickerHistory = async (
  symbol: string,
): Promise<TickerHistoryResponse> => {
  const res = await client.get(`/tickers/${symbol}/history`);
  return res.data;
};
