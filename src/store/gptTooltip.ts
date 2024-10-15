import { create } from "zustand";
import { devtools } from "zustand/middleware";
interface GptTooltipState {
  isGptToggle: boolean;
  setIsGptToggle: (isGptToggle: boolean) => void;
  gptTop: number;
  setGptTop: (gptTop: number) => void;
  gptLeft: number;
  setGptLeft: (gptLeft: number) => void;
  gptPin: boolean;
  setGptPin: (gptPin: boolean) => void;
}
export const useGptTooltipStore = create(
  devtools<GptTooltipState>((set) => ({
    isGptToggle: false,
    setIsGptToggle: (isGptToggle) => set({ isGptToggle }),
    gptTop: 0, //gpt 툴팁 위쪽 위치
    setGptTop: (gptTop) => set({ gptTop }),
    gptLeft: 0, //gpt 툴팁 왼쪽 위치
    setGptLeft: (gptLeft) => set({ gptLeft }),
    gptPin: false,
    setGptPin: (gptPin) => set({ gptPin }),
  }))
);
