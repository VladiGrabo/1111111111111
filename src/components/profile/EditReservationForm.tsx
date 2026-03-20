import React, { useState } from 'react';
import { X, CreditCard } from 'lucide-react';
import { useExchange } from '../../contexts/ExchangeContext';

interface EditReservationFormProps {
  reservation: ExchangeReservation;
  onClose: () => void;
}

export function EditReservationForm({ reservation, onClose }: EditReservationFormProps) {
  const { updateReservation, maxLimit } = useExchange();
  const [date, setDate] = useState(reservation.date);
  const [amount, setAmount] = useState(reservation.fromAmount);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: reservation.paymentDetails.cardNumber || '',
    cardHolder: reservation.paymentDetails.cardHolder || '',
    expiryDate: reservation.paymentDetails.expiryDate || '',
    bankName: reservation.paymentDetails.bankName || ''
  });

  const MIN_LIMIT = 1500;
  const calculatedAmount = amount * reservation.rate;

  const validateAmount = (value: number) => {
    if (value < MIN_LIMIT) {
      return `Минимальная сумма обмена ${MIN_LIMIT} USDT`;
    }
    const availableLimit = maxLimit + reservation.fromAmount; // Добавляем текущую сумму бронирования к лимиту
    if (value > availableLimit) {
      return `Максимальная сумма обмена ${availableLimit} USDT`;
    }
    return null;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(e.target.value);
    if (!isNaN(newAmount)) {
      setAmount(newAmount);
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 7);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
      formattedValue = formattedValue.substring(0, 19);
    }

    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2, 4);
      }
      formattedValue = formattedValue.substring(0, 5);
    }

    setCardDetails(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) {
      alert('Пожалуйста, выберите дату обмена');
      return;
    }

    const amountError = validateAmount(amount);
    if (amountError) {
      alert(amountError);
      return;
    }

    if (!cardDetails.cardNumber || !cardDetails.bankName || !cardDetails.cardHolder || !cardDetails.expiryDate) {
      alert('Пожалуйста, заполните все данные карты');
      return;
    }

    updateReservation(reservation.id, {
      ...reservation,
      date,
      fromAmount: amount,
      toAmount: calculatedAmount,
      paymentDetails: cardDetails
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-900">Редактирование бронирования</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Сумма обмена (USDT)
            </label>
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              min={MIN_LIMIT}
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-burgundy-500 focus:border-burgundy-500"
            />
            {validateAmount(amount) && (
              <p className="mt-1 text-sm text-red-600">{validateAmount(amount)}</p>
            )}
          </div>

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
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-burgundy-600" />
              <h4 className="font-medium text-gray-900">Данные банковской карты</h4>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Название банка *
              </label>
              <input
                type="text"
                name="bankName"
                required
                value={cardDetails.bankName}
                onChange={handleCardDetailsChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-burgundy-500 focus:border-burgundy-500"
                placeholder="Например: Deutsche Bank"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Номер карты *
              </label>
              <input
                type="text"
                name="cardNumber"
                required
                value={cardDetails.cardNumber}
                onChange={handleCardDetailsChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-burgundy-500 focus:border-burgundy-500"
                placeholder="XXXX XXXX XXXX XXXX"
                maxLength={19}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Владелец карты *
              </label>
              <input
                type="text"
                name="cardHolder"
                required
                value={cardDetails.cardHolder}
                onChange={handleCardDetailsChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-burgundy-500 focus:border-burgundy-500"
                placeholder="Имя и фамилия на карте"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Срок действия *
              </label>
              <input
                type="text"
                name="expiryDate"
                required
                value={cardDetails.expiryDate}
                onChange={handleCardDetailsChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-burgundy-500 focus:border-burgundy-500"
                placeholder="ММ/ГГ"
                maxLength={5}
              />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Отдаете:</span>
              <span className="font-medium">{amount} {reservation.fromCurrency}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Получаете:</span>
              <span className="font-medium">{calculatedAmount.toFixed(2)} {reservation.toCurrency}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Курс обмена:</span>
              <span className="font-medium">1 {reservation.fromCurrency} = {reservation.rate} {reservation.toCurrency}</span>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-burgundy-600 text-white rounded-md hover:bg-burgundy-700"
            >
              Сохранить изменения
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}