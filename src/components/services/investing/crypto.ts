import axios from 'axios';
import { COINGECKO_API, SYMBOL_MAP, FALLBACK_PRICES } from './constants';
import type { PriceResponse } from './types';

export async function fetchCryptoPrice(symbol: string): Promise<PriceResponse> {
  const mapping = SYMBOL_MAP[symbol];
  if (!mapping) {
    throw new Error(`Unsupported crypto symbol: ${symbol}`);
  }
  
  try {
    const response = await axios.get(
      `${COINGECKO_API}/simple/price?ids=${mapping.coin}&vs_currencies=${mapping.currency}&include_24h_change=true`
    );
    
    const data = response.data[mapping.coin];
    return {
      price: data[mapping.currency],
      change24h: data[`${mapping.currency}_24h_change`]
    };
  } catch (error) {
    // If API fails, use fallback prices
    const fallback = FALLBACK_PRICES[symbol];
    if (!fallback) {
      throw error;
    }
    return fallback;
  }
}

export function isCryptoSymbol(symbol: string): boolean {
  return symbol in SYMBOL_MAP;
}