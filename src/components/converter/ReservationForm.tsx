import React, { useState } from 'react';
import { X, CreditCard, Wallet } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useExchange } from '../../contexts/ExchangeContext';
import { useNavigate } from 'react-router-dom';
import { sendEmail, generateReservationEmail } from '../../services/email';

interface ReservationFormProps {
  amount: number;
  calculatedAmount: number;
  rate: number;
  onClose: () => void;
  onComplete: () => void;
  onError: (error: string) => void;
}

type ExchangeMethod = 'crypto-exchange' | 'crypto-wallet' | 'bank';

interface ExchangeDetails {
  method: ExchangeMethod;
  exchange?: string;
  wallet?: string;
  walletAddress?: string;
  bankName?: string;
}

export function ReservationForm({ 
  amount, 
  calculatedAmount, 
  rate, 
  onClose,
  onComplete,
  onError 
}: ReservationFormProps) {
  const { isAuthenticated, user } = useAuth();
  const { addReservation } = useExchange();
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [exchangeMethod, setExchangeMethod] = useState<ExchangeMethod>('crypto-exchange');
  const [exchangeDetails, setExchangeDetails] = useState<ExchangeDetails>({
    method: 'crypto-exchange',
    exchange: 'Binance'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 6);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const handleMethodChange = (method: ExchangeMethod) => {
    setExchangeMethod(method);
    switch (method) {
      case 'crypto-exchange':
        setExchangeDetails({
          method,
          exchange: 'Binance'
        });
        break;
      case 'crypto-wallet':
        setExchangeDetails({
          method,
          wallet: 'Trust Wallet',
          walletAddress: ''
        });
        break;
      case 'bank':
        setExchangeDetails({
          method,
          bankName: ''
        });
        break;
    }
  };

  const sendConfirmationEmail = async () => {
    if (!user?.email) {
      console.error('No user email found');
      return false;
    }

    try {
      const exchangeMethodText = 
        exchangeMethod === 'crypto-exchange' ? 'Криптобиржа' :
        exchangeMethod === 'crypto-wallet' ? 'Криптокошелек' : 
        'Банк';

      const exchangeDetailsText = 
        exchangeMethod === 'crypto-exchange' ? `Биржа: ${exchangeDetails.exchange}` :
        exchangeMethod === 'crypto-wallet' ? `Кошелек: ${exchangeDetails.wallet} (${exchangeDetails.walletAddress})` :
        `Банк: ${exchangeDetails.bankName}`;

      const formattedDate = new Date(date).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const emailHtml = generateReservationEmail({
        userName: user.name || 'Клиент',
        fromAmount: amount,
        fromCurrency: 'USDT',
        toAmount: calculatedAmount,
        toCurrency: 'EUR',
        exchangeDate: formattedDate,
        exchangeMethod: exchangeMethodText,
        exchangeDetails: exchangeDetailsText
      });

      const success = await sendEmail(
        user.email,
        'Подтверждение бронирования обмена валюты',
        emailHtml
      );

      if (!success) {
        onError('Бронирование создано, но возникла проблема с отправкой email-подтверждения. Мы отправим его позже.');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
      onError('Бронирование создано, но возникла проблема с отправкой email-подтверждения. Мы отправим его позже.');
      return false;
    }
  };

  const validateExchangeDetails = (): boolean => {
    switch (exchangeMethod) {
      case 'crypto-exchange':
        if (!exchangeDetails.exchange) {
          setError('Пожалуйста, выберите криптобиржу');
          return false;
        }
        break;
      case 'crypto-wallet':
        if (!exchangeDetails.wallet || !exchangeDetails.walletAddress) {
          setError('Пожалуйста, заполните данные криптокошелька');
          return false;
        }
        break;
      case 'bank':
        if (!exchangeDetails.bankName) {
          setError('Пожалуйста, укажите название банка');
          return false;
        }
        break;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/login', { 
        state: { 
          from: '/converter',
          message: 'Для бронирования обмена необходимо войти в систему' 
        }
      });
      return;
    }

    if (!date) {
      setError('Пожалуйста, выберите дату обмена');
      onError('Пожалуйста, выберите дату обмена');
      return;
    }

    if (!validateExchangeDetails()) {
      onError(error);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Сначала создаем бронирование
      await addReservation({
        userId: user!.id,
        fromAmount: amount,
        fromCurrency: 'USDT',
        toAmount: calculatedAmount,
        toCurrency: 'EUR',
        rate,
        exchangeDate: date,
        status: 'pending',
        exchangeDetails,
        createdAt: new Date().toISOString()
      });

      // Затем пытаемся отправить email
      await sendConfirmationEmail();

      // В любом случае завершаем успешно
      onComplete();
      navigate('/profile', { 
        state: { 
          message: 'Бронирование успешно создано! Подтверждение отправлено на ваш email.' 
        }
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Произошла ошибка при создании бронирования';
      setError(errorMessage);
      onError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-900">Бронирование обмена</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Дата обмена
            </label>
            <input
              type="date"
              required
              min={today}
              max={maxDateStr}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-burgundy-500 focus:border-burgundy-500"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Метод обмена
            </label>
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => handleMethodChange('crypto-exchange')}
                className={`p-4 border rounded-lg text-center ${
                  exchangeMethod === 'crypto-exchange' 
                    ? 'border-burgundy-500 bg-burgundy-50 text-burgundy-700' 
                    : 'border-gray-200 hover:border-burgundy-200'
                }`}
              >
                Биржа
              </button>
              <button
                type="button"
                onClick={() => handleMethodChange('crypto-wallet')}
                className={`p-4 border rounded-lg text-center ${
                  exchangeMethod === 'crypto-wallet'
                    ? 'border-burgundy-500 bg-burgundy-50 text-burgundy-700'
                    : 'border-gray-200 hover:border-burgundy-200'
                }`}
              >
                Кошелек
              </button>
              <button
                type="button"
                onClick={() => handleMethodChange('bank')}
                className={`p-4 border rounded-lg text-center ${
                  exchangeMethod === 'bank'
                    ? 'border-burgundy-500 bg-burgundy-50 text-burgundy-700'
                    : 'border-gray-200 hover:border-burgundy-200'
                }`}
              >
                Банк
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {exchangeMethod === 'crypto-exchange' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Криптобиржа
                </label>
                <select
                  value={exchangeDetails.exchange}
                  onChange={(e) => setExchangeDetails(prev => ({ ...prev, exchange: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-burgundy-500 focus:border-burgundy-500"
                >
                  <option value="Binance">Binance</option>
                  <option value="Bybit">Bybit</option>
                  <option value="Bitget">Bitget</option>
                  <option value="KuCoin">KuCoin</option>
                  <option value="OKX">OKX</option>
                  <option value="Crypto.com">Crypto.com</option>
                </select>
              </div>
            )}

            {exchangeMethod === 'crypto-wallet' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Криптокошелек
                  </label>
                  <select
                    value={exchangeDetails.wallet}
                    onChange={(e) => setExchangeDetails(prev => ({ ...prev, wallet: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-burgundy-500 focus:border-burgundy-500"
                  >
                    <option value="Trust Wallet">Trust Wallet</option>
                    <option value="MetaMask">MetaMask</option>
                    <option value="Coinbase Wallet">Coinbase Wallet</option>
                    <option value="Exodus">Exodus</option>
                    <option value="Ledger">Ledger</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Адрес кошелька
                  </label>
                  <input
                    type="text"
                    value={exchangeDetails.walletAddress}
                    onChange={(e) => setExchangeDetails(prev => ({ ...prev, walletAddress: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-burgundy-500 focus:border-burgundy-500"
                    placeholder="Введите адрес кошелька"
                  />
                </div>
              </>
            )}

            {exchangeMethod === 'bank' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Название банка
                </label>
                <input
                  type="text"
                  value={exchangeDetails.bankName}
                  onChange={(e) => setExchangeDetails(prev => ({ ...prev, bankName: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-burgundy-500 focus:border-burgundy-500"
                  placeholder="Например: Deutsche Bank"
                />
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-50 p-4 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Отдаете:</span>
              <span className="font-medium">{amount} USDT</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Получаете:</span>
              <span className="font-medium">{calculatedAmount} EUR</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Курс обмена:</span>
              <span className="font-medium">1 USDT = {rate} EUR</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-burgundy-600 text-white px-6 py-3 rounded-md hover:bg-burgundy-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Создание бронирования...' : 'Подтвердить бронирование'}
          </button>
        </form>
      </div>
    </div>
  );
}