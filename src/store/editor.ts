import { create } from "zustand";
import { devtools } from "zustand/middleware";
interface EditorState {
  highlightLines: number[];
  setHighlightLines: (highlightLine: number[]) => void;
  errorLine: { lineNumber: number; message: string } | null;
  setErrorLine: (errorLine: { lineNumber: number; message: string } | null) => void;
  resetEditor: () => void;
  focus: boolean;
  setFocus: (focus: boolean) => void;
}
export const useEditorStore = create(
  devtools<EditorState>((set) => ({
    highlightLines: [],
    setHighlightLines: (highlightLines) => set({ highlightLines }),
    errorLine: null,
    setErrorLine: (errorLine) => set({ errorLine }),
    resetEditor: () => set({ errorLine: null }),
    focus: false,
    setFocus: (focus) => set({ focus }),
  }))
);
