import { create } from "zustand";

interface CodeType {
  code: string;
  setCode: (code: string) => void;
}

export const CodeStore = create<CodeType>((set) => ({
  code: ["a = 3", "for i in range(a):", "   print(' ' * ((a - 1) - i), end = '')", "   print('*' * (2 * i + 1))"].join(
    "\n"
  ),
  setCode: (code) => set({ code }),
}));
