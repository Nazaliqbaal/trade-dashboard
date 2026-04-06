# Frontend — Real-Time Trading Dashboard

React/TypeScript dashboard that displays live cryptocurrency prices and charts, using Binance WebSocket stream.

## Structure

frontend/
├── src/
│   ├── components/
│   │   ├── PriceChart.tsx    # Recharts line chart
│   │   ├── TickerList.tsx    # Ticker tab bar
│   │   └── Tabs.tsx          # Reusable tab component
│   ├── hooks/
│   │   ├── useWebSocket.ts   # WebSocket connection + live updates
│   │   └── useTickers.ts     # React Query data fetching
│   ├── services/
│   │   └── api.ts            # Axios API service
│   ├── types/
│   │   └── price.ts          # Shared TypeScript types
│   ├── App.tsx               # Root component
│   ├── main.tsx              # Entry point + React Query provider
│   └── index.css             # Tailwind CSS import
├── Dockerfile
├── .env
└── package.json

## Setup
```bash
npm install
npm run dev
```

## Environment Variables

Create a `.env` file:

VITE_API_URL=http://localhost:4000
VITE_WS_URL=ws://localhost:4050

## Features

### Live Price Updates
- WebSocket connects to backend on mount
- Sends `{ subscribe: [...symbols] }` to backend
- Receives price updates in real time
- Updates ticker tabs and chart simultaneously

### Historical Chart
- Fetches 15 candles of 15m data from backend on ticker select
- Renders as Recharts line chart
- Cached for 5 minutes per symbol via React Query

### Caching Strategy
- History cached with `staleTime: 5 minutes` — switching tickers reuses cache
- Tickers refetch every 2 seconds as fallback
- `refetchOnWindowFocus: false` for history to avoid unnecessary calls

### WebSocket Management
- Single connection shared across all tickers
- Subscription updates without reconnecting

### UI
- Horizontal tab bar for ticker switching (drag to see tabs in smaller screens)
- Responsive — tabs scroll on mobile, chart resizes
- Loading and error states for all data
- Dark theme with Tailwind CSS

## Docker
```bash
# From root folder
docker compose up --build
```

Frontend served via nginx on port 3000.