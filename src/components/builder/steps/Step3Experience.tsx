'use client';

import React, { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Card } from '@/components/ui/Card';
import { generateId, formatPeriod } from '@/lib/utils';
import { MONTHS, WorkExperience } from '@/types/resume';
import { generateExperienceBullets } from '@/actions/generateExperienceBullets';
import { Trash2, ChevronDown, ChevronUp, Sparkles, Plus, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Step3Experience() {
  const experiences = useResumeStore((state) => state.experiences);
  const isFreshGrad = useResumeStore((state) => state.isFreshGrad);
  const industry = useResumeStore((state) => state.industry);
  const targetPosition = useResumeStore((state) => state.targetPosition);
  const outputLanguage = useResumeStore((state) => state.outputLanguage);

  const addExperience = useResumeStore((state) => state.addExperience);
  const updateExperience = useResumeStore((state) => state.updateExperience);
  const removeExperience = useResumeStore((state) => state.removeExperience);
  const reorderExperiences = useResumeStore((state) => state.reorderExperiences);
  const setIsFreshGrad = useResumeStore((state) => state.setIsFreshGrad);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isGeneratingId, setIsGeneratingId] = useState<string | null>(null);

  // Generate years list (current year down to 30 years ago)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, idx) => {
    const y = String(currentYear - idx);
    return { value: y, label: y };
  });

  const handleAdd = () => {
    const newId = generateId();
    const newExp: WorkExperience = {
      id: newId,
      companyName: '',
      position: '',
      startMonth: '01',
      startYear: String(currentYear),
      isCurrentJob: false,
      bullets: [],
      isAIGenerated: false,
    };
    addExperience(newExp);
    setEditingId(newId);
  };

  const handleSaveCard = (id: string) => {
    // Basic validation check
    const exp = experiences.find((e) => e.id === id);
    if (!exp || exp.companyName.trim() === '' || exp.position.trim() === '') {
      toast.error('Silakan isi Nama Perusahaan/Organisasi dan Posisi.');
      return;
    }
    setEditingId(null);
  };

  // AI Bullet generator connected to Anthropic API Action in Phase 3
  const handleAIGenerate = async (id: string, exp: WorkExperience) => {
    if (!exp.position || exp.position.trim() === '') {
      toast.error('Silakan isi Posisi / Jabatan terlebih dahulu agar AI memahami konteks pekerjaan.');
      return;
    }
    if (!industry) {
      toast.error('Silakan kembali ke Langkah 1 dan pilih bidang pekerjaan terlebih dahulu.');
      return;
    }

    setIsGeneratingId(id);

    try {
      const { bullets, error } = await generateExperienceBullets({
        position: exp.position,
        company: exp.companyName,
        industry: industry,
        userDescription: exp.userDescription,
        language: outputLanguage,
      });

      if (error || !bullets) {
        toast.error(error || 'Gagal menghasilkan deskripsi pencapaian kerja.');
      } else {
        updateExperience(id, {
          bullets: bullets,
          isAIGenerated: true,
          userDescription: bullets.join('\n'), // Pre-fill description text area
        });
        toast.success('Pencapaian berhasil ditulis oleh AI!');
      }
    } catch (err) {
      toast.error('Terjadi kesalahan koneksi server.');
    } finally {
      setIsGeneratingId(null);
    }
  };

  const handleBulletTextChange = (id: string, text: string) => {
    // User can edit the text block, which split into bullets array
    const bullets = text
      .split('\n')
      .map((b) => b.trim())
      .filter((b) => b !== '');
    updateExperience(id, { userDescription: text, bullets });
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Header and Toggle Mode */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-gray-950">
            Ceritakan pengalaman kamu
          </h2>
          <p className="text-sm text-gray-500">
            HRD memprioritaskan CV yang menunjukkan pencapaian konkret di pekerjaan sebelumnya.
          </p>
        </div>
        
        {/* Fresh Grad Mode Toggle */}
        <label className="inline-flex items-center gap-2 cursor-pointer self-start sm:self-center bg-gray-100 px-3 py-2 rounded-md hover:bg-gray-200/60 transition-colors select-none">
          <input
            type="checkbox"
            checked={isFreshGrad}
            onChange={(e) => {
              setIsFreshGrad(e.target.checked);
              setEditingId(experiences.length > 0 ? null : editingId);
            }}
            className="rounded text-primary-600 focus:ring-primary-500 w-4 h-4"
          />
          <span className="text-xs font-semibold text-gray-700">
            Saya belum memiliki pengalaman kerja formal
          </span>
        </label>
      </div>

      {/* Render Cards List or Empty State */}
      {experiences.length === 0 ? (
        <div className="text-center py-10 px-4 border border-dashed border-gray-200 rounded-lg space-y-4 bg-gray-50/30">
          <div className="mx-auto w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-400 border border-gray-100 shadow-xs">
            <Plus className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-gray-950">
              {isFreshGrad ? 'Belum Ada Organisasi / Proyek' : 'Belum Ada Pengalaman Kerja'}
            </h3>
            <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
              {isFreshGrad
                ? 'Tambahkan pengalaman organisasi, magang, kepanitiaan, atau proyek pribadi yang pernah kamu lakukan.'
                : 'Tambahkan pengalaman kerja formal atau non-formal kamu untuk menarik perhatian HRD.'}
            </p>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 bg-primary-600 text-white px-4 py-2.5 rounded-md text-xs font-bold hover:bg-primary-500 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>{isFreshGrad ? 'Tambah Kegiatan Pertama' : 'Tambah Pengalaman Pertama'}</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4 pt-2">
          {experiences.map((exp, idx) => {
            const isEditing = editingId === exp.id;
            const isGenerating = isGeneratingId === exp.id;

            return (
              <Card
                key={exp.id}
                className={`p-5 transition-all duration-200 relative ${
                  isEditing ? 'border-primary-600 ring-2 ring-primary-50/50' : 'hover:border-gray-300'
                }`}
              >
                
                {/* Card Summary Mode (Collapsed) */}
                {!isEditing && (
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="font-bold text-gray-950 text-sm">
                        {exp.position || 'Posisi/Jabatan'}
                      </h3>
                      <p className="text-xs text-gray-600 font-semibold">
                        {exp.companyName || 'Nama Instansi/Perusahaan'}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        {formatPeriod(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.isCurrentJob)}
                      </p>
                    </div>
                    
                    {/* Operations Buttons Row */}
                    <div className="flex items-center gap-1">
                      {/* Reorder Up */}
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => reorderExperiences(idx, idx - 1)}
                        className="p-1.5 rounded-sm hover:bg-gray-100 text-gray-400 hover:text-gray-950 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                        aria-label="Pindahkan ke atas"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      {/* Reorder Down */}
                      <button
                        type="button"
                        disabled={idx === experiences.length - 1}
                        onClick={() => reorderExperiences(idx, idx + 1)}
                        className="p-1.5 rounded-sm hover:bg-gray-100 text-gray-400 hover:text-gray-950 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                        aria-label="Pindahkan ke bawah"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => setEditingId(exp.id)}
                        className="bg-primary-50 text-primary-600 px-2.5 py-1 rounded-sm text-xs font-bold hover:bg-primary-100 transition-colors"
                      >
                        Edit
                      </button>
                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm('Apakah kamu yakin ingin menghapus pengalaman ini?')) {
                            removeExperience(exp.id);
                          }
                        }}
                        className="p-1.5 rounded-sm hover:bg-error-50 text-gray-400 hover:text-error-500 transition-colors ml-1"
                        aria-label="Hapus pengalaman"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Card Editable Form Mode (Expanded) */}
                {isEditing && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        id={`exp-position-${exp.id}`}
                        label={isFreshGrad ? 'Peran / Tanggung Jawab' : 'Posisi / Jabatan'}
                        placeholder={isFreshGrad ? 'Contoh: Ketua Panitia / Project Manager' : 'Contoh: Social Media Specialist'}
                        value={exp.position}
                        onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                      />
                      
                      <Input
                        id={`exp-company-${exp.id}`}
                        label={isFreshGrad ? 'Nama Organisasi / Proyek' : 'Nama Instansi / Perusahaan'}
                        placeholder={isFreshGrad ? 'Contoh: BEM Universitas / Website Project' : 'Contoh: PT Kopi Digital Agency'}
                        value={exp.companyName}
                        onChange={(e) => updateExperience(exp.id, { companyName: e.target.value })}
                      />

                      {/* Period Starts dropdown */}
                      <div className="grid grid-cols-2 gap-2">
                        <Select
                          label="Bulan Mulai"
                          options={MONTHS}
                          value={exp.startMonth}
                          onChange={(e) => updateExperience(exp.id, { startMonth: e.target.value })}
                        />
                        <Select
                          label="Tahun Mulai"
                          options={years}
                          value={exp.startYear}
                          onChange={(e) => updateExperience(exp.id, { startYear: e.target.value })}
                        />
                      </div>

                      {/* Period Ends dropdown (or disabled if current job) */}
                      <div className="grid grid-cols-2 gap-2">
                        <Select
                          label="Bulan Selesai"
                          options={MONTHS}
                          value={exp.endMonth || '12'}
                          onChange={(e) => updateExperience(exp.id, { endMonth: e.target.value })}
                          disabled={exp.isCurrentJob}
                        />
                        <Select
                          label="Tahun Selesai"
                          options={years}
                          value={exp.endYear || String(currentYear)}
                          onChange={(e) => updateExperience(exp.id, { endYear: e.target.value })}
                          disabled={exp.isCurrentJob}
                        />
                      </div>

                      {/* Current job check */}
                      <div className="md:col-span-2 flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`exp-current-${exp.id}`}
                          checked={exp.isCurrentJob}
                          onChange={(e) =>
                            updateExperience(exp.id, {
                              isCurrentJob: e.target.checked,
                              endMonth: e.target.checked ? undefined : '12',
                              endYear: e.target.checked ? undefined : String(currentYear),
                            })
                          }
                          className="rounded text-primary-600 focus:ring-primary-500 w-4 h-4"
                        />
                        <label htmlFor={`exp-current-${exp.id}`} className="text-xs font-semibold text-gray-700 cursor-pointer">
                          {isFreshGrad ? 'Saya masih aktif di proyek/organisasi ini' : 'Saya masih aktif bekerja di sini'}
                        </label>
                      </div>

                      <Input
                        id={`exp-location-${exp.id}`}
                        label="Lokasi / Wilayah (Opsional)"
                        placeholder="Contoh: Jakarta Selatan atau Remote"
                        value={exp.location || ''}
                        onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                        wrapperClassName="md:col-span-2"
                      />

                      {/* Description & AI Generator */}
                      <div className="md:col-span-2 space-y-3">
                        <div className="flex justify-between items-end">
                          <label htmlFor={`exp-desc-${exp.id}`} className="text-sm font-semibold text-gray-700">
                            {isFreshGrad ? 'Deskripsi Kegiatan / Kontribusi' : 'Deskripsi Pekerjaan / Pencapaian'}
                          </label>
                          
                          {/* Sparkles AI button */}
                          <Button
                            type="button"
                            variant="ai"
                            size="sm"
                            onClick={() => handleAIGenerate(exp.id, exp)}
                            loading={isGenerating}
                          >
                            Tuliskan pakai AI
                          </Button>
                        </div>

                        {/* AI glow block container for editable results */}
                        <div className={exp.isAIGenerated ? 'p-1 bg-ai-glow/20 border border-indigo-200/60 rounded-md shadow-sm' : ''}>
                          {exp.isAIGenerated && (
                            <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider block mb-1 pl-2">
                              ✨ Ditulis AI · Bisa kamu edit sesuka hati
                            </span>
                          )}
                          <Textarea
                            id={`exp-desc-${exp.id}`}
                            placeholder={
                              isFreshGrad
                                ? 'Jelaskan peran kamu di kepanitiaan/organisasi tersebut, misalnya: Mengkoordinasi 10 orang panitia untuk acara pensi sekolah...'
                                : 'Contoh: Melakukan pitching klien baru, menyusun jadwal konten Instagram...'
                            }
                            value={exp.userDescription || ''}
                            onChange={(e) => handleBulletTextChange(exp.id, e.target.value)}
                            hint="Gunakan Enter untuk memisahkan setiap poin kalimat pencapaian kerja kamu."
                            className={exp.isAIGenerated ? 'border-transparent focus:border-primary-500 bg-transparent' : ''}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Save Card Button */}
                    <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => handleSaveCard(exp.id)}
                        className="bg-primary-600 text-white font-bold text-xs px-4 py-2 rounded-sm hover:bg-primary-500 transition-colors flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Simpan Rincian</span>
                      </button>
                    </div>
                  </div>
                )}

              </Card>
            );
          })}
        </div>
      )}

      {/* Add New Experience card button */}
      {!editingId && (
        <button
          type="button"
          onClick={handleAdd}
          className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50/10 text-gray-500 hover:text-primary-600 transition-all font-semibold flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>{isFreshGrad ? 'Tambah Organisasi/Proyek Baru' : 'Tambah Pengalaman Kerja Baru'}</span>
        </button>
      )}
    </div>
  );
}
