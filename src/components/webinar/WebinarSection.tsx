import React from 'react';
import { WebinarHeader } from './WebinarHeader';
import { WebinarContent } from './WebinarContent';
import { ExternalLink } from 'lucide-react';

export function WebinarSection() {
  return (
    <section className="py-20 bg-burgundy-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <WebinarHeader />
          <div className="space-y-8">
            <WebinarContent />
            <div className="flex justify-center">
              <a
                href="https://drive.google.com/file/d/1Wa4_gC28bozUJxXibw0Raef-ssdsphOO/view"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-burgundy-600 text-white px-6 py-3 rounded-md hover:bg-burgundy-700 transition-colors"
              >
                Смотреть вебинар
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}