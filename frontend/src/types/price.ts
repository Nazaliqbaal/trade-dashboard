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
