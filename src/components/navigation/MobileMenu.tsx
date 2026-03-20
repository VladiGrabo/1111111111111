import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { user, logout } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center h-16 px-4 bg-white border-b">
          <h1 className="text-xl font-medium">
            Владислав Коновалов
          </h1>
          <button 
            onClick={onClose}
            className="p-2 bg-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="px-4 py-2 bg-white">
          <p className="text-gray-600">
            Помогаю создавать долгосрочные стратегии инвестирования и управления капиталом для обеспеченного будущего
          </p>
        </div>

        <nav className="flex-1 px-4 bg-white">
          <Link 
            to="/about" 
            className="block py-3 text-gray-900 bg-white"
            onClick={onClose}
          >
            Обо мне
          </Link>
          <Link 
            to="/services" 
            className="block py-3 text-gray-900 bg-white"
            onClick={onClose}
          >
            Услуги
          </Link>
          <Link 
            to="/expertise" 
            className="block py-3 text-gray-900 bg-white"
            onClick={onClose}
          >
            Опыт работы
          </Link>
          <Link 
            to="/education" 
            className="block py-3 text-gray-900 bg-white"
            onClick={onClose}
          >
            Обучение
          </Link>
          <Link 
            to="/contact" 
            className="block py-3 text-gray-900 bg-white"
            onClick={onClose}
          >
            Контакты
          </Link>
        </nav>

        <div className="p-4 space-y-3 bg-white">
          {user ? (
            <>
              <Link 
                to="/profile"
                className="block w-full py-3 text-center bg-white border border-burgundy-600 text-burgundy-600 rounded-md"
                onClick={onClose}
              >
                Личный кабинет
              </Link>
              {user.role === 'admin' && (
                <Link 
                  to="/admin"
                  className="block w-full py-3 text-center bg-white border border-burgundy-600 text-burgundy-600 rounded-md"
                  onClick={onClose}
                >
                  Панель администратора
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="w-full py-3 text-center bg-white border border-red-600 text-red-600 rounded-md"
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/contact"
                className="block w-full py-3 text-center bg-white border border-burgundy-600 text-burgundy-600 rounded-md"
                onClick={onClose}
              >
                Записаться на консультацию
              </Link>
              <Link 
                to="/services"
                className="block w-full py-3 text-center bg-white border border-burgundy-600 text-burgundy-600 rounded-md"
                onClick={onClose}
              >
                Узнать больше
              </Link>
              <Link
                to="/login"
                className="block w-full py-3 text-center bg-white border border-burgundy-600 text-burgundy-600 rounded-md"
                onClick={onClose}
              >
                Войти
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}