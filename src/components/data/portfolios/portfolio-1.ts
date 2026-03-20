import type { Portfolio } from '../../types/portfolio';

export const portfolio1: Portfolio = {
  id: 'portfolio-1',
  title: 'Андрей Михайлов',
  currentValue: '156 748,00 $',
  period: '6 мес.',
  growth: '+56.75%',
  strategy: 'Диверсифицированный портфель с фокусом на технологический сектор и криптовалюты',
  riskManagement: 'Распределение рисков между традиционными активами и криптовалютами',
  assets: [
    {
      name: 'NVIDIA (NVDA)',
      symbol: 'NVDA',
      currency: 'USD',
      allocation: '35%',
      value: '54 861,80 $'
    },
    {
      name: 'Apple (AAPL)',
      symbol: 'AAPL',
      currency: 'USD',
      allocation: '25%',
      value: '39 187,00 $'
    },
    {
      name: 'Google (GOOGL)',
      symbol: 'GOOGL',
      currency: 'USD',
      allocation: '15%',
      value: '23 512,20 $'
    },
    {
      name: 'Bitcoin (BTC)',
      symbol: 'BTC',
      currency: 'USD',
      allocation: '15%',
      value: '21 737,40 $'
    },
    {
      name: 'Amazon (AMZN)',
      symbol: 'AMZN',
      currency: 'USD',
      allocation: '5%',
      value: '8 937,40 $'
    },
    {
      name: 'Ethereum (ETH)',
      symbol: 'ETH',
      currency: 'USD',
      allocation: '5%',
      value: '6 737,40 $'
    }
  ]
};