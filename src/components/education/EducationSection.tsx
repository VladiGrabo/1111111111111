import React from 'react';
import { EducationVideo } from './EducationVideo';
import { WhySection } from './WhySection';

export function EducationSection() {
  const videos = [
    {
      imageUrl: 'https://i.ibb.co/DCfS838/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=kZ3Ql95y0eM',
      title: 'Основы арбитражной торговли',
      description: 'Изучите базовые принципы арбитражной торговли и как на этом зарабатывать'
    },
    {
      imageUrl: 'https://i.ibb.co/6XPBXw7/image.png',
      videoUrl: 'https://www.youtube.com/watch?v=73igE05ezbg',
      title: 'Практические примеры',
      description: 'Разбор реальных примеров арбитражной торговли и стратегий заработка'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Что такое арбитражная торговля?
          </h2>
          <p className="text-xl text-gray-600">
            Изучите основы арбитражной торговли с нашими обучающими материалами
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <EducationVideo key={index} {...video} />
          ))}
        </div>

        <WhySection 
          title="Почему стоит изучить арбитражную торговлю?"
          benefits={[
            'Возможность заработка на разнице курсов валют',
            'Минимальные риски при правильном подходе',
            'Работа из любой точки мира',
            'Возможность автоматизации процессов'
          ]}
        />
      </div>
    </section>
  );
}