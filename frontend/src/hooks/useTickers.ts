import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { HistoryData, PriceData } from "../types/price";

const API_URL = "http://localhost:4000";

export const useTickers = () => {
  return useQuery<PriceData[]>({
    queryKey: ["tickers"],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/tickers`);
      return res.data;
    },
    refetchInterval: 5000,
  });
};

export const useTickerHistory = (symbol: string) => {
  return useQuery<HistoryData[]>({
    queryKey: ["history", symbol],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/tickers/${symbol}/history`);
      return res.data;
    },
    enabled: !!symbol,
  });
};

