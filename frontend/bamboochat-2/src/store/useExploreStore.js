import { create } from "zustand";
import { USER_API } from "../api/userAPI";
import toast from "react-hot-toast";
import { INVITE_API } from "../api/inviteAPI";
import { useAuthStore } from "./useAuthStore";
import { useChatStore } from "./useChatStore";
import { acceptInvite, rejectInvite, sendInvite } from "../socket/socket";

export const useExploreStore = create((set, get) => ({
    users: [],
    selectedUser: null,
    pendingInvites: [],
    selectedInvite: null,
    isUsersLoading: false,
    isInviteLoading: false,
    setSelectedUser: (selectedUser) => set({ selectedUser }),
    setSelectedInvite: (selectedInvite) => set({ selectedInvite }),
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
    onInviteChange: (invite) => {
        const {pendingInvites} = get();
        const {getAllRooms} = useChatStore.getState();
        const {authUser} = useAuthStore.getState();

        if (invite.status === 'PENDING') {
            set({pendingInvites: [...pendingInvites, invite]});
        } else if (invite.status === 'REJECTED') {
            const filteredInvite = pendingInvites.filter((i) => 
                i.id != invite.id
            )
            set({pendingInvites: filteredInvite});
        } else if (invite.status === "ACCEPTED") {
            const filteredInvite = pendingInvites.filter((i) => 
                i.id != invite.id
            )
            set({pendingInvites: filteredInvite});
            getAllRooms(authUser.id);
        }
    },
    getAllPendingInvites: async (userId) => {
        set({isInviteLoading : true});
        try {
            const res = await INVITE_API.getAllPendingInvite(userId);
            set({pendingInvites : res.data})
        } catch(error) {
            toast.error(error?.response?.data?.message);
            
        } finally {
            set({isInviteLoading: false});
        }
    },
    sendInvite: (invite) => {
        set({isInviteLoading: true})
        try {
            sendInvite(invite)
            toast.success("Gửi lời mời thành công");
        } catch(error) {
            console.log("error", error.message)
            toast.error(error?.response?.data?.message)
        } finally {
            set({isInviteLoading: false})
        }
    },
    rejectInvite: (request) => {
        set({isInviteLoading : true});
        try {
            rejectInvite(request)
            toast.success("Đã từ chối lời mời");
        } catch(error) {
            toast.error(error?.response?.data?.message);
            
        } finally {
            set({isInviteLoading: false});
        }
    },
    acceptInvite: (request) => {
        set({isInviteLoading : true});
        try {
            acceptInvite(request)
            toast.success("Đã chấp nhận lời mời")
        } catch(error) {
            toast.error(error?.response?.data?.message);
        } finally {
            set({isInviteLoading: false});
        }
    },
}))