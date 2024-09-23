import { create } from "zustand";
import { devtools } from "zustand/middleware";
interface EditorState {
  highlightLines: number[];
  setHighlightLines: (highlightLine: number[]) => void;
  errorLine: { lineNumber: number; message: string } | null;
  setErrorLine: (errorLine: { lineNumber: number; message: string } | null) => void;
}
export const useEditorStore = create(
  devtools<EditorState>((set) => ({
    highlightLines: [],
    setHighlightLines: (highlightLines) => set({ highlightLines }),
    errorLine: null,
    setErrorLine: (errorLine) => set({ errorLine }),
  }))
);
