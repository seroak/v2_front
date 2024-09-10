import { create } from "zustand";
import { devtools } from "zustand/middleware";
interface UserState {
  loggedInUserEmail: string;
  loggedInUserName: string;
  loggedInUserRole: string;
  setLoggedInUserEmail: (user: string) => void;
  setLoggedInUserName: (username: string) => void;
  setLoggedInUserRole: (role: string) => void;
  resetUser: () => void;
}
export const useUserStore = create(
  devtools<UserState>((set) => ({
    loggedInUserEmail: "",
    loggedInUserName: "",
    loggedInUserRole: "",
    setLoggedInUserEmail: (loggedInUserEmail) => set({ loggedInUserEmail }),
    setLoggedInUserName: (loggedInUserName) => set({ loggedInUserName }),
    setLoggedInUserRole: (loggedInUserRole) => set({ loggedInUserRole }),
    resetUser: () => set({ loggedInUserEmail: "", loggedInUserName: "", loggedInUserRole: "" }),
  }))
);
