import React from 'react';
import type { Transaction } from '../../types/portfolio';

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div>
      <h4 className="text-lg font-medium text-gray-900 mb-3">История сделок</h4>
      <div className="space-y-4">
        {transactions.map((tx, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-600">Дата:</span>
                <p className="font-medium">{tx.date}</p>
              </div>
              <div>
                <span className="text-gray-600">Количество:</span>
                <p className="font-medium">{tx.quantity}</p>
              </div>
              <div>
                <span className="text-gray-600">Рост:</span>
                <p className="font-medium text-green-600">{tx.growth}</p>
              </div>
              <div>
                <span className="text-gray-600">Текущая стоимость:</span>
                <p className="font-medium text-green-600">{tx.currentValue}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}