import React, { useCallback, useState } from 'react';
import { Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { UploadService } from '../../services/upload/uploadService';
import { validateFile } from '../../services/upload/utils';

const uploadService = new UploadService();

export function FileUpload() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setUploading(true);
    setError(null);
    setUploadProgress(0);
    setUploadComplete(false);

    try {
      await uploadService.uploadFile(file, (progress) => {
        setUploadProgress(progress);
      });
      
      setUploadProgress(100);
      setUploadComplete(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при загрузке файла');
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files[0];
    if (file) {
      const input = document.getElementById('file-upload') as HTMLInputElement;
      if (input) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        input.files = dataTransfer.files;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleReset = useCallback(() => {
    setUploadComplete(false);
    setUploadProgress(0);
    setError(null);
  }, []);

  if (uploadComplete) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex flex-col items-center text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Загрузка завершена!</h3>
            <p className="text-gray-600 mb-4">Файл успешно загружен и обрабатывается</p>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-burgundy-600 text-white rounded-md hover:bg-burgundy-700 transition-colors"
            >
              Загрузить другой файл
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label 
            htmlFor="file-upload"
            className={`
              flex flex-col items-center justify-center w-full h-32
              border-2 border-dashed rounded-lg
              cursor-pointer
              transition-colors
              ${uploading ? 'border-burgundy-300 bg-burgundy-50' : 'border-gray-300 hover:border-burgundy-500'}
            `}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className={`w-8 h-8 mb-2 ${uploading ? 'text-burgundy-500' : 'text-gray-400'}`} />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Нажмите для загрузки</span> или перетащите файл
              </p>
              <p className="text-xs text-gray-500">MP4 формат, максимум 500MB</p>
            </div>
            <input
              id="file-upload"
              type="file"
              accept="video/mp4"
              className="hidden"
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </label>
        </div>

        {(uploading || uploadProgress > 0) && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Прогресс загрузки</span>
              <span>{Math.round(uploadProgress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-burgundy-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-50 rounded-lg flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}