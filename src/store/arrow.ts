import { create } from "zustand";
import { devtools } from "zustand/middleware";
interface ArrowState {
  top: number;
  right: number;
  displayNone: boolean;
  setTop: (top: number) => void;
  setRight: (right: number) => void;
  setDisplayNone: (displayNone: boolean) => void;
}
export const useArrowStore = create(
  devtools<ArrowState>((set) => ({
    top: 500,
    right: 2000,
    displayNone: true,
    setTop: (top) => set({ top }),
    setRight: (right) => set({ right }),
    setDisplayNone: (displayNone) => set({ displayNone }),
  }))
);
