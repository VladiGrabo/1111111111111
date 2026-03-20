import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { portfolios } from '../data/portfolios';
import { PortfolioOverview } from '../components/portfolio/PortfolioOverview';
import { AssetList } from '../components/portfolio/AssetList';

export default function PortfolioDetailPage() {
  const { id } = useParams();
  const portfolio = portfolios.find(p => p.id === id);

  if (!portfolio) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PortfolioOverview {...portfolio} />
        <AssetList assets={portfolio.assets} />
      </div>
    </div>
  );
}