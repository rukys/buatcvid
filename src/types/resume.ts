// ============================================
// ENUMS & UNION TYPES
// ============================================

export type Industry =
  | 'administration'
  | 'finance'
  | 'sales_marketing'
  | 'it_tech'
  | 'healthcare'
  | 'education'
  | 'engineering'
  | 'logistics'
  | 'hospitality'
  | 'creative'
  | 'legal'
  | 'other';

export type DegreeLevel =
  | 'sma_smk'
  | 'd1_d2_d3'
  | 's1'
  | 's2'
  | 's3';

export type LanguageLevel =
  | 'basic'
  | 'intermediate'
  | 'proficient'
  | 'native';

export type SummaryTone =
  | 'formal'
  | 'semiformal'
  | 'confident';

export type OutputLanguage = 'id' | 'en';

export type TemplateId = 'clean' | 'modern' | 'elegant';

export type AccentColor =
  | '#2563EB'  // Biru (default)
  | '#475569'  // Abu
  | '#16A34A'  // Hijau
  | '#DC2626'  // Merah
  | '#7C3AED'; // Ungu

// ============================================
// DATA INTERFACES
// ============================================

export interface PersonalInfo {
  fullName: string;
  targetPosition: string;
  email: string;
  phone: string;
  city: string;
  linkedIn?: string;
  portfolio?: string;
  photoUrl?: string;
}

export interface WorkExperience {
  id: string;                    // nanoid atau uuid
  companyName: string;
  position: string;
  startMonth: string;            // e.g. "01" (Januari)
  startYear: string;             // e.g. "2022"
  endMonth?: string;
  endYear?: string;
  isCurrentJob: boolean;
  location?: string;
  userDescription?: string;      // Deskripsi manual dari user
  bullets: string[];             // Generated atau manual
  isAIGenerated: boolean;
  isFreshGradMode?: boolean;     // Mode organisasi/project
}

export interface Education {
  id: string;
  institution: string;
  degree: DegreeLevel;
  major: string;
  graduationYear?: string;
  gpa?: string;                  // e.g. "3.75" atau "85.0"
  isOngoing: boolean;
  expectedGraduationYear?: string;
}

export interface Language {
  id: string;
  name: string;
  level: LanguageLevel;
}

// ============================================
// MAIN RESUME DATA
// ============================================

export interface ResumeData {
  // Step 1
  industry: Industry | null;
  targetPosition: string;

  // Step 2
  personalInfo: PersonalInfo;

  // Step 3
  experiences: WorkExperience[];
  isFreshGrad: boolean;

  // Step 4
  educations: Education[];

  // Step 5
  skills: string[];
  languages: Language[];

  // Step 6
  summary: string;
  summaryTone: SummaryTone;

  // Step 7 / Global
  outputLanguage: OutputLanguage;
}

// ============================================
// UI STATE
// ============================================

export interface UIState {
  currentStep: number;            // 1–7
  totalSteps: number;             // 7
  selectedTemplate: TemplateId;
  accentColor: AccentColor;
  isGenerating: boolean;
  generatingField?: string;       // field mana yang sedang di-generate
}

// ============================================
// SERVER ACTION TYPES
// ============================================

export interface GenerateBulletsInput {
  position: string;
  company: string;
  industry: Industry;
  userDescription?: string;
  language: OutputLanguage;
}

export interface GenerateBulletsOutput {
  bullets: string[] | null;
  error?: string;
}

export interface GenerateSummaryInput {
  resumeData: ResumeData;
  tone: SummaryTone;
  language: OutputLanguage;
}

export interface GenerateSummaryOutput {
  summary: string | null;
  error?: string;
}

// ============================================
// CONSTANTS (bisa dipisah ke lib/constants.ts)
// ============================================

export const INDUSTRY_LABELS: Record<Industry, string> = {
  administration:  'Administrasi & Perkantoran',
  finance:         'Keuangan & Akuntansi',
  sales_marketing: 'Penjualan & Marketing',
  it_tech:         'IT & Teknologi',
  healthcare:      'Kesehatan & Medis',
  education:       'Pendidikan',
  engineering:     'Teknik & Manufaktur',
  logistics:       'Logistik & Supply Chain',
  hospitality:     'Hospitality & F&B',
  creative:        'Kreatif & Desain',
  legal:           'Hukum & Pemerintahan',
  other:           'Lainnya',
};

export const DEGREE_LABELS: Record<DegreeLevel, string> = {
  sma_smk:  'SMA / SMK',
  d1_d2_d3: 'D1 / D2 / D3',
  s1:       'S1 (Sarjana)',
  s2:       'S2 (Magister)',
  s3:       'S3 (Doktor)',
};

export const LANGUAGE_LEVEL_LABELS: Record<LanguageLevel, string> = {
  basic:        'Dasar',
  intermediate: 'Menengah',
  proficient:   'Mahir',
  native:       'Native / Bahasa Ibu',
};

export const ACCENT_COLORS: { value: AccentColor; label: string }[] = [
  { value: '#2563EB', label: 'Biru' },
  { value: '#475569', label: 'Abu' },
  { value: '#16A34A', label: 'Hijau' },
  { value: '#DC2626', label: 'Merah' },
  { value: '#7C3AED', label: 'Ungu' },
];

export const MONTHS: { value: string; label: string }[] = [
  { value: '01', label: 'Januari' },
  { value: '02', label: 'Februari' },
  { value: '03', label: 'Maret' },
  { value: '04', label: 'April' },
  { value: '05', label: 'Mei' },
  { value: '06', label: 'Juni' },
  { value: '07', label: 'Juli' },
  { value: '08', label: 'Agustus' },
  { value: '09', label: 'September' },
  { value: '10', label: 'Oktober' },
  { value: '11', label: 'November' },
  { value: '12', label: 'Desember' },
];
