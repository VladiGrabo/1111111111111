import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Portfolio } from '../../types/portfolio';

interface ResultCardProps extends Portfolio {}

export function ResultCard({
  id,
  title,
  currentValue,
  growth,
}: ResultCardProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Текущая стоимость:</span>
          <span className="text-lg font-semibold text-green-600">{currentValue}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Доходность:</span>
          <span className="font-bold text-green-600">{growth}</span>
        </div>
      </div>
      <Link
        to={`/portfolio/${id}`}
        className="mt-6 flex items-center justify-center w-full bg-burgundy-600 text-white px-4 py-2 rounded-md hover:bg-burgundy-700 transition-colors"
      >
        Подробнее
        <ArrowUpRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  );
}