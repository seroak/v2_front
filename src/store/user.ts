import { create } from "zustand";
import { devtools } from "zustand/middleware";
interface UserState {
  LoggedInuserId: string;
  LoggedInuserPassword: string;
  setLoggedInUserId: (user: string) => void;
  setLoggedInUserPassword: (password: string) => void;
}
export const useUserStore = create(
  devtools<UserState>((set) => ({
    LoggedInuserId: "",
    LoggedInuserPassword: "",
    setLoggedInUserId: (LoggedInuserId) => set({ LoggedInuserId }),
    setLoggedInUserPassword: (LoggedInuserPassword) => set({ LoggedInuserPassword }),
  }))
);
