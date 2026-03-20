import type { InvestingPrice, PriceResponse } from './types';
import { CRYPTO_SYMBOLS, STOCK_SYMBOLS, FOREX_SYMBOLS } from './constants';

export function createPriceResponse(
  symbol: string, 
  { price, change24h = 0 }: PriceResponse
): InvestingPrice {
  return {
    symbol,
    price,
    change: (change24h * price) / 100,
    changePercentage: change24h,
    lastUpdate: new Date().toISOString()
  };
}

export function normalizeSymbol(symbol: string): string {
  // For stocks, we need to append /USD if it's not already there
  if (STOCK_SYMBOLS.includes(symbol)) {
    return `${symbol}/USD`;
  }
  return symbol;
}

export function isValidSymbol(symbol: string): boolean {
  const normalizedSymbol = symbol.includes('/') ? symbol : `${symbol}/USD`;
  return (
    CRYPTO_SYMBOLS.includes(normalizedSymbol) ||
    STOCK_SYMBOLS.includes(symbol) ||
    FOREX_SYMBOLS.includes(normalizedSymbol)
  );
}