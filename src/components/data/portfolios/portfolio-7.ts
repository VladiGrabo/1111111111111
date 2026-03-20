import type { Portfolio } from '../../types/portfolio';

export const portfolio7: Portfolio = {
  id: 'portfolio-7',
  title: 'Виктор Морозов',
  currentValue: '195 000,00 €',
  period: '6 мес.',
  growth: '+62.50%',
  strategy: 'Максимально агрессивная стратегия с фокусом на высокий рост',
  riskManagement: 'Активное управление позициями и хеджирование рисков',
  assets: [
    {
      name: 'Bitcoin (BTC)',
      symbol: 'BTC',
      currency: 'USD',
      allocation: '35%',
      value: '68 250,00 €'
    },
    {
      name: 'NVIDIA (NVDA)',
      symbol: 'NVDA',
      currency: 'USD',
      allocation: '30%',
      value: '58 500,00 €'
    },
    {
      name: 'Ethereum (ETH)',
      symbol: 'ETH',
      currency: 'USD',
      allocation: '20%',
      value: '39 000,00 €'
    },
    {
      name: 'Google (GOOGL)',
      symbol: 'GOOGL',
      currency: 'USD',
      allocation: '15%',
      value: '29 250,00 €'
    }
  ]
};