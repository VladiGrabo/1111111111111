import type { Portfolio } from '../../types/portfolio';

export const portfolio40k: Portfolio = {
  id: 'portfolio-40k',
  title: 'Анна Петрова',
  currentValue: '40 052,00 €',
  growth: '+37.80%',
  strategy: 'Сбалансированная стратегия с фокусом на долгосрочный рост',
  riskManagement: 'Активное управление рисками через секторальную диверсификацию',
  assets: [
    {
      name: 'Apple (AAPL)',
      symbol: 'AAPL',
      currency: 'USD',
      allocation: '30%',
      value: '12 015,60 €'
    },
    {
      name: 'Ethereum (ETH)',
      symbol: 'ETH',
      currency: 'USD',
      allocation: '25%',
      value: '10 013,00 €'
    },
    {
      name: 'Microsoft (MSFT)',
      symbol: 'MSFT',
      currency: 'USD',
      allocation: '25%',
      value: '10 013,00 €'
    },
    {
      name: 'Meta (META)',
      symbol: 'META',
      currency: 'USD',
      allocation: '20%',
      value: '8 010,40 €'
    }
  ]
};