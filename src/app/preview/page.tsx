'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useResumeStore } from '@/store/useResumeStore';
import { useUIStore } from '@/store/useUIStore';
import { ArrowLeft, Download, RefreshCw, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import MiniPreview from '@/components/builder/MiniPreview';
import { generatePDFClient } from '@/lib/generatePDFClient';
import toast from 'react-hot-toast';

export default function PreviewPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const resume = useResumeStore();
  const selectedTemplate = useUIStore((state) => state.selectedTemplate);
  const accentColor = useUIStore((state) => state.accentColor);
  const isGenerating = useUIStore((state) => state.isGenerating);
  const setIsGenerating = useUIStore((state) => state.setIsGenerating);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      toast.loading('Menyiapkan file PDF...', { id: 'download-pdf-preview' });

      const blob = await generatePDFClient({
        resumeData: resume,
        templateId: selectedTemplate,
        accentColor,
      });

      const url = URL.createObjectURL(blob);
      
      // Trigger download
      const link = document.createElement('a');
      link.href = url;
      
      const candidateName = resume.personalInfo.fullName || 'Kandidat';
      const cleanName = candidateName.trim().replace(/[^a-zA-Z0-9]/g, '_');
      link.download = `CV_${cleanName || 'Resume'}.pdf`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('Resume berhasil didownload! ✓', { id: 'download-pdf-preview' });
    } catch (err: any) {
      console.error(err);
      toast.error('Terjadi kesalahan saat mengunduh PDF.', { id: 'download-pdf-preview' });
    } finally {
      setIsGenerating(false);
    }
  };

  if (!mounted) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50 text-gray-800">
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-semibold text-gray-500">Menyiapkan pratinjau...</p>
        </div>
      </main>
    );
  }

  const templateNames = {
    clean: 'Clean (Bersih)',
    modern: 'Modern (Kreatif)',
    elegant: 'Elegant (Eksekutif)',
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Header Bar */}
      <header className="bg-white border-b border-gray-200 py-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-30 shadow-xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/builder')}
              className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900"
              aria-label="Kembali ke Builder"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-sm sm:text-base font-bold font-heading text-gray-950 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary-600" />
                Pratinjau CV: {resume.personalInfo.fullName || 'Draft Kandidat'}
              </h1>
              <p className="text-[10px] sm:text-xs text-gray-500">
                Template: <span className="font-semibold text-gray-700">{templateNames[selectedTemplate]}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => router.push('/builder')}
              className="hidden sm:inline-flex"
            >
              Edit Kembali
            </Button>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleDownload}
              loading={isGenerating}
              iconLeft={<Download className="w-4 h-4" />}
            >
              Unduh PDF
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-3xl mx-auto w-full p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center">
        {/* Full-screen styled A4 Mockup Box */}
        <div className="w-full max-w-[480px]">
          <MiniPreview />
        </div>
        <p className="text-[10px] text-gray-400 mt-4 text-center">
          *Tampilan pratinjau adalah mockup layar A4. Hasil unduhan PDF akan terbagi secara proporsional.
        </p>
      </main>
    </div>
  );
}
