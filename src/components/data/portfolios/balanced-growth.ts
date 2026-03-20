import type { Portfolio } from '../../types/portfolio';

export const balancedGrowthPortfolio: Portfolio = {
  id: 'balanced-growth-50k',
  title: 'Анна Соколова',
  initialInvestment: '50 000,00 €',
  currentValue: '72 500,00 €',
  period: '6 мес.',
  growth: '+45,00%',
  riskLevel: 'Средний риск',
  strategy: 'Сбалансированная стратегия с равномерным распределением между акциями, криптовалютами и золотом',
  riskManagement: 'Диверсификация между различными классами активов для снижения волатильности',
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
          price: '1 650,00 €',
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
      allocation: '25%',
      value: '18 125,00 €',
      transactions: [
        {
          date: '5 июля 2023',
          price: '155,00 $',
          quantity: '100 акций',
          growth: '+16,94%',
          currentValue: '18 125,00 €'
        }
      ]
    },
    {
      name: 'iShares Gold Trust (IAU)',
      symbol: 'IAU',
      quantity: 400,
      currency: 'USD',
      allocation: '25%',
      value: '18 125,00 €',
      transactions: [
        {
          date: '1 июля 2023',
          price: '35,00 $',
          quantity: '400 акций',
          growth: '+12,86%',
          currentValue: '18 125,00 €'
        }
      ]
    },
    {
      name: 'Meta (META)',
      symbol: 'META',
      quantity: 40,
      currency: 'USD',
      allocation: '20%',
      value: '14 500,00 €',
      transactions: [
        {
          date: '15 июня 2023',
          price: '250,00 $',
          quantity: '40 акций',
          growth: '+45,00%',
          currentValue: '14 500,00 €'
        }
      ]
    }
  ]
};