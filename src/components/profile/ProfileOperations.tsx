import React from 'react';
import { useExchange } from '../../contexts/ExchangeContext';
import { ExchangeHistory } from './ExchangeHistory';

export function ProfileOperations() {
  const { reservations } = useExchange();

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">История обменов</h2>
      <ExchangeHistory reservations={reservations} />
    </div>
  );
}