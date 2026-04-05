describe("klines mapping", () => {
  const mockCandle = [
    1712000000000, //kline open time
    "95100.00",
    "95500.00",
    "94800.00",
    "95300.00", //close price
    "100.5",
  ];

  const mapCandle = (candle: any[]) => ({
    price: parseFloat(candle[4]),
    time: candle[0],
  });

  it("should parse closing price correctly", () => {
    const result = mapCandle(mockCandle);
    expect(result.price).toBe(95300.0);
  });

  it("should parse time correctly", () => {
    const result = mapCandle(mockCandle);
    expect(result.time).toBe(1712000000000);
  });

  it("should return a number for price not a string", () => {
    const result = mapCandle(mockCandle);
    expect(typeof result.price).toBe("number");
  });

  it("should handle multiple candles", () => {
    const candles = [mockCandle, mockCandle, mockCandle];
    const results = candles.map(mapCandle);
    expect(results).toHaveLength(3);
    expect(results.every((r) => r.price === 95300)).toBe(true);
  });
});
