import { WebSocket } from 'ws';

export interface PriceUpdate {
  symbol: string;
  price: number;
  timestamp: number;
}

type PriceCallback = (update: PriceUpdate) => void;

export class TradingViewClient {
  private ws: WebSocket | null = null;
  private subscribers: Map<string, Set<PriceCallback>> = new Map();
  
  constructor(private symbols: string[]) {}

  connect() {
    const wsUrl = `wss://data.tradingview.com/socket.io/websocket`;
    this.ws = new WebSocket(wsUrl);

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data.toString());
        if (data.type === 'price_update') {
          const update: PriceUpdate = {
            symbol: data.symbol,
            price: data.price,
            timestamp: data.timestamp
          };
          
          const callbacks = this.subscribers.get(data.symbol);
          callbacks?.forEach(callback => callback(update));
        }
      } catch (error) {
        console.error('Error processing message:', error);
      }
    };
  }

  subscribe(symbol: string, callback: PriceCallback) {
    if (!this.subscribers.has(symbol)) {
      this.subscribers.set(symbol, new Set());
      // Subscribe to symbol updates
      this.ws?.send(JSON.stringify({
        type: 'subscribe',
        symbol
      }));
    }
    
    this.subscribers.get(symbol)?.add(callback);
  }

  unsubscribe(symbol: string, callback: PriceCallback) {
    const callbacks = this.subscribers.get(symbol);
    if (callbacks) {
      callbacks.delete(callback);
      if (callbacks.size === 0) {
        this.subscribers.delete(symbol);
        // Unsubscribe from symbol updates
        this.ws?.send(JSON.stringify({
          type: 'unsubscribe',
          symbol
        }));
      }
    }
  }

  disconnect() {
    this.ws?.close();
    this.ws = null;
    this.subscribers.clear();
  }
}