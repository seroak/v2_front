import { create } from "zustand";
import { devtools } from "zustand/middleware";
interface AccessRightState {
  isHost: boolean;
  setIsHost: (isHost: boolean) => void;
}
export const useAccessRightStore = create(
  devtools<AccessRightState>((set) => ({
    isHost: false,
    setIsHost: (isHost) => set({ isHost }),
  }))
);
