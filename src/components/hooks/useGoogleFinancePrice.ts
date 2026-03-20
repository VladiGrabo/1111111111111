import { useState, useEffect } from 'react';
import { fetchPrice } from '../services/google-finance/client';
import type { GoogleFinancePrice } from '../services/google-finance/types';

export function useGoogleFinancePrice(symbol: string) {
  const [data, setData] = useState<GoogleFinancePrice | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let intervalId: number;

    async function updatePrice() {
      try {
        const priceData = await fetchPrice(symbol);
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

    updatePrice();
    intervalId = window.setInterval(updatePrice, 30000);

    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, [symbol]);

  return { data, error, loading };
}