import React from 'react';
import { AlertCircle } from 'lucide-react';

interface VideoErrorProps {
  message: string;
  onRetry: () => void;
}

export function VideoError({ message, onRetry }: VideoErrorProps) {
  return (
    <div className="mt-4 p-4 bg-red-50 rounded-lg">
      <div className="flex items-start mb-3">
        <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-red-600">{message}</p>
      </div>
      <button
        onClick={onRetry}
        className="text-sm text-burgundy-600 hover:text-burgundy-700 font-medium"
      >
        Попробовать снова
      </button>
    </div>
  );
}