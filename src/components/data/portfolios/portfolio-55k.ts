import type { Portfolio } from '../../types/portfolio';

export const portfolio55k: Portfolio = {
  id: 'portfolio-55k',
  title: 'Сергей Козлов',
  currentValue: '54 853,00 €',
  growth: '+42.50%',
  strategy: 'Агрессивная стратегия роста с фокусом на высокотехнологичные компании',
  riskManagement: 'Тщательный мониторинг позиций и своевременная ребалансировка портфеля',
  assets: [
    {
      name: 'NVIDIA (NVDA)',
      symbol: 'NVDA',
      currency: 'USD',
      allocation: '35%',
      value: '19 198,55 €'
    },
    {
      name: 'Bitcoin (BTC)',
      symbol: 'BTC',
      currency: 'USD',
      allocation: '25%',
      value: '13 713,25 €'
    },
    {
      name: 'Amazon (AMZN)',
      symbol: 'AMZN',
      currency: 'USD',
      allocation: '20%',
      value: '10 970,60 €'
    },
    {
      name: 'Google (GOOGL)',
      symbol: 'GOOGL',
      currency: 'USD',
      allocation: '20%',
      value: '10 970,60 €'
    }
  ]
};