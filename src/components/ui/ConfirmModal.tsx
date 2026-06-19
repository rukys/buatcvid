'use client';

import React, { useEffect } from 'react';
import { AlertOctagon, X } from 'lucide-react';
import { Button } from './Button';

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Ya, Hapus',
  cancelLabel = 'Batal',
}: ConfirmModalProps) {
  
  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with premium blur effect */}
      <div 
        className="fixed inset-0 bg-gray-950/60 backdrop-blur-xs transition-opacity animate-[fadeIn_200ms_ease]" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-10 transition-all scale-100 animate-[scaleUp_200ms_ease-out] p-6 text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Tutup dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Warning Icon & Content Header */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-11 h-11 bg-red-50 rounded-full flex items-center justify-center text-red-600 border border-red-100">
            <AlertOctagon className="w-6 h-6" />
          </div>
          
          <div className="space-y-1.5 flex-1">
            <h3 className="text-base sm:text-lg font-bold font-heading text-gray-950">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        {/* Actions Button Bar */}
        <div className="mt-6 flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onClose}
            className="w-full sm:w-auto text-xs font-semibold py-2 px-4"
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="w-full sm:w-auto text-xs font-semibold bg-red-600 hover:bg-red-500 border-red-600 hover:border-red-500 text-white shadow-xs focus:ring-red-100 py-2 px-4"
          >
            {confirmLabel}
          </Button>
        </div>
        
      </div>
    </div>
  );
}
