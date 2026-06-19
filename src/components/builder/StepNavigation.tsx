'use client';

import React from 'react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface StepNavigationProps {
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  nextLabel?: string;
  isGenerating?: boolean;
}

export default function StepNavigation({
  onNext,
  onBack,
  isFirstStep,
  isLastStep,
  nextLabel = 'Lanjut',
  isGenerating = false,
}: StepNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:relative md:bg-transparent md:border-t-0 md:p-0 md:mt-8 z-20 flex-shrink-0">
      <div className="max-w-4xl mx-auto flex gap-4 justify-between">
        
        {/* Back Button */}
        {!isFirstStep ? (
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="flex-1 md:flex-none md:min-w-[120px]"
            onClick={onBack}
            iconLeft={<ArrowLeft className="w-4 h-4" />}
            disabled={isGenerating}
          >
            Kembali
          </Button>
        ) : (
          // Placeholder to maintain spacing if first step
          <div className="hidden md:block w-[120px]" />
        )}

        {/* Next Button */}
        <Button
          type="button"
          variant="primary"
          size="lg"
          className="flex-grow md:flex-none md:min-w-[180px]"
          onClick={onNext}
          loading={isGenerating}
          iconRight={!isLastStep ? <ArrowRight className="w-4 h-4" /> : undefined}
        >
          {isLastStep ? 'Unduh PDF Resume' : nextLabel}
        </Button>

      </div>
    </div>
  );
}
