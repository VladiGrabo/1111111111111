import type { Portfolio } from '../../types/portfolio';

export const portfolio6: Portfolio = {
  id: 'portfolio-6',
  title: 'Екатерина Смирнова',
  currentValue: '165 000,00 €',
  period: '6 мес.',
  growth: '+57.14%',
  strategy: 'Высокорисковая стратегия с фокусом на криптовалюты и рост',
  riskManagement: 'Строгий контроль рисков и регулярная ребалансировка портфеля',
  assets: [
    {
      name: 'Bitcoin (BTC)',
      symbol: 'BTC',
      currency: 'USD',
      allocation: '40%',
      value: '66 000,00 €'
    },
    {
      name: 'NVIDIA (NVDA)',
      symbol: 'NVDA',
      currency: 'USD',
      allocation: '25%',
      value: '41 250,00 €'
    },
    {
      name: 'Ethereum (ETH)',
      symbol: 'ETH',
      currency: 'USD',
      allocation: '20%',
      value: '33 000,00 €'
    },
    {
      name: 'Meta (META)',
      symbol: 'META',
      currency: 'USD',
      allocation: '15%',
      value: '24 750,00 €'
    }
  ]
};