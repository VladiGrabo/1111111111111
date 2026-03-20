export const CURRENCY_PAIRS = [
  { base: 'USD', quote: 'EUR', description: 'US Dollar / Euro' },
  { base: 'EUR', quote: 'USD', description: 'Euro / US Dollar' },
  { base: 'GBP', quote: 'USD', description: 'British Pound / US Dollar' },
  { base: 'USD', quote: 'CHF', description: 'US Dollar / Swiss Franc' },
  { base: 'USD', quote: 'JPY', description: 'US Dollar / Japanese Yen' },
  { base: 'AUD', quote: 'USD', description: 'Australian Dollar / US Dollar' },
  { base: 'USD', quote: 'CAD', description: 'US Dollar / Canadian Dollar' },
  { base: 'NZD', quote: 'USD', description: 'New Zealand Dollar / US Dollar' }
] as const;

export const DEFAULT_RATES: Record<string, number> = {
  'USD/EUR': 0.92,
  'EUR/USD': 1.09,
  'GBP/USD': 1.27,
  'USD/GBP': 0.79,
  'USD/CHF': 0.86,
  'CHF/USD': 1.16,
  'USD/JPY': 148.5,
  'JPY/USD': 0.0067,
  'AUD/USD': 0.66,
  'USD/AUD': 1.52,
  'USD/CAD': 1.35,
  'CAD/USD': 0.74,
  'NZD/USD': 0.62,
  'USD/NZD': 1.61
};