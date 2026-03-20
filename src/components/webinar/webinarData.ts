import { TrendingUp, DollarSign, LineChart } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface WebinarFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const webinarFeatures: WebinarFeature[] = [
  {
    icon: TrendingUp,
    title: 'Арбитражные возможности',
    description: 'Как находить и использовать разницу в курсах валют на разных площадках'
  },
  {
    icon: DollarSign,
    title: 'Актуальные стратегии',
    description: 'Практические методы заработка на обмене валют в текущих условиях'
  },
  {
    icon: LineChart,
    title: 'Анализ рынка',
    description: 'Как анализировать рынок и находить лучшие возможности для арбитража'
  }
];