import { create } from "zustand";
import { devtools } from "zustand/middleware";
interface ErrorLine {
  lineNumber: number;
  message: string;
}
interface EditorState {
  highlightLines: number[];
  setHighlightLines: (highlightLine: number[]) => void;
  errorLine: ErrorLine | null;
  setErrorLine: (errorLine: ErrorLine | null) => void;
  resetErrorLine: () => void;
  focus: boolean;
  setFocus: (focus: boolean) => void;
}
export const useEditorStore = create(
  devtools<EditorState>((set) => ({
    highlightLines: [],
    setHighlightLines: (highlightLines) => set({ highlightLines }),
    errorLine: null,
    setErrorLine: (errorLine) => set({ errorLine }),
    resetErrorLine: () => set({ errorLine: null }),
    focus: false,
    setFocus: (focus) => set({ focus }),
  }))
);
