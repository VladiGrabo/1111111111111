import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isOnline } = useAuth();

  const from = location.state?.from?.pathname || '/';
  const message = location.state?.message;

  React.useEffect(() => {
    if (message) {
      toast.success(message);
    }
  }, [message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!isOnline) {
      setError('Для входа необходимо подключение к сети');
      return;
    }

    if (!email.trim()) {
      setError('Пожалуйста, введите email');
      return;
    }
    if (!password.trim()) {
      setError('Пожалуйста, введите пароль');
      return;
    }

    setLoading(true);

    try {
      await login(email.trim(), password.trim());
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      setError('Неверный email или пароль');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Вход в личный кабинет</h2>
        <p className="text-gray-600 mt-2">
          Для доступа к личному кабинету необходимо войти в систему
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-burgundy-500 focus:border-burgundy-500"
              placeholder="your@email.com"
              autoComplete="email"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Пароль
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-burgundy-500 focus:border-burgundy-500"
              placeholder="••••••••"
              minLength={6}
              autoComplete="current-password"
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !isOnline}
          className="w-full bg-burgundy-600 text-white px-6 py-3 rounded-md hover:bg-burgundy-700 transition-colors disabled:opacity-50 text-base font-medium"
        >
          {loading ? 'Вход...' : 'Войти'}
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Нет аккаунта?{' '}
          <Link to="/register" className="text-burgundy-600 hover:text-burgundy-700 font-medium">
            Зарегистрироваться
          </Link>
        </p>
      </form>
    </div>
  );
}