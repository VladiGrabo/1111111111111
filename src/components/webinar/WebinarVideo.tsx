import React from 'react';
import { VideoPlayer } from '../video/VideoPlayer';

export function WebinarVideo() {
  const videoMetadata = {
    provider: 'youtube' as const,
    id: '8813lhA-guI'
  };

  return (
    <VideoPlayer 
      metadata={videoMetadata}
      title="Инвестиционные стратегии 2024: как создать устойчивый портфель"
      className="w-full"
    />
  );
}