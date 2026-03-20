export function getGoogleDriveEmbedUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

export function validateGoogleDriveFileId(fileId: string): boolean {
  return /^[a-zA-Z0-9_-]+$/.test(fileId);
}