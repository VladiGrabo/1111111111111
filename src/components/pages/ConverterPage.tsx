import React from 'react';
import { CurrencyConverter } from '../components/converter/CurrencyConverter';

export default function ConverterPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Обмен валюты</h1>
        </div>
        <CurrencyConverter />
      </div>
    </div>
  );
}