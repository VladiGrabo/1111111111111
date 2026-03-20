import React, { useState } from 'react';
import { Lock } from 'lucide-react';

interface AdminAuthProps {
  onLogin: () => void;
}

export function AdminAuth({ onLogin }: AdminAuthProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // В реальном приложении используйте безопасное хранение и проверку пароля
    if (password === 'Miksertx66') {
      onLogin();
      setError('');
    } else {
      setError('Неверный пароль');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-burgundy-100 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-burgundy-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Вход для администратора</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Пароль администратора
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-burgundy-500 focus:border-burgundy-500"
              placeholder="Введите пароль"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-burgundy-600 text-white px-6 py-3 rounded-md hover:bg-burgundy-700 transition-colors"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}