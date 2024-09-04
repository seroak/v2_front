import { create } from "zustand";
import { devtools } from "zustand/middleware";
interface UserState {
  loggedInUserId: string;
  loggedInUserName: string;
  setLoggedInUserId: (user: string) => void;
  setLoggedInUserName: (username: string) => void;
  resetUser: () => void;
}
export const useUserStore = create(
  devtools<UserState>((set) => ({
    loggedInUserId: "",
    loggedInUserName: "",
    setLoggedInUserId: (loggedInUserId) => set({ loggedInUserId }),
    setLoggedInUserName: (loggedInUserName) => set({ loggedInUserName }),
    resetUser: () => set({ loggedInUserId: "", loggedInUserName: "" }),
  }))
);
