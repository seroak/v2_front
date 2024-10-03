import { create } from "zustand";

interface TimeoutStore {
  timeoutId: number | null;
  setTimeoutId: (id: number | null) => void;
  clearCurrentTimeout: () => void;
}
export const useTimeoutStore = create<TimeoutStore>((set) => ({
  timeoutId: null,
  setTimeoutId: (id) => set({ timeoutId: id }),
  clearCurrentTimeout: () => {
    set((state) => {
      if (state.timeoutId !== null) {
        clearTimeout(state.timeoutId);
      }
      return { timeoutId: null };
    });
  },
}));
