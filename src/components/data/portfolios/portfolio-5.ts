import type { Portfolio } from '../../types/portfolio';

export const portfolio5: Portfolio = {
  id: 'portfolio-5',
  title: 'Павел Новиков',
  currentValue: '128 000,00 €',
  period: '6 мес.',
  growth: '+52.38%',
  strategy: 'Диверсифицированная стратегия с акцентом на технологический сектор',
  riskManagement: 'Комплексное управление рисками через секторальную диверсификацию',
  assets: [
    {
      name: 'NVIDIA (NVDA)',
      symbol: 'NVDA',
      currency: 'USD',
      allocation: '30%',
      value: '38 400,00 €'
    },
    {
      name: 'Bitcoin (BTC)',
      symbol: 'BTC',
      currency: 'USD',
      allocation: '25%',
      value: '32 000,00 €'
    },
    {
      name: 'Microsoft (MSFT)',
      symbol: 'MSFT',
      currency: 'USD',
      allocation: '20%',
      value: '25 600,00 €'
    },
    {
      name: 'Google (GOOGL)',
      symbol: 'GOOGL',
      currency: 'USD',
      allocation: '15%',
      value: '19 200,00 €'
    },
    {
      name: 'Amazon (AMZN)',
      symbol: 'AMZN',
      currency: 'USD',
      allocation: '10%',
      value: '12 800,00 €'
    }
  ]
};