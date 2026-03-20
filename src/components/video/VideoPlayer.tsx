import React from 'react';
import { YouTubeVideo } from './YouTubeVideo';
import { VimeoVideo } from './VimeoVideo';
import { GoogleDriveVideo } from './GoogleDriveVideo';
import { VideoMetadata } from '../../utils/video';

interface VideoPlayerProps {
  metadata: VideoMetadata;
  title?: string;
  className?: string;
}

export function VideoPlayer({ metadata, title, className }: VideoPlayerProps) {
  if (!metadata) {
    return null;
  }

  switch (metadata.provider) {
    case 'youtube':
      return <YouTubeVideo videoId={metadata.id} title={title} className={className} />;
    case 'vimeo':
      return <VimeoVideo videoId={metadata.id} title={title} className={className} />;
    case 'googledrive':
      return <GoogleDriveVideo fileId={metadata.id} title={title} className={className} />;
    default:
      return null;
  }
}