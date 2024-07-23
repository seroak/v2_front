import { create } from "zustand";

interface ConsoleState {
  console: string[];
  consoleIdx: number;
  setConsole: (console: string[]) => void;
  setConsoleIdx: (consoleIdx: number) => void;
  reset: () => void;
}

export const useConsoleStore = create<ConsoleState>((set) => ({
  console: [],
  consoleIdx: 0,
  setConsole: (console) => set({ console }),
  setConsoleIdx: (consoleIdx) => set({ consoleIdx }),
  reset: () => set({ console: [] }),
}));
