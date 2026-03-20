import React, { useState } from 'react';
import { formatNumber } from '../../utils/format';
import { ArrowRight, Calendar, CreditCard, Edit2, Trash2 } from 'lucide-react';
import { EditReservationForm } from './EditReservationForm';
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';
import { useExchange } from '../../contexts/ExchangeContext';

interface ExchangeHistoryProps {
  reservations: ExchangeReservation[];
}

export function ExchangeHistory({ reservations }: ExchangeHistoryProps) {
  const { deleteReservation } = useExchange();
  const [editingReservation, setEditingReservation] = useState<ExchangeReservation | null>(null);
  const [deletingReservation, setDeletingReservation] = useState<ExchangeReservation | null>(null);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Некорректная дата';
    }
  };

  if (reservations.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        У вас пока нет забронированных обменов
      </div>
    );
  }

  const handleDelete = (reservation: ExchangeReservation) => {
    setDeletingReservation(reservation);
  };

  const confirmDelete = () => {
    if (deletingReservation) {
      deleteReservation(deletingReservation.id);
      setDeletingReservation(null);
    }
  };

  return (
    <>
      <div className="space-y-4">
        {reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div className="space-y-1">
                  <div className="text-sm text-gray-600">
                    Дата бронирования: {formatDate(reservation.createdAt)}
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    Дата обмена: {formatDate(reservation.exchangeDate)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {reservation.status === 'pending' && (
                  <>
                    <button
                      onClick={() => setEditingReservation(reservation)}
                      className="text-burgundy-600 hover:text-burgundy-700"
                      title="Редактировать"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(reservation)}
                      className="text-red-600 hover:text-red-700"
                      title="Удалить"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </>
                )}
                <span className={`px-3 py-1 rounded-full text-sm ${
                  reservation.status === 'completed' ? 'bg-green-100 text-green-800' :
                  reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {reservation.status === 'completed' ? 'Выполнен' :
                   reservation.status === 'pending' ? 'Ожидает' : 'Отменен'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">Отдаете</p>
                <p className="text-lg font-medium">
                  {formatNumber(reservation.fromAmount)} {reservation.fromCurrency}
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Получаете</p>
                <p className="text-lg font-medium">
                  {formatNumber(reservation.toAmount)} {reservation.toCurrency}
                </p>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
              <p className="text-sm text-gray-500">
                Курс: {reservation.rate} {reservation.toCurrency}
              </p>
              
              {reservation.paymentDetails && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Данные карты</span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    {reservation.paymentDetails.bankName && (
                      <p>Банк: {reservation.paymentDetails.bankName}</p>
                    )}
                    {reservation.paymentDetails.cardHolder && (
                      <p>Владелец: {reservation.paymentDetails.cardHolder}</p>
                    )}
                    {reservation.paymentDetails.cardNumber && (
                      <p>Номер карты: {reservation.paymentDetails.cardNumber}</p>
                    )}
                    {reservation.paymentDetails.expiryDate && (
                      <p>Срок действия: {reservation.paymentDetails.expiryDate}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {editingReservation && (
        <EditReservationForm
          reservation={editingReservation}
          onClose={() => setEditingReservation(null)}
        />
      )}

      {deletingReservation && (
        <DeleteConfirmationDialog
          onConfirm={confirmDelete}
          onCancel={() => setDeletingReservation(null)}
        />
      )}
    </>
  );
}