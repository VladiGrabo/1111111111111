import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { ArrowUpDown, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
  reservations_count: number;
}

type SortField = 'name' | 'email' | 'created_at' | 'reservations_count';
type SortDirection = 'asc' | 'desc';

export function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [deletingUser, setDeletingUser] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const usersSnapshot = await getDocs(collection(db, 'profiles'));
      const reservationsSnapshot = await getDocs(collection(db, 'exchange_reservations'));

      // Create a map of user IDs to reservation counts
      const reservationCounts = new Map<string, number>();
      reservationsSnapshot.docs.forEach(doc => {
        const userId = doc.data().userId;
        reservationCounts.set(userId, (reservationCounts.get(userId) || 0) + 1);
      });

      const usersData = usersSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          created_at: data.created_at || data.createdAt || '',
          reservations_count: reservationCounts.get(doc.id) || 0
        };
      });

      setUsers(usersData);
    } catch (error) {
      console.error('Error loading users:', error);
      setError('Ошибка при загрузке пользователей');
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Нет данных';
    try {
      return new Date(dateString).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Некорректная дата';
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortedUsers = () => {
    return [...users].sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'email':
          comparison = a.email.localeCompare(b.email);
          break;
        case 'created_at':
          comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          break;
        case 'reservations_count':
          comparison = a.reservations_count - b.reservations_count;
          break;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      return;
    }

    setDeletingUser(userId);
    try {
      // Delete user profile
      await deleteDoc(doc(db, 'profiles', userId));
      
      // Update local state
      setUsers(users.filter(user => user.id !== userId));
      toast.success('Пользователь успешно удален');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Ошибка при удалении пользователя');
    } finally {
      setDeletingUser(null);
    }
  };

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4 text-gray-400" />;
    }
    return (
      <ArrowUpDown 
        className={`h-4 w-4 ${sortDirection === 'asc' ? 'text-burgundy-600' : 'text-burgundy-600 rotate-180'}`} 
      />
    );
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Пользователи</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-2">
                  Имя
                  {renderSortIcon('name')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('email')}
              >
                <div className="flex items-center gap-2">
                  Email
                  {renderSortIcon('email')}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Телефон
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('created_at')}
              >
                <div className="flex items-center gap-2">
                  Дата регистрации
                  {renderSortIcon('created_at')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('reservations_count')}
              >
                <div className="flex items-center gap-2">
                  Кол-во обменов
                  {renderSortIcon('reservations_count')}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {getSortedUsers().map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {user.name || 'Нет данных'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {user.email || 'Нет данных'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {user.phone || 'Нет данных'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {formatDate(user.created_at)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {user.reservations_count}
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    disabled={deletingUser === user.id}
                    className="text-red-600 hover:text-red-900 disabled:opacity-50"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  Нет пользователей
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}