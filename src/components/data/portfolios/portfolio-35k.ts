import type { Portfolio } from '../../types/portfolio';

export const portfolio35k: Portfolio = {
  id: 'portfolio-35k',
  title: 'Максим Иванов',
  currentValue: '36 205,00 €',
  growth: '+32.50%',
  strategy: 'Умеренно-агрессивная стратегия с фокусом на технологический сектор',
  riskManagement: 'Баланс между ростом и стабильностью через диверсификацию',
  assets: [
    {
      name: 'NVIDIA (NVDA)',
      symbol: 'NVDA',
      currency: 'USD',
      allocation: '30%',
      value: '10 861,50 €'
    },
    {
      name: 'Bitcoin (BTC)',
      symbol: 'BTC',
      currency: 'USD',
      allocation: '25%',
      value: '9 051,25 €'
    },
    {
      name: 'Google (GOOGL)',
      symbol: 'GOOGL',
      currency: 'USD',
      allocation: '25%',
      value: '9 051,25 €'
    },
    {
      name: 'Amazon (AMZN)',
      symbol: 'AMZN',
      currency: 'USD',
      allocation: '20%',
      value: '7 241,00 €'
    }
  ]
};