import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ChevronDown } from 'lucide-react';

export function NavigationMenu() {
  const { user, logout, isAuthenticated } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = React.useState(false);

  return (
    <nav className="hidden md:flex items-center space-x-8">
      <Link to="/about" className="text-gray-700 hover:text-burgundy-600">
        Обо мне
      </Link>
      <Link to="/services" className="text-gray-700 hover:text-burgundy-600">
        Услуги
      </Link>
      <Link to="/expertise" className="text-gray-700 hover:text-burgundy-600">
        Опыт работы
      </Link>
      <Link to="/education" className="text-gray-700 hover:text-burgundy-600">
        Обучение
      </Link>
      <Link to="/contact" className="text-gray-700 hover:text-burgundy-600">
        Контакты
      </Link>
      
      {isAuthenticated ? (
        <div className="relative">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center gap-2 text-gray-700 hover:text-burgundy-600"
          >
            <span>{user?.name}</span>
            <ChevronDown className="h-4 w-4" />
          </button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsProfileMenuOpen(false)}
              >
                Личный кабинет
              </Link>
              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  Панель администратора
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  setIsProfileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Выйти
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link
          to="/login"
          className="bg-burgundy-600 text-white px-4 py-2 rounded-md hover:bg-burgundy-700"
        >
          Войти
        </Link>
      )}
    </nav>
  );
}