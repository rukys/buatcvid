'use client';

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Industry, INDUSTRY_LABELS } from '@/types/resume';

export default function Step1Industry() {
  const industry = useResumeStore((state) => state.industry);
  const targetPosition = useResumeStore((state) => state.targetPosition);
  const setIndustry = useResumeStore((state) => state.setIndustry);
  const setTargetPosition = useResumeStore((state) => state.setTargetPosition);
  const setPersonalInfo = useResumeStore((state) => state.setPersonalInfo);

  const industries: { value: Industry; label: string; emoji: string }[] = [
    { value: 'administration', label: INDUSTRY_LABELS.administration, emoji: '💼' },
    { value: 'finance', label: INDUSTRY_LABELS.finance, emoji: '📊' },
    { value: 'sales_marketing', label: INDUSTRY_LABELS.sales_marketing, emoji: '🛒' },
    { value: 'it_tech', label: INDUSTRY_LABELS.it_tech, emoji: '💻' },
    { value: 'healthcare', label: INDUSTRY_LABELS.healthcare, emoji: '🏥' },
    { value: 'education', label: INDUSTRY_LABELS.education, emoji: '🎓' },
    { value: 'engineering', label: INDUSTRY_LABELS.engineering, emoji: '🏗️' },
    { value: 'logistics', label: INDUSTRY_LABELS.logistics, emoji: '🚚' },
    { value: 'hospitality', label: INDUSTRY_LABELS.hospitality, emoji: '🍽️' },
    { value: 'creative', label: INDUSTRY_LABELS.creative, emoji: '🎨' },
    { value: 'legal', label: INDUSTRY_LABELS.legal, emoji: '⚖️' },
    { value: 'other', label: INDUSTRY_LABELS.other, emoji: '📦' },
  ];

  const handleSelectIndustry = (val: Industry) => {
    setIndustry(val);
  };

  const handlePositionChange = (val: string) => {
    setTargetPosition(val);
    // Keep personalInfo position aligned to reduce redundant inputs for the user
    setPersonalInfo({ targetPosition: val });
  };

  return (
    <div className="space-y-6 text-left">
      {/* Step Heading */}
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold font-heading text-gray-950">
          Kamu bekerja di bidang apa?
        </h2>
        <p className="text-sm text-gray-500">
          Informasi ini membantu AI menyesuaikan gaya bahasa dan menyarankan kata kunci (keywords) yang tepat.
        </p>
      </div>

      {/* Industry Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
        {industries.map((ind) => {
          const isSelected = industry === ind.value;
          return (
            <Card
              key={ind.value}
              selected={isSelected}
              hoverable
              onClick={() => handleSelectIndustry(ind.value)}
              className="p-4 flex flex-col items-center justify-center text-center gap-2 aspect-[4/3] sm:aspect-auto"
            >
              <span className="text-2xl sm:text-3xl select-none" role="img" aria-label={ind.label}>
                {ind.emoji}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-gray-950 leading-tight">
                {ind.label}
              </span>
            </Card>
          );
        })}
      </div>

      {/* Target Position Input (shown only after choosing industry) */}
      {industry && (
        <div className="pt-4 border-t border-gray-100 animate-[slideUp_200ms_ease-out]">
          <Input
            id="targetPosition"
            label="Posisi / jabatan apa yang ingin kamu lamar?"
            placeholder="Contoh: Staff Administrasi, Sales Supervisor, Front-End Developer"
            value={targetPosition}
            onChange={(e) => handlePositionChange(e.target.value)}
            hint="Sebutkan jabatan spesifik untuk mempermudah HRD mencari CV kamu."
          />
        </div>
      )}
    </div>
  );
}
