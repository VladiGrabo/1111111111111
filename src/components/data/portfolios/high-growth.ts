import type { Portfolio } from '../../types/portfolio';

export const highGrowthPortfolio: Portfolio = {
  id: 'high-growth-100k',
  title: 'Михаил Петров',
  initialInvestment: '100 000,00 €',
  currentValue: '156 000,00 €',
  period: '6 мес.',
  growth: '+56,00%',
  riskLevel: 'Высокий риск',
  strategy: 'Агрессивная стратегия роста с диверсификацией между технологическими акциями, криптовалютами и золотом',
  riskManagement: 'Активное управление позициями и распределение между различными классами активов',
  assets: [
    {
      name: 'Bitcoin (BTC)',
      symbol: 'BTC',
      quantity: 1.5,
      currency: 'USD',
      allocation: '35%',
      value: '54 600,00 €',
      transactions: [
        {
          date: '15 июня 2023',
          price: '25 000,00 $',
          quantity: '1.5 BTC',
          growth: '+45,60%',
          currentValue: '54 600,00 €'
        }
      ]
    },
    {
      name: 'NVIDIA (NVDA)',
      symbol: 'NVDA',
      quantity: 100,
      currency: 'USD',
      allocation: '25%',
      value: '39 000,00 €',
      transactions: [
        {
          date: '1 июля 2023',
          price: '280,00 $',
          quantity: '100 акций',
          growth: '+39,29%',
          currentValue: '39 000,00 €'
        }
      ]
    },
    {
      name: 'SPDR Gold Shares (GLD)',
      symbol: 'GLD',
      quantity: 150,
      currency: 'USD',
      allocation: '20%',
      value: '31 200,00 €',
      transactions: [
        {
          date: '10 июня 2023',
          price: '175,00 $',
          quantity: '150 акций',
          growth: '+19,00%',
          currentValue: '31 200,00 €'
        }
      ]
    },
    {
      name: 'Microsoft (MSFT)',
      symbol: 'MSFT',
      quantity: 80,
      currency: 'USD',
      allocation: '20%',
      value: '31 200,00 €',
      transactions: [
        {
          date: '10 июня 2023',
          price: '310,00 $',
          quantity: '80 акций',
          growth: '+25,81%',
          currentValue: '31 200,00 €'
        }
      ]
    }
  ]
};