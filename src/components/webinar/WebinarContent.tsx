import React from 'react';
import { TrendingUp, DollarSign, LineChart } from 'lucide-react';

export function WebinarContent() {
  const features = [
    {
      icon: TrendingUp,
      title: 'Арбитражные возможности',
      description: 'Как находить и использовать разницу в курсах валют на разных площадках'
    },
    {
      icon: DollarSign,
      title: 'Актуальные стратегии',
      description: 'Практические методы заработка на обмене валют в текущих условиях'
    },
    {
      icon: LineChart,
      title: 'Анализ рынка',
      description: 'Как анализировать рынок и находить лучшие арбитражные возможности'
    }
  ];

  return (
    <div className="space-y-8">
      {features.map((feature, index) => (
        <div key={index} className="flex items-start gap-4">
          <feature.icon className="h-6 w-6 text-burgundy-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}