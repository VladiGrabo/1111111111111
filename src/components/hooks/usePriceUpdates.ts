import { useState, useEffect } from 'react';
import { TradingViewClient, PriceUpdate } from '../services/tradingview/client';

const symbols = ['BTCUSD', 'ETHEUR', 'AAPL'];
const client = new TradingViewClient(symbols);

export function usePriceUpdates(symbol: string) {
  const [price, setPrice] = useState<number | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    const handleUpdate = (update: PriceUpdate) => {
      setPrice(update.price);
      setLastUpdate(new Date(update.timestamp));
    };

    client.subscribe(symbol, handleUpdate);
    
    return () => {
      client.unsubscribe(symbol, handleUpdate);
    };
  }, [symbol]);

  return { price, lastUpdate };
}