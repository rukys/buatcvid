'use client';

import React, { useEffect } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import TagInput from '@/components/ui/TagInput';
import { Select } from '@/components/ui/Select';
import { Language, LanguageLevel, LANGUAGE_LEVEL_LABELS } from '@/types/resume';
import { generateId } from '@/lib/utils';
import { Plus, Trash2 } from 'lucide-react';

export default function Step5Skills() {
  const skills = useResumeStore((state) => state.skills);
  const languages = useResumeStore((state) => state.languages);
  const industry = useResumeStore((state) => state.industry);

  const addSkill = useResumeStore((state) => state.addSkill);
  const removeSkill = useResumeStore((state) => state.removeSkill);
  const addLanguage = useResumeStore((state) => state.addLanguage);
  const updateLanguage = useResumeStore((state) => state.updateLanguage);
  const removeLanguage = useResumeStore((state) => state.removeLanguage);

  // Pre-fill Bahasa Indonesia as Native by default if languages list is empty
  useEffect(() => {
    if (languages.length === 0) {
      addLanguage({
        id: generateId(),
        name: 'Bahasa Indonesia',
        level: 'native',
      });
    }
  }, [languages, addLanguage]);

  // Industry-based suggestion tags map
  const skillSuggestionsMap: Record<string, string[]> = {
    administration: ['Microsoft Excel', 'Data Entry', 'Google Workspace', 'Korespondensi Bisnis', 'Manajemen Arsip', 'Manajemen Waktu'],
    finance: ['Laporan Keuangan', 'Microsoft Excel', 'Perpajakan (Brevet)', 'Audit Keuangan', 'Analisis Anggaran', 'SAP Finance'],
    sales_marketing: ['Negosiasi', 'Social Media Ads', 'SEO / SEM', 'Analisis Data Retail', 'Copywriting', 'CRM Tools'],
    it_tech: ['Javascript / TypeScript', 'React / Next.js', 'Git / GitHub', 'SQL Databases', 'REST APIs', 'UI/UX Design'],
    healthcare: ['Asuhan Keperawatan', 'Pertolongan Pertama (PPGD)', 'Edukasi Pasien', 'Rekam Medis', 'Farmakologi', 'Empati'],
    education: ['Manajemen Kelas', 'Kurikulum Merdeka', 'Rencana Pembelajaran (RPP)', 'Evaluasi Belajar', 'Public Speaking'],
    engineering: ['AutoCAD', 'SolidWorks', 'PLC Programming', 'Project Management', 'Quality Control', 'K3 Umum'],
    logistics: ['Manajemen Gudang', 'Inventory Control', 'Supply Chain Management', 'SAP Logistics', 'Distribusi Barang'],
    hospitality: ['Customer Service', 'Point of Sale (POS)', 'Food Hygiene', 'Barista Skills', 'English for Hospitality'],
    creative: ['Adobe Photoshop / Illustrator', 'Figma', 'Video Editing (Premiere)', 'Graphic Design', 'Motion Graphics'],
    legal: ['Analisis Kontrak', 'Hukum Perdata / Pidana', 'Legal Drafting', 'Kepatuhan Regulasi', 'Negosiasi'],
    other: ['Komunikasi Efektif', 'Penyelesaian Masalah', 'Kerjasama Tim', 'Manajemen Waktu', 'Adaptabilitas'],
  };

  const suggestions = industry ? skillSuggestionsMap[industry] || [] : [];

  const handleSkillsChange = (newSkills: string[]) => {
    // Sync skills tags array: compare diffs to add or remove
    // (TagInput handles the full updated tags array, we update store state)
    // Find removed
    skills.forEach((s) => {
      if (!newSkills.includes(s)) removeSkill(s);
    });
    // Find added
    newSkills.forEach((s) => {
      if (!skills.includes(s)) addSkill(s);
    });
  };

  const handleAddLanguage = () => {
    addLanguage({
      id: generateId(),
      name: '',
      level: 'intermediate',
    });
  };

  const languageLevelOptions: { value: LanguageLevel; label: string }[] = [
    { value: 'basic', label: LANGUAGE_LEVEL_LABELS.basic },
    { value: 'intermediate', label: LANGUAGE_LEVEL_LABELS.intermediate },
    { value: 'proficient', label: LANGUAGE_LEVEL_LABELS.proficient },
    { value: 'native', label: LANGUAGE_LEVEL_LABELS.native },
  ];

  return (
    <div className="space-y-8 text-left">
      
      {/* 1. Skills tags Section */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-gray-950">
            Keahlian (Skills)
          </h2>
          <p className="text-sm text-gray-500">
            Masukkan 5–10 keahlian utama yang paling relevan dengan pekerjaan yang kamu lamar.
          </p>
        </div>

        <TagInput
          tags={skills}
          onChange={handleSkillsChange}
          suggestions={suggestions}
          placeholder="Ketik skill (misal: Microsoft Excel) lalu tekan Enter..."
          hint="Gunakan saran keahlian di bawah untuk mempercepat penulisan CV kamu."
        />
      </div>

      {/* 2. Languages Section */}
      <div className="space-y-4 pt-6 border-t border-gray-100">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-gray-950">
            Kemampuan Bahasa
          </h2>
          <p className="text-sm text-gray-500">
            Sebutkan bahasa asing atau daerah yang kamu kuasai untuk menambah nilai jual resume.
          </p>
        </div>

        {/* Language Form Rows */}
        <div className="space-y-3">
          {languages.map((lang) => (
            <div
              key={lang.id}
              className="flex items-end gap-3 bg-gray-50 p-3 rounded-sm border border-gray-200 animate-[slideUp_150ms_ease]"
            >
              <div className="flex-1">
                <label htmlFor={`lang-name-${lang.id}`} className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Bahasa
                </label>
                <input
                  id={`lang-name-${lang.id}`}
                  type="text"
                  placeholder="Contoh: Inggris, Mandarin"
                  className="w-full bg-white border border-gray-200 rounded-sm px-3 py-1.5 text-gray-800 text-sm focus:outline-none focus:border-primary-600 transition-colors"
                  value={lang.name}
                  onChange={(e) => updateLanguage(lang.id, { name: e.target.value })}
                />
              </div>

              <div className="w-1/3">
                <Select
                  label="Tingkat Kemampuan"
                  options={languageLevelOptions}
                  value={lang.level}
                  onChange={(e) => updateLanguage(lang.id, { level: e.target.value as LanguageLevel })}
                  wrapperClassName="text-xs"
                  className="py-1.5 text-sm"
                />
              </div>

              {/* Remove button (disable removing default Indonesian if it's the only one) */}
              <button
                type="button"
                onClick={() => removeLanguage(lang.id)}
                disabled={languages.length === 1 && lang.name === 'Bahasa Indonesia'}
                className="p-2 rounded-sm text-gray-400 hover:text-error-500 hover:bg-error-50 disabled:opacity-30 disabled:pointer-events-none transition-colors mb-0.5"
                aria-label={`Hapus bahasa ${lang.name}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Add language trigger */}
        <button
          type="button"
          onClick={handleAddLanguage}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-500 transition-colors pt-1"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah kemampuan bahasa</span>
        </button>

      </div>

    </div>
  );
}
