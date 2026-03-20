import React, { useState, useEffect } from 'react';
import { VideoError } from './VideoError';
import { VideoLoading } from './VideoLoading';
import { getGoogleDriveEmbedUrl, validateGoogleDriveFileId } from '../../utils/googleDrive';

interface GoogleDriveVideoProps {
  fileId: string;
  title?: string;
  className?: string;
}

export function GoogleDriveVideo({ fileId, title, className = '' }: GoogleDriveVideoProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    if (!validateGoogleDriveFileId(fileId)) {
      setError('Неверный идентификатор видео');
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
  }, [fileId, retryKey]);

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
            src={getGoogleDriveEmbedUrl(fileId)}
            title={title || 'Google Drive Video'}
            className="absolute inset-0 w-full h-full border-0"
            allow="autoplay"
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