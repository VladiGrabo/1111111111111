import axios from 'axios';
import type { PriceService, PriceData } from './types';

const API_BASE_URL = 'https://api.coingecko.com/api/v3';

export class CoinGeckoService implements PriceService {
  private readonly symbolMap: Record<string, string> = {
    'BTC': 'bitcoin',
    'ETH': 'ethereum'
  };

  async getPrice(symbol: string): Promise<PriceData> {
    const coinId = this.symbolMap[symbol];
    if (!coinId) {
      throw new Error(`Unsupported symbol: ${symbol}`);
    }

    const response = await axios.get(
      `${API_BASE_URL}/simple/price?ids=${coinId}&vs_currencies=usd,eur&include_24h_change=true`
    );

    const data = response.data[coinId];
    return {
      price: data.usd,
      change24h: data.usd_24h_change,
      lastUpdate: new Date()
    };
  }
}