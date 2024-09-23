import { create } from "zustand";

interface ConsoleState {
  console: string[];
  stepIdx: number;
  setConsole: (console: string[]) => void;
  setStepIdx: (stepIdx: number) => void;
  incrementStepIdx: () => void;
  decrementStepIdx: () => void;
  resetConsole: () => void;
}
interface CodeFlowLengthState {
  codeFlowLength: number;
  setCodeFlowLength: (codeFlowLength: number) => void;
}

export const useConsoleStore = create<ConsoleState>((set) => ({
  console: [],
  stepIdx: 0,
  setConsole: (console) => set({ console }),
  setStepIdx: (stepIdx) => set({ stepIdx }),
  incrementStepIdx: () => set((state) => ({ stepIdx: state.stepIdx + 1 })),
  decrementStepIdx: () => set((state) => ({ stepIdx: state.stepIdx - 1 })),
  resetConsole: () => set({ console: [], stepIdx: 0 }),
}));

export const useCodeFlowLengthStore = create<CodeFlowLengthState>((set) => ({
  codeFlowLength: 0,
  setCodeFlowLength: (codeFlowLength) => set({ codeFlowLength }),
}));
