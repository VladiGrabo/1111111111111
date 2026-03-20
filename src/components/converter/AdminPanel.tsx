import React from 'react';
import { formatNumber } from '../../utils/format';
import { CURRENCY_PAIRS } from './currencyPairs';

interface AdminPanelProps {
  exchangeRates: Record<string, number>;
  onRateChange: (pair: string, rate: number) => void;
  remainingVolume: number;
  reservations: Reservation[];
}

export function AdminPanel({ exchangeRates, onRateChange, remainingVolume, reservations }: AdminPanelProps) {
  const totalReserved = reservations.reduce((sum, res) => sum + res.amount, 0);

  const handleRateChange = (pair: string, value: string) => {
    const rate = parseFloat(value);
    if (!isNaN(rate) && rate > 0) {
      onRateChange(pair, rate);
    }
  };

  return (
    <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Panel</h3>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Exchange Rates</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {CURRENCY_PAIRS.map(pair => {
              const pairString = `${pair.base}/${pair.quote}`;
              return (
                <div key={pairString}>
                  <label className="block text-sm text-gray-600 mb-1">
                    {pair.description}
                  </label>
                  <input
                    type="number"
                    value={exchangeRates[pairString] || ''}
                    onChange={(e) => handleRateChange(pairString, e.target.value)}
                    step="0.0001"
                    min="0.0001"
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-burgundy-500 focus:border-burgundy-500"
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Total Available:</p>
            <p className="font-semibold text-gray-900">{formatNumber(remainingVolume)} USD</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Reserved:</p>
            <p className="font-semibold text-gray-900">{formatNumber(totalReserved)} USD</p>
          </div>
        </div>
      </div>
    </div>
  );
}