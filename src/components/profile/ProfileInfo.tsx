import React, { useState } from 'react';
import { User, Mail, Phone, Edit2, Check, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

export function ProfileInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile({ name, phone });
      setIsEditing(false);
      toast.success('Профиль успешно обновлен');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Ошибка при обновлении профиля');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setName(user.name);
    setPhone(user.phone);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Личные данные</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-burgundy-600 hover:text-burgundy-700"
          >
            <Edit2 className="h-5 w-5" />
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Имя
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-burgundy-500 focus:border-burgundy-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Телефон
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-burgundy-500 focus:border-burgundy-500"
              placeholder="+447123456789"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              <X className="h-4 w-4 mr-1" />
              Отмена
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-3 py-2 bg-burgundy-600 text-white rounded-md hover:bg-burgundy-700 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                  Сохранение...
                </div>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Сохранить
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Имя</p>
              <p className="font-medium">{user.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Телефон</p>
              <p className="font-medium">{user.phone}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}