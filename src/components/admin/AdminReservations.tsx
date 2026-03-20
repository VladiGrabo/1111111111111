import React, { useState, useEffect } from 'react';
import { formatNumber } from '../../utils/format';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface AdminReservation {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  userRegisteredAt: string;
  fromAmount: number;
  fromCurrency: string;
  toAmount: number;
  toCurrency: string;
  exchangeDate: string;
  createdAt: string;
  status: string;
  exchangeDetails: {
    method: 'crypto-exchange' | 'crypto-wallet' | 'bank';
    exchange?: string;
    wallet?: string;
    walletAddress?: string;
    bankName?: string;
  };
}

export function AdminReservations() {
  const { user } = useAuth();
  const [reservations, setReservations] = useState<AdminReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [pendingAmount, setPendingAmount] = useState(0);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      setError('Недостаточно прав для просмотра бронирований');
      setLoading(false);
      return;
    }

    const loadReservations = async () => {
      try {
        // Get all profiles first
        const profilesSnapshot = await getDocs(collection(db, 'profiles'));
        const profilesMap = new Map();
        profilesSnapshot.docs.forEach(doc => {
          const data = doc.data();
          profilesMap.set(doc.id, {
            name: data.name || 'Нет данных',
            phone: data.phone || 'Нет данных',
            createdAt: data.created_at || data.createdAt || new Date().toISOString()
          });
        });

        // Set up reservations listener
        const reservationsQuery = query(
          collection(db, 'exchange_reservations'),
          orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(reservationsQuery, 
          (snapshot) => {
            const newReservations = snapshot.docs.map(doc => {
              const data = doc.data();
              const userProfile = profilesMap.get(data.userId) || {
                name: 'Нет данных',
                phone: 'Нет данных',
                createdAt: new Date().toISOString()
              };
              
              const exchangeDate = data.exchangeDate || data.date || new Date().toISOString();
              const createdAt = data.createdAt || data.created_at || new Date().toISOString();
              
              return {
                id: doc.id,
                userId: data.userId,
                userName: userProfile.name,
                userPhone: userProfile.phone,
                userRegisteredAt: userProfile.createdAt,
                fromAmount: Number(data.fromAmount) || 0,
                fromCurrency: data.fromCurrency || 'USDT',
                toAmount: Number(data.toAmount) || 0,
                toCurrency: data.toCurrency || 'EUR',
                exchangeDate: exchangeDate,
                createdAt: createdAt,
                status: data.status || 'pending',
                exchangeDetails: data.exchangeDetails || {
                  method: 'bank',
                  bankName: 'Нет данных'
                }
              };
            });

            // Calculate totals
            const total = newReservations.reduce((sum, res) => sum + res.fromAmount, 0);
            const pending = newReservations
              .filter(res => res.status === 'pending')
              .reduce((sum, res) => sum + res.fromAmount, 0);

            setTotalAmount(total);
            setPendingAmount(pending);
            setReservations(newReservations);
            setLoading(false);
            setError(null);
          },
          (error) => {
            console.error('Error fetching reservations:', error);
            setError('Ошибка при загрузке бронирований');
            setLoading(false);
          }
        );

        return () => unsubscribe();
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Ошибка при загрузке данных');
        setLoading(false);
      }
    };

    loadReservations();
  }, [user]);

  async function updateStatus(id: string, status: 'completed' | 'cancelled') {
    if (!user || user.role !== 'admin') {
      toast.error('Недостаточно прав для обновления статуса');
      return;
    }

    try {
      const reservationRef = doc(db, 'exchange_reservations', id);
      await updateDoc(reservationRef, {
        status,
        updatedAt: new Date().toISOString()
      });
      toast.success('Статус бронирования обновлен');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Ошибка при обновлении статуса');
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Вы уверены, что хотите удалить это бронирование?')) {
      return;
    }

    setDeletingId(id);
    try {
      const reservationRef = doc(db, 'exchange_reservations', id);
      await deleteDoc(reservationRef);
      toast.success('Бронирование успешно удалено');
    } catch (error) {
      console.error('Error deleting reservation:', error);
      toast.error('Ошибка при удалении бронирования');
    } finally {
      setDeletingId(null);
    }
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Некорректная дата';
      }
      return date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Некорректная дата';
    }
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Бронирования обменов</h2>
        <div className="mt-2 grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Общая сумма:</p>
            <p className="text-lg font-semibold">{formatNumber(totalAmount)} USDT</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">В ожидании:</p>
            <p className="text-lg font-semibold">{formatNumber(pendingAmount)} USDT</p>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Клиент
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Сумма
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Дата бронирования
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Дата обмена
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Статус
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {reservation.userName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {reservation.userPhone}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {formatNumber(reservation.fromAmount)} {reservation.fromCurrency}
                  </div>
                  <div className="text-sm text-gray-500">
                    → {formatNumber(reservation.toAmount)} {reservation.toCurrency}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {formatDate(reservation.createdAt)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {formatDate(reservation.exchangeDate)}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    reservation.status === 'completed' ? 'bg-green-100 text-green-800' :
                    reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {reservation.status === 'completed' ? 'Выполнен' :
                     reservation.status === 'pending' ? 'Ожидает' : 'Отменен'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    {reservation.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateStatus(reservation.id, 'completed')}
                          className="text-green-600 hover:text-green-900"
                        >
                          Выполнить
                        </button>
                        <button
                          onClick={() => updateStatus(reservation.id, 'cancelled')}
                          className="text-red-600 hover:text-red-900"
                        >
                          Отменить
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDelete(reservation.id)}
                      disabled={deletingId === reservation.id}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {reservations.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  Нет бронирований
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}