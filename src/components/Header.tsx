import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { NavigationMenu } from './navigation/NavigationMenu';
import { MobileMenu } from './navigation/MobileMenu';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-lg font-semibold text-gray-900 hover:text-burgundy-600 transition-colors">
              Владислав Коновалов
            </Link>
          </div>
          
          <NavigationMenu />
          
          <button 
            className="md:hidden p-2 hover:bg-gray-100 rounded-full"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Открыть меню"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </header>
  );
}