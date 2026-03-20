import React from 'react';
import { ResultCard } from './ResultCard';
import { portfolios } from '../../data/portfolios';

export function ResultsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Результаты</h2>
          <p className="text-xl text-gray-600">Примеры доходности инвестиционных портфелей</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolios.length > 0 ? (
            portfolios.map((portfolio) => (
              <ResultCard key={portfolio.id} {...portfolio} />
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-600 py-12">
              Портфели пока не добавлены
            </div>
          )}
        </div>
      </div>
    </section>
  );
}