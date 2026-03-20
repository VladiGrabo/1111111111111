import { MOCK_PRICES } from './constants';
import type { PriceData } from './types';

export function getMockPrice(symbol: string): PriceData {
  const mockData = MOCK_PRICES[symbol];
  if (!mockData) {
    throw new Error(`No mock data available for symbol: ${symbol}`);
  }

  return {
    symbol,
    price: mockData.price,
    change24h: mockData.change24h,
    lastUpdate: new Date()
  };
}