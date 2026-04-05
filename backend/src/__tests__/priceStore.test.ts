import { priceStore } from "../store/priceStore";

describe("priceStore", () => {
  beforeEach(() => {
    priceStore.clear();
  });

  it("should store a price entry", () => {
    priceStore.set("BTCUSDT", {
      symbol: "BTCUSDT",
      price: 95000,
      time: Date.now(),
    });
    expect(priceStore.has("BTCUSDT")).toBe(true);
  });

  it("should retrieve correct price for symbol", () => {
    const data = { symbol: "ETHUSDT", price: 1800, time: Date.now() };
    priceStore.set("ETHUSDT", data);
    expect(priceStore.get("ETHUSDT")).toEqual(data);
  });

  it("should return undefined for unknown symbol", () => {
    expect(priceStore.get("something")).toBeUndefined();
  });

  it("should overwrite existing price", () => {
    priceStore.set("BTCUSDT", {
      symbol: "BTCUSDT",
      price: 95000,
      time: Date.now(),
    });
    priceStore.set("BTCUSDT", {
      symbol: "BTCUSDT",
      price: 96000,
      time: Date.now(),
    });
    expect(priceStore.get("BTCUSDT")?.price).toBe(96000);
  });

  it("should return all stored tickers", () => {
    priceStore.set("BTCUSDT", {
      symbol: "BTCUSDT",
      price: 95000,
      time: Date.now(),
    });
    priceStore.set("ETHUSDT", {
      symbol: "ETHUSDT",
      price: 1800,
      time: Date.now(),
    });
    expect(Array.from(priceStore.values())).toHaveLength(2);
  });
});
