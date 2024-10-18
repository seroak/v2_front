import { create } from "zustand";
import { devtools } from "zustand/middleware";
interface ResetEditorState {
  resetTrigger: boolean;
  setResetTrigger: (resetTrigger: boolean) => void;
}
export const useResetEditor = create(
  devtools<ResetEditorState>((set) => ({
    resetTrigger: false,
    setResetTrigger: (resetTrigger) => set({ resetTrigger }),
  }))
);
