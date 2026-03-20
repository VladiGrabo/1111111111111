import type { Portfolio } from '../../types/portfolio';

export const portfolio8: Portfolio = {
  id: 'portfolio-8',
  title: 'Алексей Федоров',
  currentValue: '225 000,00 €',
  period: '6 мес.',
  growth: '+65.44%',
  strategy: 'Максимально агрессивная стратегия с фокусом на криптовалюты',
  riskManagement: 'Строгий мониторинг позиций и динамическое управление рисками',
  assets: [
    {
      name: 'Bitcoin (BTC)',
      symbol: 'BTC',
      currency: 'USD',
      allocation: '40%',
      value: '90 000,00 €'
    },
    {
      name: 'Ethereum (ETH)',
      symbol: 'ETH',
      currency: 'USD',
      allocation: '25%',
      value: '56 250,00 €'
    },
    {
      name: 'NVIDIA (NVDA)',
      symbol: 'NVDA',
      currency: 'USD',
      allocation: '20%',
      value: '45 000,00 €'
    },
    {
      name: 'Microsoft (MSFT)',
      symbol: 'MSFT',
      currency: 'USD',
      allocation: '15%',
      value: '33 750,00 €'
    }
  ]
};