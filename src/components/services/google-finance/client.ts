import axios from 'axios';
import { parseGoogleFinanceData } from './parser';
import type { GoogleFinancePrice } from './types';

const GOOGLE_FINANCE_URL = 'https://www.google.com/finance/quote';

export async function fetchPrice(symbol: string): Promise<GoogleFinancePrice> {
  try {
    const response = await axios.get(`${GOOGLE_FINANCE_URL}/${symbol}`, {
      headers: {
        'Accept': 'text/html',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const data = parseGoogleFinanceData(response.data);

    return {
      symbol,
      price: data.price,
      change24h: data.changePercent,
      lastUpdate: new Date()
    };
  } catch (error) {
    console.error(`Error fetching price for ${symbol}:`, error);
    throw error;
  }
}