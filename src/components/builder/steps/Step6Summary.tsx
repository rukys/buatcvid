'use client';

import React, { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { generateProfileSummary } from '@/actions/generateProfileSummary';
import { SummaryTone, OutputLanguage } from '@/types/resume';
import toast from 'react-hot-toast';

export default function Step6Summary() {
  const resumeData = useResumeStore();
  const summary = useResumeStore((state) => state.summary);
  const summaryTone = useResumeStore((state) => state.summaryTone);
  const outputLanguage = useResumeStore((state) => state.outputLanguage);

  const setSummary = useResumeStore((state) => state.setSummary);
  const setSummaryTone = useResumeStore((state) => state.setSummaryTone);
  const setOutputLanguage = useResumeStore((state) => state.setOutputLanguage);

  const [isGenerating, setIsGenerating] = useState(false);

  const toneOptions = [
    { value: 'formal', label: 'Formal (Baku & Profesional)' },
    { value: 'semiformal', label: 'Semi-formal (Luwes & Modern)' },
    { value: 'confident', label: 'Dinamis & Percaya Diri' },
  ];

  const languageOptions = [
    { value: 'id', label: 'Bahasa Indonesia' },
    { value: 'en', label: 'English' },
  ];

  const handleAIGenerate = async () => {
    setIsGenerating(true);
    try {
      const { summary: generatedSummary, error } = await generateProfileSummary({
        resumeData,
        tone: summaryTone,
        language: outputLanguage,
      });

      if (error || !generatedSummary) {
        toast.error(error || 'Gagal menghasilkan ringkasan profil.');
      } else {
        setSummary(generatedSummary);
        toast.success('Ringkasan profil berhasil ditulis oleh AI!');
      }
    } catch (err) {
      toast.error('Terjadi kesalahan koneksi server.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Step Heading */}
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold font-heading text-gray-950">
          Ringkasan Profil (Summary)
        </h2>
        <p className="text-sm text-gray-500">
          Tuliskan 2–3 kalimat singkat di bagian paling atas resume untuk menggambarkan keahlian utama dan karir profesional kamu.
        </p>
      </div>

      <div className="space-y-4 pt-2">
        
        {/* Tone and Language Configurations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-sm border border-gray-200">
          <Select
            label="Gaya Bahasa / Tone AI"
            options={toneOptions}
            value={summaryTone}
            onChange={(e) => setSummaryTone(e.target.value as SummaryTone)}
            hint="Sesuaikan dengan industri tempat kamu melamar."
          />
          
          <Select
            label="Bahasa Output AI"
            options={languageOptions}
            value={outputLanguage}
            onChange={(e) => setOutputLanguage(e.target.value as OutputLanguage)}
            hint="Bahasa hasil penulisan ringkasan profil."
          />
        </div>

        {/* Action button trigger */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <span className="text-xs font-semibold text-gray-500 text-left">
            AI akan merangkum riwayat kerja, pendidikan, dan keahlian di langkah sebelumnya.
          </span>
          <Button
            type="button"
            variant="ai"
            size="sm"
            onClick={handleAIGenerate}
            loading={isGenerating}
            className="self-end sm:self-center"
          >
            Tulis Ringkasan Otomatis
          </Button>
        </div>

        {/* Interactive Textarea result block */}
        <div className={summary ? 'p-1 bg-ai-glow/20 border border-indigo-200/60 rounded-md shadow-sm' : ''}>
          {summary && (
            <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider block mb-1 pl-2">
              ✨ Ditulis AI · Bisa kamu edit sesuka hati
            </span>
          )}
          <Textarea
            id="profileSummary"
            label="Tinjau Ringkasan Profil"
            placeholder="Contoh: Manajer Pemasaran dengan 4 tahun pengalaman memimpin kampanye digital bernilai penjualan tinggi..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            hint="Usahakan tetap padat dan informatif. Maksimal 300 karakter."
            className={summary ? 'border-transparent focus:border-primary-500 bg-transparent' : ''}
          />
        </div>

      </div>
      
    </div>
  );
}
