import WebSocket from "ws";

describe("broadcastPrice logic", () => {
  const createMockClient = (readyState: number, subscribed: boolean) => ({
    readyState,
    send: jest.fn(),
    subscribed,
  });

  const broadcastPrice = (
    data: { symbol: string; price: number; time: number },
    clients: { readyState: number; send: jest.Mock; subscribed: boolean }[],
  ) => {
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN && client.subscribed) {
        client.send(JSON.stringify(data));
      }
    });
  };

  it("should send to open and subscribed clients", () => {
    const client = createMockClient(WebSocket.OPEN, true);
    broadcastPrice({ symbol: "BTCUSDT", price: 95000, time: Date.now() }, [
      client,
    ]);
    expect(client.send).toHaveBeenCalledTimes(1);
  });

  it("should not send to closed clients", () => {
    const client = createMockClient(WebSocket.CLOSED, true);
    broadcastPrice({ symbol: "BTCUSDT", price: 95000, time: Date.now() }, [
      client,
    ]);
    expect(client.send).not.toHaveBeenCalled();
  });

  it("should not send to unsubscribed clients", () => {
    const client = createMockClient(WebSocket.OPEN, false);
    broadcastPrice({ symbol: "BTCUSDT", price: 95000, time: Date.now() }, [
      client,
    ]);
    expect(client.send).not.toHaveBeenCalled();
  });

  it("should send to multiple subscribed clients", () => {
    const clients = [
      createMockClient(WebSocket.OPEN, true),
      createMockClient(WebSocket.OPEN, true),
      createMockClient(WebSocket.CLOSED, true),
    ];
    broadcastPrice(
      { symbol: "BTCUSDT", price: 95000, time: Date.now() },
      clients,
    );
    expect(clients[0].send).toHaveBeenCalledTimes(1);
    expect(clients[1].send).toHaveBeenCalledTimes(1);
    expect(clients[2].send).not.toHaveBeenCalled();
  });
});
