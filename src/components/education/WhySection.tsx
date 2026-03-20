import React from 'react';
import { Book } from 'lucide-react';

interface WhySectionProps {
  title: string;
  benefits: string[] | string;
}

export function WhySection({ title, benefits }: WhySectionProps) {
  // Ensure benefits is always an array
  const benefitsList = Array.isArray(benefits) ? benefits : [];

  return (
    <div className="mt-12 bg-burgundy-50 p-6 rounded-lg">
      <div className="flex items-start gap-4">
        <Book className="h-6 w-6 text-burgundy-600 mt-1" />
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            {benefitsList.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}