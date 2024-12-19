"use client";

import React from "react";

interface ConfirmModalProps {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmModal({
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = "Delete",
  cancelText = "Cancel",
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
        {/* Modal Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
        {/* Modal Description */}
        <p className="text-sm text-gray-600 mb-6">{description}</p>
        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
