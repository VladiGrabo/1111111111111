import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Александр М.',
    role: 'Предприниматель',
    content: 'Благодаря Владиславу мой инвестиционный портфель показал рост на 32% за год. Его глубокое понимание европейских рынков впечатляет.',
    rating: 5
  },
  {
    name: 'Елена К.',
    role: 'IT-специалист',
    content: 'Профессиональный подход к формированию пенсионного портфеля. За 2 года мои накопления выросли значительно больше, чем я ожидала.',
    rating: 5
  },
  {
    name: 'Михаил В.',
    role: 'Врач',
    content: 'Владислав помог мне разработать эффективную стратегию диверсификации активов. Его рекомендации всегда точны и обоснованы.',
    rating: 5
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Отзывы клиентов</h2>
          <p className="text-xl text-gray-600">Что говорят мои клиенты о нашем сотрудничестве</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">{testimonial.content}</p>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}