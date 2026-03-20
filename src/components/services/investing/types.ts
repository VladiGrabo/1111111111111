export interface InvestingPrice {
  symbol: string;
  price: number;
  change: number;
  changePercentage: number;
  lastUpdate: string;
}

export interface PriceResponse {
  price: number;
  change24h?: number;
}

export type CryptoSymbol = 'BTC/USD' | 'ETH/EUR';
export type StockSymbol = 'AAPL' | 'MSFT';
export type ForexSymbol = 'EUR/USD';
export type SupportedSymbol = CryptoSymbol | StockSymbol | ForexSymbol;