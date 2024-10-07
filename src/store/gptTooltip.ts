import { create } from "zustand";
import { devtools } from "zustand/middleware";
interface GptTooltipState {
  isGptToggle: boolean;
  setIsGptToggle: (isGptToggle: boolean) => void;
  gptTop: number;
  setGptTop: (gptTop: number) => void;
  gptLeft: number;
  setGptLeft: (gptLeft: number) => void;
}
export const useGptTooltipStore = create(
  devtools<GptTooltipState>((set) => ({
    isGptToggle: false,
    setIsGptToggle: (isGptToggle) => set({ isGptToggle }),
    gptTop: 0,
    setGptTop: (gptTop) => set({ gptTop }),
    gptLeft: 0,
    setGptLeft: (gptLeft) => set({ gptLeft }),
  }))
);
