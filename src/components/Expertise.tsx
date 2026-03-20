import React from 'react';
import { Award, TrendingUp, Users, Building } from 'lucide-react';

const expertise = [
  {
    icon: <Award className="h-12 w-12 text-burgundy-600" />,
    title: '10+ лет опыта',
    description: 'В сфере финансового консультирования и управления инвестициями'
  },
  {
    icon: <Building className="h-12 w-12 text-burgundy-600" />,
    title: 'Международный опыт',
    description: 'Работа на европейских и международных финансовых рынках'
  },
  {
    icon: <TrendingUp className="h-12 w-12 text-burgundy-600" />,
    title: 'Высокая эффективность',
    description: 'Средняя доходность портфелей клиентов выше рынка'
  }
];

export default function Expertise() {
  return (
    <section id="expertise" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Опыт работы</h2>
          <p className="text-xl text-gray-600">Профессиональный опыт в управлении финансами</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {expertise.map((item, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}