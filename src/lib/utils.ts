import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DegreeLevel, LanguageLevel } from '@/types/resume';

// Merge Tailwind classes safely
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Generate unique ID untuk list items
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

// Format periode kerja
export function formatPeriod(
  startMonth: string,
  startYear: string,
  endMonth?: string,
  endYear?: string,
  isCurrentJob?: boolean,
  language: 'id' | 'en' = 'id'
): string {
  const months = language === 'id'
    ? ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des']
    : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const start = `${months[parseInt(startMonth, 10) - 1]} ${startYear}`;
  const end = isCurrentJob
    ? (language === 'id' ? 'Sekarang' : 'Present')
    : endMonth && endYear
      ? `${months[parseInt(endMonth, 10) - 1]} ${endYear}`
      : '';

  return `${start} – ${end}`;
}

// Localized Degree Labels
export function getDegreeLabel(degree: DegreeLevel, language: 'id' | 'en' = 'id'): string {
  const labels: Record<'id' | 'en', Record<DegreeLevel, string>> = {
    id: {
      sma_smk: 'SMA / SMK',
      d1_d2_d3: 'D1 / D2 / D3',
      s1: 'S1 (Sarjana)',
      s2: 'S2 (Magister)',
      s3: 'S3 (Doktor)',
    },
    en: {
      sma_smk: 'High School',
      d1_d2_d3: 'Associate Degree',
      s1: "Bachelor's Degree",
      s2: "Master's Degree",
      s3: 'Doctorate Degree',
    },
  };
  return labels[language][degree] || degree;
}

// Localized Language Level Labels
export function getLanguageLevelLabel(level: LanguageLevel, language: 'id' | 'en' = 'id'): string {
  const labels: Record<'id' | 'en', Record<LanguageLevel, string>> = {
    id: {
      basic: 'Dasar',
      intermediate: 'Menengah',
      proficient: 'Mahir',
      native: 'Native / Bahasa Ibu',
    },
    en: {
      basic: 'Basic',
      intermediate: 'Intermediate',
      proficient: 'Proficient',
      native: 'Native / Mother Tongue',
    },
  };
  return labels[language][level] || level;
}

