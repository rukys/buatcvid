import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ResumeData, WorkExperience, Education, Language, Industry, SummaryTone, OutputLanguage } from '@/types/resume';

interface ResumeStore extends ResumeData {
  // Setters
  setIndustry: (industry: ResumeData['industry']) => void;
  setTargetPosition: (position: string) => void;
  setPersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  setIsFreshGrad: (value: boolean) => void;

  // Experience CRUD
  addExperience: (exp: WorkExperience) => void;
  updateExperience: (id: string, updates: Partial<WorkExperience>) => void;
  removeExperience: (id: string) => void;
  reorderExperiences: (from: number, to: number) => void;

  // Education CRUD
  addEducation: (edu: Education) => void;
  updateEducation: (id: string, updates: Partial<Education>) => void;
  removeEducation: (id: string) => void;

  // Skills & Languages
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  addLanguage: (lang: Language) => void;
  updateLanguage: (id: string, updates: Partial<Language>) => void;
  removeLanguage: (id: string) => void;

  // Summary
  setSummary: (summary: string) => void;
  setSummaryTone: (tone: ResumeData['summaryTone']) => void;
  setOutputLanguage: (lang: ResumeData['outputLanguage']) => void;

  // Reset
  resetResume: () => void;
}

const initialResumeData: ResumeData = {
  industry: null,
  targetPosition: '',
  personalInfo: {
    fullName: '',
    targetPosition: '',
    email: '',
    phone: '',
    city: '',
    linkedIn: '',
    portfolio: '',
    photoUrl: '',
  },
  experiences: [],
  isFreshGrad: false,
  educations: [],
  skills: [],
  languages: [],
  summary: '',
  summaryTone: 'formal',
  outputLanguage: 'id',
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      ...initialResumeData,

      setIndustry: (industry) => set({ industry }),
      setTargetPosition: (position) => set({ targetPosition: position }),
      setPersonalInfo: (info) =>
        set((state) => ({
          personalInfo: { ...state.personalInfo, ...info },
        })),
      setIsFreshGrad: (value) => set({ isFreshGrad: value }),

      addExperience: (exp) =>
        set((state) => ({
          experiences: [...state.experiences, exp],
        })),
      updateExperience: (id, updates) =>
        set((state) => ({
          experiences: state.experiences.map((exp) =>
            exp.id === id ? { ...exp, ...updates } : exp
          ),
        })),
      removeExperience: (id) =>
        set((state) => ({
          experiences: state.experiences.filter((exp) => exp.id !== id),
        })),
      reorderExperiences: (from, to) =>
        set((state) => {
          const newExp = [...state.experiences];
          const [moved] = newExp.splice(from, 1);
          newExp.splice(to, 0, moved);
          return { experiences: newExp };
        }),

      addEducation: (edu) =>
        set((state) => ({
          educations: [...state.educations, edu],
        })),
      updateEducation: (id, updates) =>
        set((state) => ({
          educations: state.educations.map((edu) =>
            edu.id === id ? { ...edu, ...updates } : edu
          ),
        })),
      removeEducation: (id) =>
        set((state) => ({
          educations: state.educations.filter((edu) => edu.id !== id),
        })),

      addSkill: (skill) =>
        set((state) => ({
          skills: state.skills.includes(skill)
            ? state.skills
            : [...state.skills, skill],
        })),
      removeSkill: (skill) =>
        set((state) => ({
          skills: state.skills.filter((s) => s !== skill),
        })),

      addLanguage: (lang) =>
        set((state) => ({
          languages: [...state.languages, lang],
        })),
      updateLanguage: (id, updates) =>
        set((state) => ({
          languages: state.languages.map((l) =>
            l.id === id ? { ...l, ...updates } : l
          ),
        })),
      removeLanguage: (id) =>
        set((state) => ({
          languages: state.languages.filter((l) => l.id !== id),
        })),

      setSummary: (summary) => set({ summary }),
      setSummaryTone: (tone) => set({ summaryTone: tone }),
      setOutputLanguage: (lang) => set({ outputLanguage: lang }),

      resetResume: () => set({ ...initialResumeData }),
    }),
    {
      name: 'buatcv-resume-store',
    }
  )
);
