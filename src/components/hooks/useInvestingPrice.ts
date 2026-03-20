import { useState, useEffect } from 'react';
import { fetchPrice } from '../services/investing/client';
import type { InvestingPrice } from '../services/investing/types';

export function useInvestingPrice(symbol: string) {
  const [priceData, setPriceData] = useState<InvestingPrice | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let intervalId: number;

    async function updatePrice() {
      try {
        const data = await fetchPrice(symbol);
        if (mounted) {
          setPriceData(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch price'));
          // Keep the last valid price if available
          setPriceData(prev => prev);
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

  return { priceData, error, loading };
}