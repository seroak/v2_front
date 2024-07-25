import { create } from "zustand";
import { devtools } from "zustand/middleware";
interface UserState {
  LogedInuserId: string;
  LogedInuserPassword: string;
  setLogedInUserId: (user: string) => void;
  setLogedInUserPassword: (password: string) => void;
}
export const useUserStore = create(
  devtools<UserState>((set) => ({
    LogedInuserId: "",
    LogedInuserPassword: "",
    setLogedInUserId: (LogedInuserId) => set({ LogedInuserId }),
    setLogedInUserPassword: (LogedInuserPassword) => set({ LogedInuserPassword }),
  }))
);
