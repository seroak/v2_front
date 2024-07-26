import { create } from "zustand";
import { devtools } from "zustand/middleware";
interface UserState {
  loggedInUserId: string;
  loggedInUserPassword: string;
  setLoggedInUserId: (user: string) => void;
  setLoggedInUserPassword: (password: string) => void;
}
export const useUserStore = create(
  devtools<UserState>((set) => ({
    loggedInUserId: "",
    loggedInUserPassword: "",
    setLoggedInUserId: (loggedInUserId) => set({ loggedInUserId }),
    setLoggedInUserPassword: (loggedInUserPassword) => set({ loggedInUserPassword }),
  }))
);
