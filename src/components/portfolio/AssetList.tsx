import React from 'react';
import type { Asset } from '../../types/portfolio';
import { AssetCard } from './AssetCard';

interface AssetListProps {
  assets: Asset[];
}

export function AssetList({ assets }: AssetListProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Структура портфеля</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.map((asset, index) => (
          <AssetCard key={index} asset={asset} />
        ))}
      </div>
    </div>
  );
}