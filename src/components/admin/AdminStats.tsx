import React, { useState, useEffect } from 'react';
import { Users, RefreshCcw, TrendingUp } from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function AdminStats() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalReservations: 0,
    totalVolume: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verify admin access first
    if (!user) {
      navigate('/login', { replace: true });
      return;
    }

    if (user.role !== 'admin') {
      navigate('/', { replace: true });
      toast.error('Доступ запрещен. Необходимы права администратора.');
      return;
    }

    const loadStats = async () => {
      try {
        // Get completed reservations count and volume
        const completedQuery = query(
          collection(db, 'exchange_reservations'),
          where('status', '==', 'completed')
        );
        const completedSnap = await getDocs(completedQuery);
        
        const totalVolume = completedSnap.docs.reduce(
          (sum, doc) => sum + (doc.data().fromAmount || 0), 
          0
        );

        // Get total users count
        const usersSnap = await getDocs(collection(db, 'profiles'));

        // Get total reservations count
        const reservationsSnap = await getDocs(collection(db, 'exchange_reservations'));

        setStats({
          totalUsers: usersSnap.size,
          totalReservations: reservationsSnap.size,
          totalVolume
        });
      } catch (error) {
        console.error('Error loading stats:', error);
        if (error instanceof Error && error.message.includes('permission-denied')) {
          navigate('/', { replace: true });
          toast.error('Доступ запрещен. Необходимы права администратора.');
        } else {
          toast.error('Ошибка при загрузке статистики');
        }
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [user, navigate]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-[200px]">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-burgundy-600 border-t-transparent"></div>
    </div>;
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-4">
          <Users className="h-10 w-10 text-burgundy-600" />
          <div>
            <p className="text-gray-600">Всего пользователей</p>
            <p className="text-2xl font-bold">{stats.totalUsers}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-4">
          <RefreshCcw className="h-10 w-10 text-burgundy-600" />
          <div>
            <p className="text-gray-600">Всего обменов</p>
            <p className="text-2xl font-bold">{stats.totalReservations}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-4">
          <TrendingUp className="h-10 w-10 text-burgundy-600" />
          <div>
            <p className="text-gray-600">Общий объем</p>
            <p className="text-2xl font-bold">{stats.totalVolume.toFixed(2)} USDT</p>
          </div>
        </div>
      </div>
    </div>
  );
}