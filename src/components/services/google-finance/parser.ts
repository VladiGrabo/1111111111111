import { JSDOM } from 'jsdom';

export function parseGoogleFinanceData(html: string) {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // Find the price element
  const priceElement = document.querySelector('div[data-last-price]');
  const price = priceElement?.getAttribute('data-last-price');

  // Find the change element
  const changeElement = document.querySelector('div[data-change-percent]');
  const changePercent = changeElement?.getAttribute('data-change-percent');

  if (!price || !changePercent) {
    throw new Error('Failed to parse price data');
  }

  return {
    price: parseFloat(price),
    changePercent: parseFloat(changePercent)
  };
}