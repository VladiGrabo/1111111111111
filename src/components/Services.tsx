import React from 'react';
import { ServiceCard } from './services/ServiceCard';
import { servicesData } from './services/servicesData';

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Мои услуги</h2>
          <p className="text-xl text-gray-600">Профессиональные решения для ваших финансовых целей</p>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={index}
              icon={<service.icon className="h-8 w-8" />}
              title={service.title}
              description={service.description}
              details={service.details}
            />
          ))}
        </div>
      </div>
    </section>
  );
}