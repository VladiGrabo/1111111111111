import React from 'react';
import { DollarSign, TrendingUp, Calendar, Shield } from 'lucide-react';

interface PortfolioHeaderProps {
  title: string;
  strategy: string;
  initialInvestment: string;
  currentValue: string;
  period: string;
  riskManagement: string;
}

export function PortfolioHeader({
  title,
  strategy,
  initialInvestment,
  currentValue,
  period,
  riskManagement
}: PortfolioHeaderProps) {
  return (
    <>
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-xl text-gray-600">{strategy}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Общая информация</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <DollarSign className="h-6 w-6 text-burgundy-600" />
              <div>
                <p className="text-gray-600">Начальная инвестиция</p>
                <p className="text-lg font-semibold">{initialInvestment}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
              <div>
                <p className="text-gray-600">Текущая стоимость</p>
                <p className="text-lg font-semibold text-green-600">{currentValue}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Calendar className="h-6 w-6 text-burgundy-600" />
              <div>
                <p className="text-gray-600">Период инвестирования</p>
                <p className="text-lg font-semibold">{period}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Shield className="h-6 w-6 text-burgundy-600" />
              <div>
                <p className="text-gray-600">Управление рисками</p>
                <p className="text-lg">{riskManagement}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}