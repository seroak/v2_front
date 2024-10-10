// src/store/gptMutation.ts (또는 프로젝트의 store 디렉토리 경로에 맞게 조정)
import { create } from "zustand";

interface GptMutationState {
  isGptCorrectSuccess: boolean;
  isGptHintSuccess: boolean;
  reason: string;
  hint: string;
  hintLine: string;
  modifiedCode: Array<{ line: number; code: string }>;
  setGptCorrectSuccess: (value: boolean) => void;
  setGptHintSuccess: (value: boolean) => void;
  setReason: (reason: string) => void;
  setHint: (hint: string) => void;
  setHintLine: (line: string) => void;
  setModifiedCode: (code: Array<{ line: number; code: string }>) => void;
  resetState: () => void;
}

export const useGptMutationStore = create<GptMutationState>((set) => ({
  isGptCorrectSuccess: false,
  isGptHintSuccess: false,
  reason: "",
  hint: "",
  hintLine: "",
  modifiedCode: [],
  setGptCorrectSuccess: (value) => set({ isGptCorrectSuccess: value }),
  setGptHintSuccess: (value) => set({ isGptHintSuccess: value }),
  setReason: (reason) => set({ reason }),
  setHint: (hint) => set({ hint }),
  setHintLine: (line) => set({ hintLine: line }),
  setModifiedCode: (code) => set({ modifiedCode: code }),
  resetState: () =>
    set({
      isGptCorrectSuccess: false,
      isGptHintSuccess: false,
      reason: "",
      hint: "",
      hintLine: "",
      modifiedCode: [],
    }),
}));
