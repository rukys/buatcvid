'use client';

import React, { useState } from 'react';
import { useUIStore } from '@/store/useUIStore';
import { useResumeStore } from '@/store/useResumeStore';
import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmModal from '@/components/ui/ConfirmModal';

export default function StepProgress() {
  const currentStep = useUIStore((state) => state.currentStep);
  const totalSteps = useUIStore((state) => state.totalSteps);
  const goToStep = useUIStore((state) => state.goToStep);

  const stepLabels = [
    'Pilih Bidang',
    'Info Pribadi',
    'Pengalaman Kerja',
    'Pendidikan',
    'Keahlian',
    'Ringkasan',
    'Preview & Unduh',
  ];

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Calculate percentage fill
  const fillPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const resetResume = useResumeStore((state) => state.resetResume);
  const setTemplate = useUIStore((state) => state.setTemplate);
  const setAccentColor = useUIStore((state) => state.setAccentColor);

  const handleReset = () => {
    resetResume();
    setTemplate('clean');
    setAccentColor('#2563EB');
    goToStep(1);
    toast.success('Data resume berhasil direset!', { id: 'reset-resume-toast' });
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 px-4 pt-4 pb-5 md:pt-5 md:pb-8 sticky top-0 z-30 select-none">
      <div className="max-w-4xl mx-auto space-y-4">
        
        {/* Step Label Heading */}
        <div className="flex justify-between items-center text-xs sm:text-sm">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-primary-600 uppercase tracking-wide">
              Langkah {currentStep} dari {totalSteps}
            </span>
            <button
              type="button"
              onClick={() => setIsConfirmOpen(true)}
              className="text-[10px] font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded px-2 py-1 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Mulai dari awal"
            >
              <Trash2 className="w-3 h-3" />
              <span>Reset Data</span>
            </button>
          </div>
          <span className="font-bold text-gray-950 font-heading">
            {stepLabels[currentStep - 1]}
          </span>
        </div>

        {/* Progress Bar Track and Dots */}
        <div className="relative pt-1 flex items-center justify-between w-full">
          
          {/* Progress Bar Background Track */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 rounded-full -z-10" />
          
          {/* Progress Bar Animated Fill */}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary-600 rounded-full -z-10 transition-all duration-400 ease-out"
            style={{ width: `${fillPercentage}%` }}
          />

          {/* Render Step Dots */}
          {Array.from({ length: totalSteps }).map((_, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum < currentStep;
            const isActive = stepNum === currentStep;

            return (
              <button
                key={stepNum}
                onClick={() => {
                  // Only allow jumping to steps already visited or completed to prevent skipping validations
                  if (stepNum <= currentStep || isCompleted) {
                    goToStep(stepNum);
                  }
                }}
                disabled={stepNum > currentStep}
                className={cn(
                  'w-3 h-3 rounded-full border-2 transition-all duration-200 relative flex items-center justify-center',
                  // Completed state: filled circle
                  isCompleted && 'bg-primary-600 border-primary-600 hover:scale-110 cursor-pointer',
                  // Active state: hollow circle with primary ring
                  isActive && 'bg-white border-primary-600 scale-125 ring-4 ring-primary-50 cursor-default',
                  // Future/Disabled state: gray circle
                  stepNum > currentStep && 'bg-gray-200 border-gray-200 cursor-not-allowed'
                )}
                aria-label={`Lompat ke langkah ${stepNum}: ${stepLabels[idx]}`}
              >
                {/* Floating tooltip for step label on desktop */}
                <span className="hidden md:block absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold text-gray-400 group-hover:text-gray-950 transition-colors">
                  {stepLabels[idx]}
                </span>
              </button>
            );
          })}

        </div>

      </div>

      {/* Premium Confirm Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleReset}
        title="Mulai Resume dari Awal?"
        message="Apakah Anda yakin ingin menghapus semua data resume yang telah Anda isi? Tindakan ini tidak dapat dibatalkan."
        confirmLabel="Ya, Hapus Data"
        cancelLabel="Batal"
      />
    </div>
  );
}
