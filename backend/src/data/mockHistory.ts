function generateHistory(basePrice: number, points: number) {
  const now = Date.now();
  return Array.from({ length: points }, (_, i) => ({
    price: parseFloat(
      (basePrice + (Math.random() - 0.5) * basePrice * 0.02).toFixed(2),
    ),
    timestamp: now - (points - i) * 60000, // one point per minute
  }));
}

export const mockHistory: Record<
  string,
  { price: number; timestamp: number }[]
> = {
  BTCUSDT: generateHistory(95000, 30),
  ETHUSDT: generateHistory(1800, 30),
  SOLUSDT: generateHistory(130, 30),
};
