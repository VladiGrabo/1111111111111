import { isCryptoSymbol, fetchCryptoPrice } from './crypto';
import { getMockPrice } from './mock';
import { createPriceResponse, normalizeSymbol, isValidSymbol } from './utils';
import type { InvestingPrice } from './types';

export async function fetchPrice(symbol: string): Promise<InvestingPrice> {
  try {
    if (!isValidSymbol(symbol)) {
      throw new Error(`Unsupported symbol: ${symbol}`);
    }

    const normalizedSymbol = normalizeSymbol(symbol);
    const priceData = isCryptoSymbol(normalizedSymbol)
      ? await fetchCryptoPrice(normalizedSymbol)
      : getMockPrice(symbol);

    return createPriceResponse(normalizedSymbol, priceData);
  } catch (error) {
    console.error(`Error fetching price for ${symbol}:`, error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
}