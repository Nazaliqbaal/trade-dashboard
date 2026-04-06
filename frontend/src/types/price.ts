export interface PriceData {
  symbol: string;
  price: number;
  time: number;
}

export interface HistoryData {
  price: number;
  time: number;
}

export interface TickerHistoryResponse {
  symbol: string;
  history: HistoryData[];
}

export interface Alert {
  id: string;
  symbol: string;
  targetPrice: number;
  condition: "above" | "below";
  triggered: boolean;
}