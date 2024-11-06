import { create } from "zustand";
import { devtools } from "zustand/middleware";
interface AccessRightState {
  userEmail: string;
  userName: string;
  userRole: string;
  setUserEmail: (user: string) => void;
  setUserName: (username: string) => void;
  setUserRole: (role: string) => void;
  resetUser: () => void;
}
export const useAccessRightStore = create(
  devtools<AccessRightState>((set) => ({
    userEmail: "",
    userName: "",
    userRole: "",
    setUserEmail: (userEmail) => set({ userEmail }),
    setUserName: (userName) => set({ userName }),
    setUserRole: (userRole) => set({ userRole }),
    resetUser: () => set({ userEmail: "", userName: "", userRole: "" }),
  }))
);
