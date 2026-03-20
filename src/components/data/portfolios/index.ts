import type { Portfolio } from '../../types/portfolio';
import { portfolio20k } from './portfolio-20k';
import { portfolio35k } from './portfolio-35k';
import { portfolio40k } from './portfolio-40k';
import { portfolio55k } from './portfolio-55k';
import { portfolio80k } from './portfolio-80k';
import { portfolio1 } from './portfolio-1';

export const portfolios: Portfolio[] = [
  portfolio80k,
  portfolio55k,
  portfolio40k,
  portfolio35k,
  portfolio20k,
  portfolio1
];