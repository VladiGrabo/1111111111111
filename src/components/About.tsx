import React from 'react';

export default function About() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Лицензия */}
        <div className="bg-burgundy-600 text-white rounded-lg p-8 mb-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Лицензированный финансовый консультант</h2>
              <p className="text-burgundy-100">Financial Conduct Authority (FCA)</p>
            </div>
            <div className="text-center">
              <div className="text-sm text-burgundy-200">Номер лицензии</div>
              <div className="text-2xl font-mono font-bold">VXK00059</div>
              <a 
                href="https://register.fca.org.uk/s/individual?id=0034G00002uqkbVQAQ" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block mt-2 text-sm text-burgundy-200 hover:text-white transition-colors"
              >
                Проверить →
              </a>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Фото */}
          <div className="relative">
            <img
              src="https://i.ibb.co/YLT343L/7b63bde98e454e29ae7fbb509de69f1a.jpg"
              alt="Владислав Коновалов"
              className="w-full aspect-[3/4] object-cover object-center rounded-lg shadow-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 rounded-b-lg">
              <p className="text-white text-xl font-medium text-center">
                Владислав Коновалов
              </p>
            </div>
          </div>

          {/* Контент */}
          <div className="space-y-6">
            <div className="prose prose-lg">
              <p>
                Я финансовый консультант с многолетним опытом работы на международных рынках. 
                Помогаю клиентам создавать надежные стратегии инвестирования и управления капиталом.
              </p>
              
              <p>
                Работаю на ведущих европейских биржах, что позволяет мне предлагать 
                клиентам широкие возможности для международных инвестиций.
              </p>
            </div>

            {/* Преимущества лицензии */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Преимущества работы с лицензированным консультантом:
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-2 h-2 bg-burgundy-600 rounded-full"></span>
                  <span>Подтверждённая квалификация и многолетний опыт</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-2 h-2 bg-burgundy-600 rounded-full"></span>
                  <span>Профессиональное финансовое консультирование</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-2 h-2 bg-burgundy-600 rounded-full"></span>
                  <span>Соответствие международным стандартам качества</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-2 h-2 bg-burgundy-600 rounded-full"></span>
                  <span>Защита интересов клиентов на законодательном уровне</span>
                </li>
              </ul>
            </div>

            <p className="text-lg text-gray-600">
              Мой подход — это индивидуальное внимание к целям каждого клиента. 
              Это помогает создавать по-настоящему эффективные стратегии 
              управления капиталом.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}