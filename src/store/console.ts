import { create } from "zustand";

interface ConsoleState {
  consoleList: string[];
  stepIdx: number;
  inputData: string;
  setConsole: (console: string[]) => void;
  setStepIdx: (stepIdx: number) => void;
  setInputData: (inputData: string) => void;
  incrementStepIdx: () => void;
  decrementStepIdx: () => void;
  resetConsole: () => void;
  resetInputData: () => void;
}
interface CodeFlowLengthState {
  codeFlowLength: number;
  setCodeFlowLength: (codeFlowLength: number) => void;
}

export const useConsoleStore = create<ConsoleState>((set) => ({
  consoleList: [],
  stepIdx: 0,
  inputData: "",
  setConsole: (consoleList) => set({ consoleList }),
  setStepIdx: (stepIdx) => set({ stepIdx }),
  setInputData: (inputData) => set({ inputData }),
  incrementStepIdx: () => set((state) => ({ stepIdx: state.stepIdx + 1 })),
  decrementStepIdx: () => set((state) => ({ stepIdx: state.stepIdx - 1 })),
  resetConsole: () => set({ consoleList: [], stepIdx: 0 }),
  resetInputData: () => set({ inputData: "" }),
}));

export const useCodeFlowLengthStore = create<CodeFlowLengthState>((set) => ({
  codeFlowLength: 0,
  setCodeFlowLength: (codeFlowLength) => set({ codeFlowLength }),
}));
