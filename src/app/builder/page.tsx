'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { useUIStore } from '@/store/useUIStore';
import { useStepValidation } from '@/hooks/useStepValidation';
import BuilderLayout from '@/components/builder/BuilderLayout';
import StepNavigation from '@/components/builder/StepNavigation';
import { useSearchParams } from 'next/navigation';

// Step components
import Step1Industry from '@/components/builder/steps/Step1Industry';
import Step2Personal from '@/components/builder/steps/Step2Personal';
import Step3Experience from '@/components/builder/steps/Step3Experience';
import Step4Education from '@/components/builder/steps/Step4Education';
import Step5Skills from '@/components/builder/steps/Step5Skills';
import Step6Summary from '@/components/builder/steps/Step6Summary';
import Step7Preview from '@/components/builder/steps/Step7Preview';

import { generatePDF } from '@/actions/generatePDF';
import toast from 'react-hot-toast';

function BuilderPageContent() {
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();

  // Zustand Store states
  const resumeData = useResumeStore();
  const currentStep = useUIStore((state) => state.currentStep);
  const totalSteps = useUIStore((state) => state.totalSteps);
  const nextStep = useUIStore((state) => state.nextStep);
  const prevStep = useUIStore((state) => state.prevStep);

  const selectedTemplate = useUIStore((state) => state.selectedTemplate);
  const accentColor = useUIStore((state) => state.accentColor);
  const isGenerating = useUIStore((state) => state.isGenerating);
  const setIsGenerating = useUIStore((state) => state.setIsGenerating);
  const setTemplate = useUIStore((state) => state.setTemplate);
  const goToStep = useUIStore((state) => state.goToStep);

  // Hook validations
  const { validateStep } = useStepValidation();

  // Wait until mounted on client to prevent hydration mismatch from persisted Zustand state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync query parameters on load/change
  useEffect(() => {
    if (!mounted) return;
    
    const templateParam = searchParams.get('template');
    if (templateParam === 'clean' || templateParam === 'modern' || templateParam === 'elegant') {
      setTemplate(templateParam);
    }

    const stepParam = searchParams.get('step');
    if (stepParam) {
      const stepNum = Number(stepParam);
      if (stepNum >= 1 && stepNum <= totalSteps) {
        goToStep(stepNum);
      }
    }
  }, [mounted, searchParams, setTemplate, goToStep, totalSteps]);

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      toast.loading('Menyiapkan file PDF...', { id: 'download-pdf-nav' });

      const { pdfBase64, error } = await generatePDF({
        resumeData,
        templateId: selectedTemplate,
        accentColor,
      });

      if (error || !pdfBase64) {
        toast.error(error || 'Gagal mengunduh PDF', { id: 'download-pdf-nav' });
        return;
      }

      // Convert Base64 to Blob
      const binaryString = window.atob(pdfBase64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      const blob = new Blob([bytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      // Trigger download
      const link = document.createElement('a');
      link.href = url;
      
      const candidateName = resumeData.personalInfo.fullName || 'Kandidat';
      const cleanName = candidateName.trim().replace(/[^a-zA-Z0-9]/g, '_');
      link.download = `CV_${cleanName || 'Resume'}.pdf`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('Resume berhasil didownload! ✓', { id: 'download-pdf-nav' });
    } catch (err: any) {
      console.error(err);
      toast.error('Terjadi kesalahan saat mengunduh PDF.', { id: 'download-pdf-nav' });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNext = async () => {
    // 1. Run validation for the current step
    const { isValid, errors } = validateStep(currentStep, resumeData);

    if (!isValid) {
      // Trigger toast alert for the first validation block
      toast.error(errors[0], {
        id: `validation-step-${currentStep}`,
      });
      return;
    }

    // 2. If it's step 7 (last step), trigger download logic
    if (currentStep === totalSteps) {
      await handleDownload();
      return;
    }

    // 3. Navigate forward
    nextStep();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    prevStep();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading skeleton placeholder
  if (!mounted) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50 text-gray-800">
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-semibold text-gray-500">Menyiapkan workspace builder...</p>
        </div>
      </main>
    );
  }

  // Active step renderer mapping
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Industry />;
      case 2:
        return <Step2Personal />;
      case 3:
        return <Step3Experience />;
      case 4:
        return <Step4Education />;
      case 5:
        return <Step5Skills />;
      case 6:
        return <Step6Summary />;
      case 7:
        return <Step7Preview />;
      default:
        return <Step1Industry />;
    }
  };

  return (
    <BuilderLayout>
      {/* 1. Active Step Form Body */}
      <div className="min-h-[380px] pb-6 flex flex-col justify-between">
        {renderStep()}
      </div>

      {/* 2. Step Navigation Control Row */}
      <StepNavigation
        onNext={handleNext}
        onBack={handleBack}
        isFirstStep={currentStep === 1}
        isLastStep={currentStep === totalSteps}
        nextLabel={currentStep === 6 ? 'Tinjau Resume' : 'Lanjut'}
        isGenerating={isGenerating}
      />
    </BuilderLayout>
  );
}

export default function BuilderPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50 text-gray-800">
          <div className="space-y-4 text-center">
            <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-sm font-semibold text-gray-500">Menyiapkan workspace builder...</p>
          </div>
        </main>
      }
    >
      <BuilderPageContent />
    </Suspense>
  );
}
