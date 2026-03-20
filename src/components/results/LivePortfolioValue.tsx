import React from 'react';
import { useInvestingPrice } from '../../hooks/useInvestingPrice';
import type { PortfolioAsset } from './portfolioTypes';

interface LivePortfolioValueProps {
  assets: PortfolioAsset[];
}

export function LivePortfolioValue({ assets }: LivePortfolioValueProps) {
  const btc = useInvestingPrice('BTC/USD');
  const eth = useInvestingPrice('ETH/EUR');
  const aapl = useInvestingPrice('AAPL');
  const eurUsd = useInvestingPrice('EUR/USD');

  if (btc.loading || eth.loading || aapl.loading || eurUsd.loading) {
    return <div className="text-gray-600">Загрузка актуальных данных...</div>;
  }

  if (btc.error || eth.error || aapl.error || eurUsd.error) {
    return <div className="text-red-600">Ошибка загрузки данных</div>;
  }

  const totalValue = assets.reduce((total, asset) => {
    let assetValue = 0;
    
    switch (asset.symbol) {
      case 'BTC':
        assetValue = asset.quantity * (btc.priceData?.price || 0);
        if (asset.currency === 'USD') {
          assetValue /= (eurUsd.priceData?.price || 1);
        }
        break;
      case 'ETH':
        assetValue = asset.quantity * (eth.priceData?.price || 0);
        break;
      case 'AAPL':
        assetValue = asset.quantity * (aapl.priceData?.price || 0);
        if (asset.currency === 'USD') {
          assetValue /= (eurUsd.priceData?.price || 1);
        }
        break;
    }
    
    return total + assetValue;
  }, 0);

  return (
    <div className="text-2xl font-bold text-green-600">
      {new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 2
      }).format(totalValue)}
    </div>
  );
}