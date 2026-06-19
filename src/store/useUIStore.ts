import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UIState, TemplateId, AccentColor } from '@/types/resume';

interface UIStore extends UIState {
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  setTemplate: (template: TemplateId) => void;
  setAccentColor: (color: AccentColor) => void;
  setIsGenerating: (value: boolean, field?: string) => void;
}

const initialUIState: UIState = {
  currentStep: 1,
  totalSteps: 7,
  selectedTemplate: 'clean',
  accentColor: '#2563EB',
  isGenerating: false,
  generatingField: undefined,
};

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      ...initialUIState,

      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, state.totalSteps),
        })),

      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 1),
        })),

      goToStep: (step) =>
        set(() => ({
          currentStep: step,
        })),

      setTemplate: (template) =>
        set(() => ({
          selectedTemplate: template,
        })),

      setAccentColor: (color) =>
        set(() => ({
          accentColor: color,
        })),

      setIsGenerating: (value, field) =>
        set(() => ({
          isGenerating: value,
          generatingField: field,
        })),
    }),
    {
      name: 'buatcv-ui-store',
      partialize: (state) => ({
        currentStep: state.currentStep,
        selectedTemplate: state.selectedTemplate,
        accentColor: state.accentColor,
      }),
    }
  )
);
