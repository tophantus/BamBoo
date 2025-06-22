import { create } from "zustand";

export const useExploreStore = create((set, get) => ({
    selectedUser: null,
    setSelectedUser: (selectedUser) => set({ selectedUser }),
}))