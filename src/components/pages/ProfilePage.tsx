import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ProfileInfo } from '../components/profile/ProfileInfo';
import { ProfileOperations } from '../components/profile/ProfileOperations';
import { ProfileSettings } from '../components/profile/ProfileSettings';
import { FinancialPlan } from '../components/profile/FinancialPlan';

export default function ProfilePage() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'operations' | 'financial'>('profile');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Личный кабинет</h1>
          <p className="mt-2 text-gray-600">Управление профилем и финансами</p>
        </div>

        <div className="mb-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`${
                activeTab === 'profile'
                  ? 'border-burgundy-500 text-burgundy-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Профиль
            </button>
            <button
              onClick={() => setActiveTab('operations')}
              className={`${
                activeTab === 'operations'
                  ? 'border-burgundy-500 text-burgundy-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              История обменов
            </button>
            <button
              onClick={() => setActiveTab('financial')}
              className={`${
                activeTab === 'financial'
                  ? 'border-burgundy-500 text-burgundy-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Финансовый план
            </button>
          </nav>
        </div>

        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <ProfileInfo />
              <div className="mt-8">
                <ProfileSettings />
              </div>
            </div>
            <div className="lg:col-span-2">
              <ProfileOperations />
            </div>
          </div>
        )}

        {activeTab === 'operations' && (
          <div>
            <ProfileOperations />
          </div>
        )}

        {activeTab === 'financial' && (
          <div>
            <FinancialPlan />
          </div>
        )}
      </div>
    </div>
  );
}