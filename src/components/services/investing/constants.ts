export const COINGECKO_API = 'https://api.coingecko.com/api/v3';

// Fallback prices in case API is unavailable
export const FALLBACK_PRICES: Record<string, { price: number; change24h: number }> = {
  'BTC/USD': { price: 96435.99, change24h: 0.73 },
  'ETH/EUR': { price: 3264.28, change24h: 0.00 },
  'AAPL': { price: 259.02, change24h: 0.32 },
  'EUR/USD': { price: 1.0893, change24h: 0 }
};

export const CRYPTO_SYMBOLS = ['BTC/USD', 'ETH/EUR'];
export const STOCK_SYMBOLS = ['AAPL'];
export const FOREX_SYMBOLS = ['EUR/USD'];

export const SYMBOL_MAP: Record<string, { coin: string; currency: string }> = {
  'BTC/USD': { coin: 'bitcoin', currency: 'usd' },
  'ETH/EUR': { coin: 'ethereum', currency: 'eur' }
};