import { create } from "zustand";
// zustand 버그 있음 고칠것
interface ConsoleState {
  console: string;
  setConsole: (console: string) => void;
  reset: () => void;
}
export const useConsoleStore = create<ConsoleState>((set) => ({
  console: "",
  setConsole(console) {
    set({ console });
  },
  reset() {
    set({ console: "" });
  },
}));
