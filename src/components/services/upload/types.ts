export interface UploadChunkResponse {
  success: boolean;
  message?: string;
  chunkId?: string;
}

export interface RetryConfig {
  maxAttempts: number;
  delayMs: number;
}