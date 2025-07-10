import { create } from "zustand";
import type { AccountStore } from "./types";

export const useAccountStore = create<AccountStore>((set) => ({
  account: null,
  setAccount: (account) => set({ account }),
}));
