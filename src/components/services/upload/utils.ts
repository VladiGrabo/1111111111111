import { UPLOAD_CONFIG } from './config';

export function validateFile(file: File): string | null {
  if (!file) return 'Файл не выбран';
  if (!UPLOAD_CONFIG.allowedTypes.includes(file.type)) {
    return 'Поддерживается только формат MP4';
  }
  if (file.size > UPLOAD_CONFIG.maxFileSize) {
    return `Максимальный размер файла: ${UPLOAD_CONFIG.maxFileSize / (1024 * 1024)}MB`;
  }
  return null;
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}