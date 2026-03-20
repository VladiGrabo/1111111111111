import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { ReservationForm } from './ReservationForm';
import { useExchange } from '../../contexts/ExchangeContext';
import toast from 'react-hot-toast';

export function CurrencyConverter() {
  const { maxLimit } = useExchange();
  const [amount1, setAmount1] = useState('1');
  const [amount2, setAmount2] = useState('1.44');
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const rate = 1.44; // Fixed rate 1 USDT = 1.44 EUR

  const MIN_LIMIT = 50000;

  const validateAmount = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return null;
    
    if (num < MIN_LIMIT) {
      return `Минимальная сумма обмена ${MIN_LIMIT} USDT`;
    }
    if (num > maxLimit) {
      return `Максимальная сумма обмена ${maxLimit} USDT`;
    }
    return null;
  };

  const handleAmount1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount1(value);
    
    const num = parseFloat(value);
    if (!isNaN(num)) {
      setAmount2((num * rate).toFixed(4)); // Multiply by rate 1.44
      setError(validateAmount(value));
    }
  };

  const handleAmount2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount2(value);
    
    const num = parseFloat(value);
    if (!isNaN(num)) {
      const amount1Value = (num / rate).toFixed(4); // Divide by rate 1.44
      setAmount1(amount1Value);
      setError(validateAmount(amount1Value));
    }
  };

  const handleSwap = () => {
    setIsReversed(!isReversed);
    const temp = amount1;
    setAmount1(amount2);
    setAmount2(temp);
  };

  const handleReservation = () => {
    const num = parseFloat(amount1);
    if (isNaN(num)) {
      setError('Введите корректную сумму');
      toast.error('Введите корректную сумму');
      return;
    }

    const validationError = validateAmount(amount1);
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    setShowReservationForm(true);
  };

  const handleReservationComplete = () => {
    setShowReservationForm(false);
    toast.success('Бронирование успешно создано!');
  };

  const handleReservationError = (error: string) => {
    toast.error(error);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isReversed ? 'Получаете' : 'Отдаете'}
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount1}
              onChange={handleAmount1Change}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-burgundy-500 focus:border-burgundy-500"
              placeholder="0.00"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <span className="text-gray-500">USDT</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleSwap}
          className="mx-auto flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200"
        >
          <ArrowDown className="h-5 w-5 text-gray-600" />
        </button>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isReversed ? 'Отдаете' : 'Получаете'}
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount2}
              onChange={handleAmount2Change}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-burgundy-500 focus:border-burgundy-500"
              placeholder="0.00"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <span className="text-gray-500">EUR</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Курс обмена:</span>
            <span className="font-medium">1 USDT = {rate} EUR</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Лимиты:</span>
            <span className="font-medium">{MIN_LIMIT} - {maxLimit} USDT</span>
          </div>
        </div>

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <button
          onClick={handleReservation}
          disabled={!!error}
          className="w-full bg-burgundy-600 text-white px-6 py-3 rounded-lg hover:bg-burgundy-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Забронировать обмен валюты
        </button>
      </div>

      {showReservationForm && (
        <ReservationForm
          amount={parseFloat(amount1)}
          calculatedAmount={parseFloat(amount2)}
          rate={rate}
          onClose={() => setShowReservationForm(false)}
          onComplete={handleReservationComplete}
          onError={handleReservationError}
        />
      )}
    </div>
  );
}