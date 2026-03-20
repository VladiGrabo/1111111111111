import React from 'react';
import { HeroContent } from './hero/HeroContent';
import { heroConfig } from './hero/heroConfig';

export default function Hero() {
  return (
    <div className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroContent />
      </div>
    </div>
  );
}