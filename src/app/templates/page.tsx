'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUIStore } from '@/store/useUIStore';
import { TemplateId } from '@/types/resume';
import { Button } from '@/components/ui/Button';
import Navbar from '@/components/shared/Navbar';
import { Check, Sparkles, Layout, Compass, Feather } from 'lucide-react';

interface TemplateCard {
  id: TemplateId;
  name: string;
  desc: string;
  categories: ('ats' | 'modern' | 'minimalist')[];
  features: string[];
  difficulty: 'Sangat Mudah' | 'Mudah' | 'Rekomendasi';
}

export default function TemplatesPage() {
  const router = useRouter();
  const selectedTemplate = useUIStore((state) => state.selectedTemplate);
  const setTemplate = useUIStore((state) => state.setTemplate);
  const [activeFilter, setActiveFilter] = useState<'all' | 'ats' | 'modern' | 'minimalist'>('all');

  const templates: TemplateCard[] = [
    {
      id: 'clean',
      name: 'Template Clean (Bersih)',
      desc: 'Desain klasik satu kolom yang bersih dan sangat rapi. Cocok untuk semua bidang profesi.',
      categories: ['ats', 'minimalist'],
      features: ['Satu Kolom Klasik', '100% Lolos Sistem ATS', 'Sangat Readable untuk HRD', 'Sederhana & Profesional'],
      difficulty: 'Sangat Mudah',
    },
    {
      id: 'modern',
      name: 'Template Modern (Kreatif)',
      desc: 'Desain dua kolom dengan panel warna aksen di sisi kiri untuk memamerkan foto dan skill secara menonjol.',
      categories: ['modern', 'ats'],
      features: ['Dua Kolom Dinamis', 'Highlight Foto Profil', 'Visual Tag Chip Keahlian', 'Layout Hemat Ruang'],
      difficulty: 'Rekomendasi',
    },
    {
      id: 'elegant',
      name: 'Template Elegant (Eksekutif)',
      desc: 'Desain satu kolom dengan struktur garis pembatas elegan dan tipografi semi-serif berwibawa.',
      categories: ['ats', 'modern', 'minimalist'],
      features: ['Sentuhan Garis Klasik', 'Tipografi Berwibawa', 'Cocok untuk Posisi Manajerial', 'Layout Bersih & Berkelas'],
      difficulty: 'Mudah',
    },
  ];

  const handleSelectTemplate = (id: TemplateId) => {
    setTemplate(id);
    router.push(`/builder?template=${id}`);
  };

  const filteredTemplates = templates.filter((tpl) => {
    if (activeFilter === 'all') return true;
    return tpl.categories.includes(activeFilter);
  });

  // Render miniature mockup using Tailwind to avoid boring generic placeholders
  const renderMockup = (id: TemplateId) => {
    const linesColor = 'bg-gray-200';
    const accentLineColor = 'bg-primary-500';

    if (id === 'clean') {
      return (
        <div className="w-full h-40 bg-white border border-gray-100 rounded-md p-3 flex flex-col items-center justify-between select-none">
          {/* Mock Header */}
          <div className="w-full flex flex-col items-center gap-1">
            <div className="w-16 h-2 bg-gray-400 rounded-xs" />
            <div className="w-10 h-1.5 bg-primary-300 rounded-xs" />
            <div className="w-24 h-1 bg-gray-200 rounded-xs" />
          </div>
          {/* Mock Sections */}
          <div className="w-full space-y-2 mt-2">
            <div className="space-y-1">
              <div className="w-12 h-1.5 bg-gray-300 rounded-xs" />
              <div className="h-[1px] bg-gray-100" />
              <div className="w-full h-1 bg-gray-200 rounded-xs" />
              <div className="w-3/4 h-1 bg-gray-200 rounded-xs" />
            </div>
            <div className="space-y-1">
              <div className="w-12 h-1.5 bg-gray-300 rounded-xs" />
              <div className="h-[1px] bg-gray-100" />
              <div className="w-5/6 h-1 bg-gray-200 rounded-xs" />
              <div className="w-4/5 h-1 bg-gray-200 rounded-xs" />
            </div>
          </div>
        </div>
      );
    }

    if (id === 'modern') {
      return (
        <div className="w-full h-40 bg-white border border-gray-100 rounded-md flex select-none overflow-hidden">
          {/* Mock Sidebar */}
          <div className="w-1/3 bg-primary-600 p-2.5 flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/30 border border-white/20" />
            <div className="w-8 h-1.5 bg-white/80 rounded-xs" />
            <div className="w-6 h-1 bg-white/40 rounded-xs" />
            <div className="w-full space-y-1.5 mt-1">
              <div className="w-10 h-1 bg-white/40 rounded-xs" />
              <div className="w-8 h-1 bg-white/40 rounded-xs" />
            </div>
          </div>
          {/* Mock Main content */}
          <div className="w-2/3 p-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="space-y-1">
                <div className="w-12 h-1.5 bg-gray-400 rounded-xs" />
                <div className="h-[1px] bg-gray-100" />
                <div className="w-full h-1 bg-gray-200 rounded-xs" />
                <div className="w-5/6 h-1 bg-gray-200 rounded-xs" />
              </div>
              <div className="space-y-1">
                <div className="w-10 h-1.5 bg-gray-400 rounded-xs" />
                <div className="h-[1px] bg-gray-100" />
                <div className="w-4/5 h-1 bg-gray-200 rounded-xs" />
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Elegant Template
    return (
      <div className="w-full h-40 bg-white border border-gray-100 rounded-md p-3 flex flex-col justify-between select-none">
        {/* Mock Header */}
        <div className="w-full pb-1 border-b border-primary-500 flex justify-between items-end">
          <div className="space-y-1">
            <div className="w-14 h-2.5 bg-gray-400 rounded-xs" />
            <div className="w-10 h-1.5 bg-primary-400 rounded-xs" />
          </div>
          <div className="w-12 h-1 bg-gray-200 rounded-xs" />
        </div>
        {/* Mock Sections */}
        <div className="w-full space-y-2">
          <div className="space-y-1">
            <div className="w-14 h-1.5 bg-gray-300 rounded-xs" />
            <div className="w-full h-1 bg-gray-200 rounded-xs" />
            <div className="w-5/6 h-1 bg-gray-200 rounded-xs" />
          </div>
          <div className="space-y-1">
            <div className="w-14 h-1.5 bg-gray-300 rounded-xs" />
            <div className="w-4/5 h-1 bg-gray-200 rounded-xs" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Page Hero Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-xs font-semibold text-primary-600">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Desain Terstandarisasi Recruiter</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-gray-950 tracking-tight">
            Pilih Desain Template Terbaik Kamu
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Semua template dirancang profesional, lolos sistem seleksi ATS HRD, dan teroptimasi untuk keterbacaan tinggi di berbagai jenis layar.
          </p>
        </div>

        {/* Filter Section */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white p-1.5 rounded-lg border border-gray-200 shadow-sm gap-1 max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-md text-xs font-bold transition-all whitespace-nowrap ${
                activeFilter === 'all'
                  ? 'bg-primary-600 text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Semua Desain
            </button>
            <button
              onClick={() => setActiveFilter('ats')}
              className={`px-4 py-2 rounded-md text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeFilter === 'ats'
                  ? 'bg-primary-600 text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              ATS-Friendly
            </button>
            <button
              onClick={() => setActiveFilter('modern')}
              className={`px-4 py-2 rounded-md text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeFilter === 'modern'
                  ? 'bg-primary-600 text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Modern
            </button>
            <button
              onClick={() => setActiveFilter('minimalist')}
              className={`px-4 py-2 rounded-md text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeFilter === 'minimalist'
                  ? 'bg-primary-600 text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Feather className="w-3.5 h-3.5" />
              Minimalis
            </button>
          </div>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredTemplates.map((tpl) => (
            <div
              key={tpl.id}
              className={`bg-white rounded-lg border transition-all duration-200 overflow-hidden flex flex-col h-full hover:shadow-md ${
                selectedTemplate === tpl.id ? 'border-primary-600 ring-2 ring-primary-50' : 'border-gray-200'
              }`}
            >
              {/* Card visual header */}
              <div className="bg-gray-50 p-6 border-b border-gray-100 relative">
                {selectedTemplate === tpl.id && (
                  <span className="absolute top-3 right-3 bg-primary-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>Aktif</span>
                  </span>
                )}
                {renderMockup(tpl.id)}
              </div>

              {/* Card content body */}
              <div className="p-6 flex-grow flex flex-col justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-gray-950">{tpl.name}</h3>
                    <span className="text-[10px] font-bold text-primary-600 px-2 py-0.5 bg-primary-50 rounded-full">
                      {tpl.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{tpl.desc}</p>
                  
                  {/* Features list */}
                  <ul className="space-y-2 pt-2 border-t border-gray-100">
                    {tpl.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[11px] text-gray-600">
                        <Check className="w-3.5 h-3.5 text-primary-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  type="button"
                  variant={selectedTemplate === tpl.id ? 'secondary' : 'primary'}
                  size="md"
                  className="w-full"
                  onClick={() => handleSelectTemplate(tpl.id)}
                >
                  {selectedTemplate === tpl.id ? 'Edit Resume Dengan Template Ini' : 'Gunakan Template Ini'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
