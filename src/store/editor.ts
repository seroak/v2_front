import { create } from "zustand";
import { devtools } from "zustand/middleware";
interface EditorState {
  highlightLines: number[];
  setHighlightLines: (highlightLine: number[]) => void;
}
export const useEditorStore = create(
  devtools<EditorState>((set) => ({
    highlightLines: [],
    setHighlightLines: (highlightLines) => set({ highlightLines }),
  }))
);
