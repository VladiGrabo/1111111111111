export const UPLOAD_CONFIG = {
  chunkSize: 1024 * 1024, // 1MB
  maxFileSize: 500 * 1024 * 1024, // 500MB
  allowedTypes: ['video/mp4'],
  retry: {
    maxAttempts: 3,
    delayMs: 1000
  }
};