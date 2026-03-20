import type { Portfolio } from '../../types/portfolio';

export const portfolio20k: Portfolio = {
  id: 'portfolio-20k',
  title: 'Елена Морозова',
  currentValue: '20 560,00 €',
  growth: '+25.00%',
  strategy: 'Консервативная стратегия с фокусом на стабильные активы',
  riskManagement: 'Минимизация рисков через диверсификацию и выбор надежных компаний',
  assets: [
    {
      name: 'Microsoft (MSFT)',
      symbol: 'MSFT',
      currency: 'USD',
      allocation: '40%',
      value: '8 224,00 €'
    },
    {
      name: 'Apple (AAPL)',
      symbol: 'AAPL',
      currency: 'USD',
      allocation: '35%',
      value: '7 196,00 €'
    },
    {
      name: 'iShares Gold Trust (IAU)',
      symbol: 'IAU',
      currency: 'USD',
      allocation: '25%',
      value: '5 140,00 €'
    }
  ]
};