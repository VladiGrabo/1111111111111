import { FALLBACK_PRICES } from './constants';
import type { PriceResponse } from './types';

export function getMockPrice(symbol: string): PriceResponse {
  const price = FALLBACK_PRICES[symbol];
  if (!price) {
    throw new Error(`Unsupported symbol: ${symbol}`);
  }
  return price;
}