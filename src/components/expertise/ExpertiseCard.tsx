import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ExpertiseCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function ExpertiseCard({ icon: Icon, title, description }: ExpertiseCardProps) {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-4">
        <Icon className="h-12 w-12 text-burgundy-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}