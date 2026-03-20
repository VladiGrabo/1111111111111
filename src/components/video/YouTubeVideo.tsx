import React, { useState, useEffect } from 'react';
import { VideoError } from './VideoError';
import { VideoLoading } from './VideoLoading';
import { getYouTubeEmbedUrl, validateYouTubeId } from '../../utils/youtube';

interface YouTubeVideoProps {
  videoId: string;
  title?: string;
  className?: string;
}

export function YouTubeVideo({ videoId, title, className = '' }: YouTubeVideoProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    if (!validateYouTubeId(videoId)) {
      setError('Неверный идентификатор видео');
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
  }, [videoId, retryKey]);

  const handleLoad = () => {
    setIsLoading(false);
    setError(null);
  };

  const handleError = () => {
    setError('Не удалось загрузить видео. Проверьте подключение к интернету или попробуйте позже.');
    setIsLoading(false);
  };

  const handleRetry = () => {
    setRetryKey(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        {isLoading && <VideoLoading />}
        
        <div className={`relative aspect-video rounded-xl overflow-hidden shadow-lg ${className}`}>
          <iframe
            key={retryKey}
            src={getYouTubeEmbedUrl(videoId)}
            title={title || 'YouTube Video'}
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={handleLoad}
            onError={handleError}
          />
        </div>

        {error && <VideoError message={error} onRetry={handleRetry} />}
      </div>
    </div>
  );
}