import { create } from "zustand";

interface ConsoleState {
  console: string[];
  consoleIdx: number;
  setConsole: (console: string[]) => void;
  setConsoleIdx: (consoleIdx: number) => void;
  incrementConsoleIdx: () => void;
  reset: () => void;
}
interface CodeFlowLengthState {
  codeFlowLength: number;
  setCodeFlowLength: (codeFlowLength: number) => void;
}

export const useConsoleStore = create<ConsoleState>((set) => ({
  console: [],
  consoleIdx: 0,
  setConsole: (console) => set({ console }),
  setConsoleIdx: (consoleIdx) => set({ consoleIdx }),
  incrementConsoleIdx: () => set((state) => ({ consoleIdx: state.consoleIdx + 1 })),
  reset: () => set({ console: [] }),
}));

export const useCodeFlowLengthStore = create<CodeFlowLengthState>((set) => ({
  codeFlowLength: 0,
  setCodeFlowLength: (codeFlowLength) => set({ codeFlowLength }),
}));
