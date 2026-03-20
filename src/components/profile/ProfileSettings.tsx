import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, LogOut } from 'lucide-react';
import { ChangePasswordForm } from './ChangePasswordForm';

export function ProfileSettings() {
  const { logout } = useAuth();
  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-gray-400" />
            <div>
              <p className="font-medium">Безопасность</p>
              <p className="text-sm text-gray-500">Изменить пароль</p>
            </div>
          </div>
          <button 
            onClick={() => setShowChangePassword(true)}
            className="text-burgundy-600 hover:text-burgundy-700 text-sm font-medium"
          >
            Изменить
          </button>
        </div>

        <div className="pt-4 border-t">
          <button
            onClick={logout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
          >
            <LogOut className="h-5 w-5" />
            <span>Выйти из аккаунта</span>
          </button>
        </div>
      </div>

      {showChangePassword && (
        <ChangePasswordForm onClose={() => setShowChangePassword(false)} />
      )}
    </div>
  );
}