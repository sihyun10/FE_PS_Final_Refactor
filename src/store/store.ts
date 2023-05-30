import { create } from 'zustand';

interface StspState {
  step: number;
  setStep: (num: number) => void;
}
// step 1은 등기부 업로드, step 2는 심사 내역 확인, step 0은 그 외
export const useStepStore = create<StspState>((set) => ({
  step: 0,
  setStep: (num) => {
    set({ step: num });
  },
}));
