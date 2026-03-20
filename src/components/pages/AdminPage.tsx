import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AdminStats } from '../components/admin/AdminStats';
import { AdminUsers } from '../components/admin/AdminUsers';
import { AdminReservations } from '../components/admin/AdminReservations';
import { AdminFinancialPlans } from '../components/admin/AdminFinancialPlans';
import toast from 'react-hot-toast';

export default function AdminPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
      return;
    }

    if (user.role !== 'admin') {
      navigate('/', { replace: true });
      toast.error('Доступ запрещен. Необходимы права администратора.');
      return;
    }
  }, [user, navigate]);

  // Early return if not authenticated or not admin
  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Панель администратора</h1>
        
        <div className="space-y-8">
          <AdminStats />
          <AdminUsers />
          <AdminReservations />
          <AdminFinancialPlans />
        </div>
      </div>
    </div>
  );
}