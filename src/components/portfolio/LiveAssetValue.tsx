import React from 'react';
import { usePrice } from '../../hooks/usePrice';

interface LiveAssetValueProps {
  symbol: string;
  quantity: number;
  currency: 'USD' | 'EUR';
}

export function LiveAssetValue({ symbol, quantity, currency }: LiveAssetValueProps) {
  const { data, error, loading } = usePrice(symbol);

  if (loading) {
    return <div className="text-gray-600">Загрузка...</div>;
  }

  if (error || !data) {
    return <div className="text-red-600">Ошибка загрузки данных</div>;
  }

  const value = quantity * data.price;

  return (
    <div className="space-y-2">
      <div className="text-lg font-semibold text-green-600">
        {new Intl.NumberFormat('ru-RU', {
          style: 'currency',
          currency: currency,
          maximumFractionDigits: 2
        }).format(value)}
      </div>
      <div className="text-sm">
        <span className="text-gray-600">Изменение:</span>
        <span className={`ml-2 ${data.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {data.change24h >= 0 ? '+' : ''}{data.change24h.toFixed(2)}%
        </span>
      </div>
    </div>
  );
}