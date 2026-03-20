import { useState, useEffect } from 'react';
import { getMockPrice } from '../services/price/mock';
import type { PriceData } from '../services/price/types';

export function usePrice(symbol: string) {
  const [data, setData] = useState<PriceData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let intervalId: number;

    async function fetchPrice() {
      try {
        // For now, we'll use mock data for all symbols
        const priceData = getMockPrice(symbol);
        
        if (mounted) {
          setData(priceData);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch price'));
          // Keep the last valid price if available
          setData(prev => prev);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchPrice();
    intervalId = window.setInterval(fetchPrice, 30000);

    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, [symbol]);

  return { data, error, loading };
}