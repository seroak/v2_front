import { create } from "zustand";
import { devtools } from "zustand/middleware";
interface MswReadyState {
  isMswReady: boolean;
  setIsMswReady: (isMswReady: boolean) => void;
}
export const useMswReadyStore = create(
  devtools<MswReadyState>((set) => ({
    isMswReady: false,
    setIsMswReady: (isMswReady) => set({ isMswReady }),
  }))
);
