export interface PriceData {
  symbol: string;
  price: number;
  change24h: number;
  lastUpdate: Date;
}

export interface MockPriceData {
  price: number;
  change24h: number;
}

export interface PriceService {
  getPrice(symbol: string): Promise<PriceData>;
}