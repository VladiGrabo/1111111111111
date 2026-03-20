import type { Portfolio } from '../../types/portfolio';

export const portfolio4: Portfolio = {
  id: 'portfolio-4',
  title: 'Мария Кузнецова',
  currentValue: '92 500,00 €',
  period: '6 мес.',
  growth: '+48.00%',
  strategy: 'Агрессивная стратегия с фокусом на криптовалюты и технологические компании',
  riskManagement: 'Активное управление рисками через диверсификацию между классами активов',
  assets: [
    {
      name: 'Bitcoin (BTC)',
      symbol: 'BTC',
      currency: 'USD',
      allocation: '35%',
      value: '32 375,00 €'
    },
    {
      name: 'NVIDIA (NVDA)',
      symbol: 'NVDA',
      currency: 'USD',
      allocation: '25%',
      value: '23 125,00 €'
    },
    {
      name: 'Apple (AAPL)',
      symbol: 'AAPL',
      currency: 'USD',
      allocation: '20%',
      value: '18 500,00 €'
    },
    {
      name: 'Ethereum (ETH)',
      symbol: 'ETH',
      currency: 'USD',
      allocation: '20%',
      value: '18 500,00 €'
    }
  ]
};