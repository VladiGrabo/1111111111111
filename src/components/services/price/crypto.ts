import axios from 'axios';
import { CRYPTO_COMPARE_API } from './constants';
import type { PriceData, CryptoCompareResponse } from './types';

export async function fetchCryptoPrice(symbol: string, currency: 'USD' | 'EUR'): Promise<PriceData> {
  try {
    const response = await axios.get<CryptoCompareResponse>(
      `${CRYPTO_COMPARE_API}/pricemultifull?fsyms=${symbol}&tsyms=USD,EUR`
    );

    const data = response.data.RAW[symbol][currency];
    
    return {
      symbol,
      price: data.PRICE,
      change24h: data.CHANGEPCT24HOUR,
      lastUpdate: new Date()
    };
  } catch (error) {
    throw new Error(`Failed to fetch crypto price: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}