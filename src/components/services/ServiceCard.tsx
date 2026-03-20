import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { ServiceDetails } from './types';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: ServiceDetails;
}

export function ServiceCard({ icon, title, description, details }: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all">
      <div 
        className="cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start gap-4">
            <div className="text-burgundy-600">{icon}</div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          </div>
          <div className="text-burgundy-600">
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Как я могу помочь:</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {details.help.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Что вы получите:</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {details.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>

            {details.process && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Процесс работы:</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                  {details.process.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}