import type { Portfolio } from '../../types/portfolio';

export const portfolio3: Portfolio = {
  id: 'portfolio-3',
  title: 'Дмитрий Волков',
  currentValue: '27 600,00 €',
  period: '6 мес.',
  growth: '+38,00%',
  strategy: 'Технологический портфель с фокусом на лидеров рынка',
  riskManagement: 'Регулярный мониторинг позиций и ребалансировка',
  assets: [
    {
      name: 'Google (GOOGL)',
      symbol: 'GOOGL',
      quantity: 30,
      currency: 'USD',
      allocation: '35%',
      value: '9 660,00 €',
      transactions: [
        {
          date: '15 июня 2023',
          quantity: '30 акций',
          growth: '+40,00%',
          currentValue: '9 660,00 €'
        }
      ]
    },
    {
      name: 'Ethereum (ETH)',
      symbol: 'ETH',
      quantity: 2,
      currency: 'EUR',
      allocation: '30%',
      value: '8 280,00 €',
      transactions: [
        {
          date: '10 июля 2023',
          quantity: '2 ETH',
          growth: '+30,00%',
          currentValue: '8 280,00 €'
        }
      ]
    },
    {
      name: 'Amazon (AMZN)',
      symbol: 'AMZN',
      quantity: 25,
      currency: 'USD',
      allocation: '35%',
      value: '9 660,00 €',
      transactions: [
        {
          date: '1 июля 2023',
          quantity: '25 акций',
          growth: '+35,00%',
          currentValue: '9 660,00 €'
        }
      ]
    }
  ]
};