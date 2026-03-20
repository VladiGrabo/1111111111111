import React from 'react';

interface EducationVideoProps {
  imageUrl: string;
  videoUrl: string;
  title: string;
  description: string;
}

export function EducationVideo({ imageUrl, videoUrl, title, description }: EducationVideoProps) {
  return (
    <div className="space-y-4">
      <a 
        href={videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity" />
        </div>
      </a>
      <div className="bg-burgundy-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}