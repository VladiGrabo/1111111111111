import type { Portfolio } from '../../types/portfolio';

export const moderateGrowthPortfolio: Portfolio = {
  id: 'moderate-growth-20k',
  title: 'Дмитрий Волков',
  initialInvestment: '20 000,00 €',
  currentValue: '27 600,00 €',
  period: '6 мес.',
  growth: '+38,00%',
  riskLevel: 'Умеренный риск',
  strategy: 'Умеренная стратегия роста с акцентом на стабильные активы и защитные инструменты',
  riskManagement: 'Преимущественное распределение в надежные компании и золото для защиты капитала',
  assets: [
    {
      name: 'VanEck Gold Miners ETF (GDX)',
      symbol: 'GDX',
      quantity: 200,
      currency: 'USD',
      allocation: '35%',
      value: '9 660,00 €',
      transactions: [
        {
          date: '1 июля 2023',
          price: '40,00 $',
          quantity: '200 акций',
          growth: '+20,75%',
          currentValue: '9 660,00 €'
        }
      ]
    },
    {
      name: 'Google (GOOGL)',
      symbol: 'GOOGL',
      quantity: 30,
      currency: 'USD',
      allocation: '35%',
      value: '9 660,00 €',
      transactions: [
        {
          date: '15 июня 2023',
          price: '115,00 $',
          quantity: '30 акций',
          growth: '+40,00%',
          currentValue: '9 660,00 €'
        }
      ]
    },
    {
      name: 'Ethereum (ETH)',
      symbol: 'ETH',
      quantity: 2,
      currency: 'EUR',
      allocation: '30%',
      value: '8 280,00 €',
      transactions: [
        {
          date: '10 июля 2023',
          price: '1 800,00 €',
          quantity: '2 ETH',
          growth: '+30,00%',
          currentValue: '8 280,00 €'
        }
      ]
    }
  ]
};