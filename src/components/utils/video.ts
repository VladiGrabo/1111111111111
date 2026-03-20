export interface VideoMetadata {
  provider: 'youtube' | 'vimeo' | 'googledrive';
  id: string;
}

export function parseVideoUrl(url: string): VideoMetadata | null {
  try {
    const urlObj = new URL(url);
    
    // YouTube
    if (urlObj.hostname.includes('youtube.com') || urlObj.hostname === 'youtu.be') {
      const id = urlObj.hostname === 'youtu.be' 
        ? urlObj.pathname.slice(1)
        : urlObj.searchParams.get('v');
      return id ? { provider: 'youtube', id } : null;
    }
    
    // Vimeo
    if (urlObj.hostname.includes('vimeo.com')) {
      const id = urlObj.pathname.split('/').pop();
      return id ? { provider: 'vimeo', id } : null;
    }
    
    // Google Drive
    if (urlObj.hostname.includes('drive.google.com')) {
      const id = urlObj.pathname.includes('/d/') 
        ? urlObj.pathname.split('/d/')[1].split('/')[0]
        : urlObj.pathname.split('/')[3];
      return id ? { provider: 'googledrive', id } : null;
    }
    
    return null;
  } catch {
    return null;
  }
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function generateThumbnailUrl(metadata: VideoMetadata): string {
  switch (metadata.provider) {
    case 'youtube':
      return `https://img.youtube.com/vi/${metadata.id}/maxresdefault.jpg`;
    case 'vimeo':
      // Vimeo requires API access for thumbnails
      return '';
    case 'googledrive':
      // Google Drive doesn't provide public thumbnail URLs
      return '';
    default:
      return '';
  }
}