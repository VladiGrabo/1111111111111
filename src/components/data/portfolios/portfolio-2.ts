import type { Portfolio } from '../../types/portfolio';

export const portfolio2: Portfolio = {
  id: 'portfolio-2',
  title: 'Анна Соколова',
  currentValue: '72 500,00 €',
  period: '6 мес.',
  growth: '+45,00%',
  strategy: 'Сбалансированный портфель с равномерным распределением между акциями и криптовалютами',
  riskManagement: 'Диверсификация между различными классами активов',
  assets: [
    {
      name: 'Ethereum (ETH)',
      symbol: 'ETH',
      quantity: 10,
      currency: 'EUR',
      allocation: '30%',
      value: '21 750,00 €',
      transactions: [
        {
          date: '20 июня 2023',
          quantity: '10 ETH',
          growth: '+31,82%',
          currentValue: '21 750,00 €'
        }
      ]
    },
    {
      name: 'Apple (AAPL)',
      symbol: 'AAPL',
      quantity: 100,
      currency: 'USD',
      allocation: '35%',
      value: '25 375,00 €',
      transactions: [
        {
          date: '5 июля 2023',
          quantity: '100 акций',
          growth: '+16,94%',
          currentValue: '25 375,00 €'
        }
      ]
    },
    {
      name: 'Meta (META)',
      symbol: 'META',
      quantity: 40,
      currency: 'USD',
      allocation: '35%',
      value: '25 375,00 €',
      transactions: [
        {
          date: '15 июня 2023',
          quantity: '40 акций',
          growth: '+45,00%',
          currentValue: '25 375,00 €'
        }
      ]
    }
  ]
};