import React from 'react';
import { Link } from 'react-router-dom';

export function HeroContent() {
  return (
    <div className="flex-1 text-center max-w-3xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        Финансовый консультант & Инвестиционный эксперт
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Помогаю создавать долгосрочные стратегии инвестирования и управления капиталом
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/contact"
          className="bg-burgundy-600 text-white px-8 py-3 rounded-md hover:bg-burgundy-700 text-lg text-center"
        >
          Записаться на консультацию
        </Link>
        <Link
          to="/services"
          className="border-2 border-burgundy-600 text-burgundy-600 px-8 py-3 rounded-md hover:bg-burgundy-50 text-lg text-center"
        >
          Узнать больше
        </Link>
      </div>
    </div>
  );
}