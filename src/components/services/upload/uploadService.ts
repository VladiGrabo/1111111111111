import { UPLOAD_CONFIG } from './config';
import { delay } from './utils';
import { mockUploadChunk } from './mock';
import type { UploadChunkResponse, RetryConfig } from './types';

export class UploadService {
  private async uploadChunkWithRetry(
    chunk: Blob,
    chunkIndex: number,
    totalChunks: number,
    fileName: string,
    retryConfig: RetryConfig
  ): Promise<UploadChunkResponse> {
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= retryConfig.maxAttempts; attempt++) {
      try {
        // Use mock implementation for development
        const result = await mockUploadChunk(chunk, chunkIndex, totalChunks);
        
        if (!result.success) {
          throw new Error('Upload failed');
        }

        return { success: true };
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        
        if (attempt < retryConfig.maxAttempts) {
          await delay(retryConfig.delayMs * attempt); // Exponential backoff
          continue;
        }
      }
    }

    throw lastError || new Error('Failed to upload chunk after retries');
  }

  async uploadFile(
    file: File,
    onProgress: (progress: number) => void
  ): Promise<void> {
    const totalChunks = Math.ceil(file.size / UPLOAD_CONFIG.chunkSize);
    const uploadedChunks = new Set<number>();

    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      const start = chunkIndex * UPLOAD_CONFIG.chunkSize;
      const end = Math.min(start + UPLOAD_CONFIG.chunkSize, file.size);
      const chunk = file.slice(start, end);

      try {
        await this.uploadChunkWithRetry(
          chunk,
          chunkIndex,
          totalChunks,
          file.name,
          UPLOAD_CONFIG.retry
        );
        
        uploadedChunks.add(chunkIndex);
        onProgress((uploadedChunks.size / totalChunks) * 100);
      } catch (error) {
        console.error(`Failed to upload chunk ${chunkIndex + 1}/${totalChunks}:`, error);
        throw new Error(`Ошибка загрузки части ${chunkIndex + 1}/${totalChunks}`);
      }
    }
  }
}