import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmationDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmationDialog({ onConfirm, onCancel }: DeleteConfirmationDialogProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Подтверждение удаления
            </h3>
            <p className="text-gray-600 mt-1">
              Вы уверены, что хотите удалить это бронирование? Это действие нельзя отменить.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Отмена
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}