import React from 'react';
import { useParams } from 'react-router-dom';
import { portfolioResults } from '../components/results/portfolioData';
import { PortfolioHeader } from '../components/portfolio/PortfolioHeader';
import { AssetDetails } from '../components/portfolio/AssetDetails';

export default function CaseStudyPage() {
  const { id } = useParams();
  const portfolio = portfolioResults.find(p => p.id === id);

  if (!portfolio) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Портфель не найден</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PortfolioHeader
          title={portfolio.title}
          strategy={portfolio.details.strategy}
          initialInvestment={portfolio.initialInvestment}
          currentValue={portfolio.currentValue}
          period={portfolio.period}
          riskManagement={portfolio.details.riskManagement}
        />

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Структура портфеля</h2>
          <div className="space-y-8">
            {portfolio.details.assets.map((asset, index) => (
              <AssetDetails key={index} asset={asset} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}