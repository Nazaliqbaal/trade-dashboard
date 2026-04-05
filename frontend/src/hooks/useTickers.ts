import { useQuery } from "@tanstack/react-query";
import type { HistoryData, PriceData } from "../types/price";
import { fetchTickerHistory, fetchTickers } from "../services/api";

export const useTickers = () => {
  return useQuery<PriceData[]>({
    queryKey: ["tickers"],
    queryFn: fetchTickers,
    refetchInterval: 2000,
    staleTime: 1000,
  });
};

export const useTickerHistory = (symbol: string) => {
  return useQuery<HistoryData[]>({
    queryKey: ["history", symbol],
    queryFn: async () => {
      const res = await fetchTickerHistory(symbol);
      return res.history;
    },
    enabled: !!symbol,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
