import { create } from "zustand";
import { devtools } from "zustand/middleware";
interface GptToggleState {
  isGptToggle: boolean;
  setIsGptToggle: (isGptToggle: boolean) => void;
}
export const useGptToggleStore = create(
  devtools<GptToggleState>((set) => ({
    isGptToggle: false,
    setIsGptToggle: (isGptToggle) => set({ isGptToggle }),
  }))
);
