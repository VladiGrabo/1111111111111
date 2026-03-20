import { CoinGeckoService } from './coingecko';
import { MockPriceService } from './mock';
import type { PriceService } from './types';

const coinGeckoService = new CoinGeckoService();
const mockService = new MockPriceService();

export function getPriceService(symbol: string): PriceService {
  if (symbol === 'BTC' || symbol === 'ETH') {
    return coinGeckoService;
  }
  return mockService;
}

export type { PriceData, PriceService } from './types';