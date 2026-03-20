export interface AssetTransaction {
  date: string;
  price: string;
  quantity: string;
  growth: string;
  currentValue: string;
}

export interface PortfolioAsset {
  name: string;
  allocation: string;
  value: string;
  symbol: string;
  quantity: number;
  currency: 'USD' | 'EUR';
  transactions: AssetTransaction[];
}

export interface PortfolioDetails {
  assets: PortfolioAsset[];
  strategy: string;
  riskManagement: string;
}

export interface PortfolioResult {
  id: string;
  title: string;
  initialInvestment: string;
  currentValue: string;
  period: string;
  growth: string;
  riskLevel: string;
  details: PortfolioDetails;
}