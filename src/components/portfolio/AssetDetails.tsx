import React from 'react';

interface Transaction {
  date: string;
  price: string;
  quantity: string;
  growth: string;
  currentValue: string;
}

interface Asset {
  name: string;
  allocation: string;
  value: string;
  transactions: Transaction[];
  symbol: string;
  quantity: number;
  currency: 'USD' | 'EUR';
}

interface AssetDetailsProps {
  asset: Asset;
}

export function AssetDetails({ asset }: AssetDetailsProps) {
  return (
    <div className="border-b border-gray-200 pb-4 last:border-0">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{asset.name}</h3>
        <span className="text-burgundy-600 font-semibold">{asset.allocation}</span>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-600">Текущая стоимость:</span>
        <span className="text-lg font-semibold text-green-600">{asset.value}</span>
      </div>

      <div className="space-y-4">
        {asset.transactions.map((tx, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p className="text-gray-600">Дата покупки:</p>
              <p className="font-medium">{tx.date}</p>
              
              <p className="text-gray-600">Цена покупки:</p>
              <p className="font-medium">{tx.price}</p>
              
              <p className="text-gray-600">Количество:</p>
              <p className="font-medium">{tx.quantity}</p>
              
              <p className="text-gray-600">Рост:</p>
              <p className="font-medium text-green-600">{tx.growth}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}