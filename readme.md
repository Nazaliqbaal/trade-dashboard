# Real-Time Trading Dashboard

This is a cryptocurrency trading dashboard built with Node.js/TypeScript backend and React/TypeScript frontend, streaming live price data from Binance WebSocket API.

## Project Overview

Displays live cryptocurrency prices and interactive charts for BTC, ETH, SOL, BNB, XRP, and ADA. Prices are streamed in real-time via WebSocket and historical data is fetched from the Binance Klines REST API.

## Repository Structure

trade-dashboard/
├── backend/                 # Node.js/TypeScript microservice
├── frontend/                # React/TypeScript dashboard
├── docker-compose.yml       # Docker orchestration
└── README.md

## Quick Start

### With Docker (recommended)
```bash
docker compose up --build
```

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend REST API | http://localhost:4000 |
| Swagger API Docs | http://localhost:4000/api-docs |
| WebSocket | ws://localhost:4050 |

### Without Docker

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend (new terminal):**
```bash
cd frontend
npm install
npm run dev
```

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend REST API | http://localhost:4000 |
| Swagger API Docs | http://localhost:4000/api-docs |
| WebSocket | ws://localhost:4050 |

## Architecture

┌─────────────────────────────────────────────────┐
│                   Frontend                        │
│         React + TypeScript + Recharts             │
│   React Query (caching) + WebSocket hook          │
└────────────────────┬────────────────────────────┘
│ HTTP REST + WebSocket
┌────────────────────▼────────────────────────────┐
│                   Backend                         │
│            Node.js + Express + ws                 │
│         REST API (port 4000)                      │
│         WebSocket Server (port 4050)              │
└────────────────────┬────────────────────────────┘
│ WebSocket stream
┌────────────────────▼────────────────────────────┐
│              Binance WebSocket API                │
│     Live ticker stream + Klines REST API          │
└─────────────────────────────────────────────────┘

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Vite |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Data fetching | React Query + Axios |
| Backend | Node.js, Express, TypeScript |
| WebSocket | ws library |
| API Docs | Swagger (swagger-jsdoc + swagger-ui-express) |
| Testing | Jest, ts-jest |
| Containerization | Docker, Docker Compose |

## Features

- Live cryptocurrency price updates via Binance WebSocket
- Real-time chart for selected ticker
- Historical price data from Binance Klines API (15m intervals)
- Switch between tickers via tab navigation
- Client-side caching with React Query
- WebSocket subscription filtering per client
- REST API with Swagger documentation
- Unit tests for backend logic
- Docker containerization
- Mobile responsive UI

## Assumptions & Trade-offs

- **Real Binance data** — connected to live Binance WebSocket stream
- **In-memory store** — `priceStore` uses a Map for simplicity
- **6 tickers** — BTC, ETH, SOL, BNB, XRP, ADA selected as high-volume Binance pairs
- **15m candles** — historical data uses 15-minute intervals showing ~7.5 hours of price history
- **No auth** — authentication not implemented in this version
- **Single WebSocket connection** — one shared connection per client for all subscriptions

## Bonus Features

- ✅ Swagger API documentation at `/api-docs`
- ✅ Real Binance WebSocket stream instead of mock data
- ✅ WebSocket subscription filtering per client
- ✅ Add alerting for price thresholds
- ✅ Docker containerization for both services
- ✅ Client-side caching for historical data (5 min staleTime)
- ✅ Auto-reconnect on WebSocket disconnect
- ✅ Mobile responsive UI