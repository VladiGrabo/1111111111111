export interface Asset {
  name: string;
  symbol: string;
  currency: 'USD' | 'EUR';
  allocation: string;
  value: string;
}

export interface Portfolio {
  id: string;
  title: string;
  currentValue: string;
  growth: string;
  strategy: string;
  riskManagement: string;
  assets: Asset[];
}