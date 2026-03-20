import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      nav: {
        about: 'Обо мне',
        services: 'Услуги',
        expertise: 'Профессиональный опыт',
        contact: 'Контакты',
        bookConsultation: 'Записаться на консультацию'
      },
      hero: {
        title: 'Финансовый консультант & Инвестиционный эксперт',
        subtitle: 'Помогаю создавать долгосрочные стратегии инвестирования и управления капиталом',
        buttons: {
          consultation: 'Записаться на консультацию',
          learnMore: 'Узнать больше'
        }
      },
      results: {
        title: 'Результаты',
        subtitle: 'Примеры доходности инвестиционных портфелей',
        currentValue: 'Текущая стоимость:',
        returns: 'Доходность:',
        details: 'Подробнее',
        strategy: 'Стратегия',
        riskManagement: 'Управление рисками'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;