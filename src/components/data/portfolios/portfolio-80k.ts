import type { Portfolio } from '../../types/portfolio';

export const portfolio80k: Portfolio = {
  id: 'portfolio-80k',
  title: 'Игорь Соловьев',
  currentValue: '81 860,00 €',
  growth: '+48.15%',
  strategy: 'Диверсифицированная инновационная стратегия с фокусом на развивающиеся технологии',
  riskManagement: 'Комплексное управление рисками через секторальную диверсификацию',
  assets: [
    {
      name: 'Bitcoin (BTC)',
      symbol: 'BTC',
      currency: 'USD',
      allocation: '30%',
      value: '24 558,00 €'
    },
    {
      name: 'NVIDIA (NVDA)',
      symbol: 'NVDA',
      currency: 'USD',
      allocation: '25%',
      value: '20 465,00 €'
    },
    {
      name: 'Apple (AAPL)',
      symbol: 'AAPL',
      currency: 'USD',
      allocation: '20%',
      value: '16 372,00 €'
    },
    {
      name: 'Ethereum (ETH)',
      symbol: 'ETH',
      currency: 'USD',
      allocation: '15%',
      value: '12 279,00 €'
    },
    {
      name: 'Meta (META)',
      symbol: 'META',
      currency: 'USD',
      allocation: '10%',
      value: '8 186,00 €'
    }
  ]
};