import type { PortfolioResult } from './portfolioTypes';

export const portfolioResults: PortfolioResult[] = [
  {
    id: 'sofia-kurus',
    title: 'Портфель София Курус',
    initialInvestment: '250 000,00 €',
    currentValue: '421 404,28 €',
    period: '6 месяцев',
    growth: '+85,11%',
    riskLevel: 'Средний риск',
    details: {
      assets: [
        {
          name: 'Bitcoin (BTC)',
          symbol: 'BTC',
          quantity: 2.5,
          currency: 'USD',
          allocation: '52%',
          value: '241 089,98 €',
          transactions: [
            {
              date: '15 мая 2023',
              price: '27 000,00 $',
              quantity: '1.5 BTC',
              growth: '+257,17%',
              currentValue: '144 653,99 €'
            },
            {
              date: '5 авг. 2023',
              price: '43 000,00 $',
              quantity: '1.0 BTC',
              growth: '+124,27%',
              currentValue: '96 435,99 €'
            }
          ]
        },
        {
          name: 'Ethereum (ETH)',
          symbol: 'ETH',
          quantity: 25,
          currency: 'EUR',
          allocation: '18%',
          value: '81 607,00 €',
          transactions: [
            {
              date: '10 июня 2023',
              price: '1 850,00 €',
              quantity: '25 ETH',
              growth: '+76,45%',
              currentValue: '81 607,00 €'
            }
          ]
        },
        {
          name: 'Apple (AAPL)',
          symbol: 'AAPL',
          quantity: 500,
          currency: 'USD',
          allocation: '30%',
          value: '140 080,23 €',
          transactions: [
            {
              date: '23 февр. 2023',
              price: '149,40 $',
              quantity: '500 акций',
              growth: '+73,37%',
              currentValue: '140 080,23 €'
            }
          ]
        }
      ],
      strategy: 'Сбалансированная стратегия с фокусом на криптовалюты и технологические активы',
      riskManagement: 'Диверсификация между различными классами активов и регулярный ребалансинг портфеля'
    }
  }
];