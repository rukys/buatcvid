'use client';

import React, { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card } from '@/components/ui/Card';
import { generateId } from '@/lib/utils';
import { DEGREE_LABELS, Education, DegreeLevel } from '@/types/resume';
import { Trash2, Plus, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Step4Education() {
  const educations = useResumeStore((state) => state.educations);
  
  const addEducation = useResumeStore((state) => state.addEducation);
  const updateEducation = useResumeStore((state) => state.updateEducation);
  const removeEducation = useResumeStore((state) => state.removeEducation);

  const [editingId, setEditingId] = useState<string | null>(null);

  // Generate graduation years (current year + 5 years for future grads, down to 30 years ago)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 35 }, (_, idx) => {
    const y = String(currentYear + 5 - idx);
    return { value: y, label: y };
  });

  const degreeOptions: { value: DegreeLevel; label: string }[] = [
    { value: 'sma_smk', label: DEGREE_LABELS.sma_smk },
    { value: 'd1_d2_d3', label: DEGREE_LABELS.d1_d2_d3 },
    { value: 's1', label: DEGREE_LABELS.s1 },
    { value: 's2', label: DEGREE_LABELS.s2 },
    { value: 's3', label: DEGREE_LABELS.s3 },
  ];

  const handleAdd = () => {
    const newId = generateId();
    const newEdu: Education = {
      id: newId,
      institution: '',
      degree: 's1',
      major: '',
      graduationYear: String(currentYear),
      isOngoing: false,
    };
    addEducation(newEdu);
    setEditingId(newId);
  };

  const handleSaveCard = (id: string) => {
    const edu = educations.find((e) => e.id === id);
    if (!edu || edu.institution.trim() === '' || edu.major.trim() === '') {
      toast.error('Silakan isi Nama Institusi dan Jurusan/Program Studi.');
      return;
    }
    setEditingId(null);
  };

  // Sort educations: ongoing first, then sort by graduation year descending
  const sortedEducations = [...educations].sort((a, b) => {
    const yearA = a.isOngoing ? 9999 : Number(a.graduationYear || 0);
    const yearB = b.isOngoing ? 9999 : Number(b.graduationYear || 0);
    return yearB - yearA;
  });

  return (
    <div className="space-y-6 text-left">
      {/* Step Heading */}
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold font-heading text-gray-950">
          Riwayat Pendidikan
        </h2>
        <p className="text-sm text-gray-500">
          Masukkan riwayat pendidikan formal kamu, mulai dari jenjang sekolah menengah (SMA/SMK) hingga kuliah.
        </p>
      </div>

      {/* Cards List or Empty State */}
      {sortedEducations.length === 0 ? (
        <div className="text-center py-10 px-4 border border-dashed border-gray-200 rounded-lg space-y-4 bg-gray-50/30">
          <div className="mx-auto w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-400 border border-gray-100 shadow-xs">
            <Plus className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-gray-950">Belum Ada Riwayat Pendidikan</h3>
            <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
              Tambahkan riwayat pendidikan formal kamu untuk mempermudah HRD memverifikasi kualifikasi akademikmu.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 bg-primary-600 text-white px-4 py-2.5 rounded-md text-xs font-bold hover:bg-primary-500 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Pendidikan Pertama</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4 pt-2">
          {sortedEducations.map((edu) => {
            const isEditing = editingId === edu.id;

            return (
              <Card
                key={edu.id}
                className={`p-5 transition-all duration-200 relative ${
                  isEditing ? 'border-primary-600 ring-2 ring-primary-50/50' : 'hover:border-gray-300'
                }`}
              >
                
                {/* Collapsed Mode */}
                {!isEditing && (
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="font-bold text-gray-950 text-sm">
                        {DEGREE_LABELS[edu.degree]} {edu.major || 'Jurusan'}
                      </h3>
                      <p className="text-xs text-gray-600 font-semibold">
                        {edu.institution || 'Nama Sekolah / Kampus'}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        {edu.isOngoing
                          ? `Masih Kuliah (Ekspektasi Lulus: ${edu.expectedGraduationYear || '-'})`
                          : `Lulus Tahun: ${edu.graduationYear}`}
                        {edu.gpa ? ` · IPK: ${edu.gpa}` : ''}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => setEditingId(edu.id)}
                        className="bg-primary-50 text-primary-600 px-2.5 py-1 rounded-sm text-xs font-bold hover:bg-primary-100 transition-colors"
                      >
                        Edit
                      </button>
                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm('Apakah kamu yakin ingin menghapus riwayat pendidikan ini?')) {
                            removeEducation(edu.id);
                          }
                        }}
                        className="p-1.5 rounded-sm hover:bg-error-50 text-gray-400 hover:text-error-500 transition-colors"
                        aria-label="Hapus pendidikan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Editable Mode */}
                {isEditing && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      <Input
                        id={`edu-institution-${edu.id}`}
                        label="Nama Institusi (Sekolah / Kampus)"
                        placeholder="Contoh: Universitas Indonesia atau SMAN 1 Jakarta"
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                        wrapperClassName="md:col-span-2"
                      />

                      <Select
                        label="Jenjang Pendidikan"
                        options={degreeOptions}
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, { degree: e.target.value as DegreeLevel })}
                      />

                      <Input
                        id={`edu-major-${edu.id}`}
                        label="Jurusan / Program Studi"
                        placeholder="Contoh: Teknik Informatika atau IPS"
                        value={edu.major}
                        onChange={(e) => updateEducation(edu.id, { major: e.target.value })}
                      />

                      <Select
                        label={edu.isOngoing ? 'Ekspektasi Tahun Lulus' : 'Tahun Lulus'}
                        options={years}
                        value={edu.isOngoing ? (edu.expectedGraduationYear || String(currentYear)) : (edu.graduationYear || String(currentYear))}
                        onChange={(e) => {
                          if (edu.isOngoing) {
                            updateEducation(edu.id, { expectedGraduationYear: e.target.value });
                          } else {
                            updateEducation(edu.id, { graduationYear: e.target.value });
                          }
                        }}
                      />

                      <Input
                        id={`edu-gpa-${edu.id}`}
                        label="IPK / Nilai Rata-rata (Opsional)"
                        placeholder="Contoh: 3.50 atau 85.0"
                        value={edu.gpa || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateEducation(edu.id, { gpa: val === '' ? undefined : val });
                        }}
                      />

                      {/* Ongoing check */}
                      <div className="md:col-span-2 flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`edu-ongoing-${edu.id}`}
                          checked={edu.isOngoing}
                          onChange={(e) =>
                            updateEducation(edu.id, {
                              isOngoing: e.target.checked,
                              graduationYear: e.target.checked ? undefined : String(currentYear),
                              expectedGraduationYear: e.target.checked ? String(currentYear + 2) : undefined,
                            })
                          }
                          className="rounded text-primary-600 focus:ring-primary-500 w-4 h-4"
                        />
                        <label htmlFor={`edu-ongoing-${edu.id}`} className="text-xs font-semibold text-gray-700 cursor-pointer">
                          Saya masih aktif menempuh pendidikan di sini
                        </label>
                      </div>
                    </div>

                    {/* Save Card */}
                    <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => handleSaveCard(edu.id)}
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

      {/* Add New Education card button */}
      {!editingId && sortedEducations.length > 0 && (
        <button
          type="button"
          onClick={handleAdd}
          className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50/10 text-gray-500 hover:text-primary-600 transition-all font-semibold flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Riwayat Pendidikan Baru</span>
        </button>
      )}
    </div>
  );
}
