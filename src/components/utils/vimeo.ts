export function getVimeoEmbedUrl(videoId: string): string {
  return `https://player.vimeo.com/video/${videoId}`;
}

export function validateVimeoId(videoId: string): boolean {
  return /^\d+$/.test(videoId);
}