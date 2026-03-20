import React from 'react';
import { LucideIcon } from 'lucide-react';

interface WebinarFeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function WebinarFeature({ icon: Icon, title, description }: WebinarFeatureProps) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-6 w-6 text-burgundy-600 flex-shrink-0" />
      <div>
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}