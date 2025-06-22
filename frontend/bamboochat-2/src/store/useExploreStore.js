import { create } from "zustand";
import { USER_API } from "../api/userAPI";
import toast from "react-hot-toast";

export const useExploreStore = create((set, get) => ({
    users: [],
    selectedUser: null,
    setSelectedUser: (selectedUser) => set({ selectedUser }),
    getUsers: async () => {
        set({isUsersLoading : true});
        try {
            const res = await USER_API.getAllUser();
            set({users : res.data})
        } catch(error) {
            toast.error(error?.response?.data?.message);
            
        } finally {
            set({isUsersLoading: false});
        }
    },
}))