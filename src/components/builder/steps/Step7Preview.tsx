'use client';

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { useUIStore } from '@/store/useUIStore';
import { ACCENT_COLORS, TemplateId, OutputLanguage } from '@/types/resume';
import { FileCheck, Check, Globe, Eye, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { generatePDFClient } from '@/lib/generatePDFClient';
import toast from 'react-hot-toast';

export default function Step7Preview() {
  const resume = useResumeStore();
  const outputLanguage = useResumeStore((state) => state.outputLanguage);
  const setOutputLanguage = useResumeStore((state) => state.setOutputLanguage);

  const selectedTemplate = useUIStore((state) => state.selectedTemplate);
  const accentColor = useUIStore((state) => state.accentColor);
  const setTemplate = useUIStore((state) => state.setTemplate);
  const setAccentColor = useUIStore((state) => state.setAccentColor);
  const isGenerating = useUIStore((state) => state.isGenerating);
  const setIsGenerating = useUIStore((state) => state.setIsGenerating);

  const templates: { id: TemplateId; label: string; desc: string }[] = [
    { id: 'clean', label: 'Clean (Bersih)', desc: 'Satu kolom, layout terstruktur & rapi.' },
    { id: 'modern', label: 'Modern (Kreatif)', desc: 'Dua kolom dengan panel aksen warna.' },
    { id: 'elegant', label: 'Elegant (Eksekutif)', desc: 'Satu kolom dengan tipografi kuat.' },
  ];

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      toast.loading('Menyiapkan file PDF...', { id: 'download-pdf' });

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

      toast.success('Resume berhasil didownload! ✓', { id: 'download-pdf' });
    } catch (err: any) {
      console.error(err);
      toast.error('Terjadi kesalahan saat mengunduh PDF.', { id: 'download-pdf' });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-gray-950">
            Pratinjau & Unduh Resume
          </h2>
          <p className="text-sm text-gray-500">
            Pilih template, sesuaikan warna aksen, dan pilih bahasa resume sebelum diunduh.
          </p>
        </div>

        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => window.open('/preview', '_blank')}
          iconLeft={<Eye className="w-4 h-4" />}
          className="self-start sm:self-center text-xs"
        >
          Pratinjau Penuh ↗
        </Button>
      </div>

      <div className="space-y-6 pt-4 border-t border-gray-100">
        
        {/* Output Language Widget */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700 flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-gray-500" />
            Bahasa Resume
          </label>
          <div className="grid grid-cols-2 gap-3 max-w-sm">
            {(['id', 'en'] as OutputLanguage[]).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setOutputLanguage(lang)}
                className={`py-2.5 px-4 border rounded-md text-xs font-semibold transition-all text-center flex items-center justify-center gap-2 ${
                  outputLanguage === lang
                    ? 'border-primary-600 bg-primary-50 text-primary-600 ring-2 ring-primary-50'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{lang === 'id' ? '🇮🇩 Bahasa Indonesia' : '🇬🇧 English'}</span>
                {outputLanguage === lang && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        </div>

        {/* Template Selector Widget */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            Pilih Desain Template
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {templates.map((tpl) => (
              <button
                key={tpl.id}
                type="button"
                onClick={() => setTemplate(tpl.id)}
                className={`py-4 px-4 border rounded-lg text-left transition-all flex flex-col justify-between h-24 ${
                  selectedTemplate === tpl.id
                    ? 'border-primary-600 bg-primary-50/50 text-primary-600 ring-2 ring-primary-50'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-950">{tpl.label}</span>
                    {selectedTemplate === tpl.id && <Check className="w-4 h-4 text-primary-600" />}
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1 leading-normal">
                    {tpl.desc}
                  </p>
                </div>
                <span className="text-[9px] font-semibold text-primary-600 uppercase tracking-wider mt-2">
                  ATS-Friendly
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Color Palette Accent Swatcher */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            Pilih Warna Aksen
          </label>
          <div className="flex items-center gap-3">
            {ACCENT_COLORS.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => setAccentColor(color.value)}
                className="w-8 h-8 rounded-full border border-gray-200 relative transition-transform active:scale-90 hover:scale-105"
                style={{ backgroundColor: color.value }}
                aria-label={`Pilih warna aksen ${color.label}`}
              >
                {accentColor === color.value && (
                  <Check className="w-5 h-5 text-white absolute inset-0 m-auto" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile-only Explicit Download Button */}
        <div className="block md:hidden pt-4">
          <Button
            type="button"
            variant="primary"
            size="lg"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleDownload}
            loading={isGenerating}
            iconLeft={<Download className="w-4 h-4" />}
          >
            Unduh PDF Sekarang
          </Button>
        </div>

        {/* Informative placeholder box */}
        <div className="bg-primary-50 border border-primary-100 p-5 rounded-lg flex items-start gap-4">
          <div className="bg-white p-2 rounded-full shadow-sm text-primary-600 flex-shrink-0">
            <FileCheck className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-gray-950">Pratinjau Mini Selesai!</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Kamu bisa melihat pratinjau hasil penulisan resume kamu di kolom pratinjau kanan (pada desktop) atau tombol floating di pojok kanan bawah (pada HP).
            </p>
            <p className="text-[10px] text-gray-400 pt-1">
              *Unduh CV kamu untuk mendapatkan berkas PDF berkualitas tinggi yang terstandarisasi sistem ATS HRD.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
