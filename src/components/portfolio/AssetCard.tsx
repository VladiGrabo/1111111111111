import React from 'react';
import type { Asset } from '../../types/portfolio';

interface AssetCardProps {
  asset: Asset;
}

export function AssetCard({ asset }: AssetCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{asset.name}</h3>
        <span className="px-3 py-1 bg-burgundy-100 text-burgundy-800 rounded-full text-sm font-medium">
          {asset.allocation}
        </span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Текущая стоимость:</span>
        <span className="text-lg font-semibold text-green-600">{asset.value}</span>
      </div>
    </div>
  );
}