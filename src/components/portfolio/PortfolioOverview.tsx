import React from 'react';
import { TrendingUp, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PortfolioOverviewProps {
  title: string;
  currentValue: string;
  growth: string;
  strategy: string;
  riskManagement: string;
}

export function PortfolioOverview({
  title,
  currentValue,
  growth,
  strategy,
  riskManagement
}: PortfolioOverviewProps) {
  const { t } = useTranslation();

  return (
    <div className="mb-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-xl text-gray-600 mb-8">{strategy}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
              <div>
                <p className="text-gray-600">{t('results.currentValue')}</p>
                <p className="text-lg font-semibold text-green-600">{currentValue}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
              <div>
                <p className="text-gray-600">{t('results.returns')}</p>
                <p className="text-lg font-semibold text-green-600">{growth}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Shield className="h-6 w-6 text-burgundy-600" />
              <div>
                <p className="text-gray-600">{t('results.riskManagement')}</p>
                <p className="text-gray-800">{riskManagement}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}