# Backend — Real-Time Trading Dashboard

Node.js/TypeScript microservice that streams live cryptocurrency prices from Binance and exposes REST and WebSocket APIs.

## Structure

backend/
├── src/
│   ├── routes/
│   │   └── tickers.ts        # REST API endpoints
│   ├── services/
│   │   └── binanceStream.ts  # Binance WebSocket client
│   ├── websocket/
│   │   └── server.ts         # WebSocket server + broadcast
│   ├── store/
│   │   └── priceStore.ts     # In-memory price store
│   ├── models/
│   │   └── price.ts          # TypeScript interfaces
│   ├── swagger.ts            # Swagger config
│   └── index.ts              # App entry point
├── src/tests/
│   ├── priceStore.test.ts
│   ├── broadcastPrice.test.ts
│   ├── klinesMapping.test.ts
│   ├── wsServer.test.ts
│   └── tickerRoutes.test.ts
├── Dockerfile
├── jest.config.ts
├── tsconfig.json
└── package.json

## Setup
```bash
npm install
npm run dev
```

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `4000` | REST API port |
| `WS_PORT` | `4050` | WebSocket server port |
| `NODE_ENV` | `development` | Environment |
| `BINANCE_WS_URL` | Binance stream URL | Binance WebSocket URL |

## API Endpoints

### REST API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/tickers` | Get all tickers with current prices |
| GET | `/tickers/:symbol` | Get current price for a symbol |
| GET | `/tickers/:symbol/history` | Get 15m historical data from Binance |

Full docs at `http://localhost:4000/api-docs`

### WebSocket

Connect to `ws://localhost:4050`

**Subscribe to specific tickers:**
```json
{ "subscribe": ["BTCUSDT", "ETHUSDT"] }
```

**Price update message:**
```json
{ "symbol": "BTCUSDT", "price": 95000, "timestamp": 1712000000000 }
```

**Behavior:**
- On connect — receives current price snapshot for all symbols
- On subscribe message — updates subscription and receives snapshot for new symbols
- On each Binance tick — receives update only for subscribed symbols

## Running Tests
```bash
npm test
```

### Test Coverage

| File | What it tests |
|---|---|
| `priceStore.test.ts` | Store set, get, overwrite, list operations |
| `broadcastPrice.test.ts` | Only open and subscribed clients receive data |
| `klinesMapping.test.ts` | Binance kline parsing — price and timestamp |
| `wsServer.test.ts` | WebSocket connection, subscription, snapshot, disconnect |
| `tickerRoutes.test.ts` | REST API route logic and error handling |

## Data Flow

Binance WebSocket
↓
binanceStream.ts  →  priceStore.set()     (store latest price)
→  broadcastPrice()      (push to clients)
↓
server.ts → client.send() (filtered by subscription)
New client connects
↓
server.ts → priceStore.forEach() → ws.send() (price snapshot)