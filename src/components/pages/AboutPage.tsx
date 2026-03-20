import React from 'react';
import { useTranslation } from 'react-i18next';
import { Award, Briefcase, Building, Globe, Shield } from 'lucide-react';

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Финансовый консультант с опытом работы на <a href="https://ru.wikipedia.org/wiki/Лондонская_фондовая_биржа" target="_blank" rel="noopener noreferrer" className="text-burgundy-600 hover:text-burgundy-700">Лондонской</a> и <a href="https://ru.wikipedia.org/wiki/Гамбургская_фондовая_биржа" target="_blank" rel="noopener noreferrer" className="text-burgundy-600 hover:text-burgundy-700">Гамбургской</a> биржах
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Помогаю создавать долгосрочные стратегии инвестирования и управления капиталом для обеспеченного будущего
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              <div className="flex items-center gap-4">
                <Globe className="h-8 w-8 text-burgundy-600" />
                <div>
                  <p className="font-semibold">Международный опыт</p>
                  <p className="text-gray-600">Работа с клиентами по всему миру</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Award className="h-8 w-8 text-burgundy-600" />
                <div>
                  <p className="font-semibold">Сертифицированный специалист</p>
                  <p className="text-gray-600">Международные сертификаты</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Shield className="h-8 w-8 text-burgundy-600" />
                <div>
                  <p className="font-semibold">Надежность</p>
                  <p className="text-gray-600">Защита интересов клиентов</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://i.ibb.co/YLT343L/7b63bde98e454e29ae7fbb509de69f1a.jpg"
              alt="Владислав Коновалов"
              className="w-full h-[600px] object-cover object-center rounded-lg shadow-xl"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4 rounded-b-lg">
              <p className="text-white text-lg font-medium text-center">
                Владислав Коновалов
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Опыт работы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-start gap-4">
                <Building className="h-6 w-6 text-burgundy-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Финансовый консультант</h3>
                  <p className="text-gray-600 mb-4">2018 — настоящее время</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Разработка персональных инвестиционных стратегий</li>
                    <li>Управление портфелями клиентов</li>
                    <li>Консультации по финансовому планированию</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-start gap-4">
                <Briefcase className="h-6 w-6 text-burgundy-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Инвестиционный аналитик</h3>
                  <p className="text-gray-600 mb-4">2015 — настоящее время</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Анализ Лондонской и Гамбургской фондовых бирж</li>
                    <li>Формирование инвестиционных рекомендаций</li>
                    <li>Оценка рисков и потенциальной доходности</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}