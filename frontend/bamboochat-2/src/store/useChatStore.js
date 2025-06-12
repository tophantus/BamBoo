import { create } from "zustand";
import { USER_API } from "../api/userAPI";
import toast from "react-hot-toast";
import { CHAT_API } from "../api/chatAPi";
import { useAuthStore } from "./useAuthStore";
import { sendPrivateMessage } from "../socket/socket";


export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    privateMessageSubscription: null,
    
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
    getMessages: async (userId) => {
        set({isMessagesLoading: true});
        try {
            const res = await CHAT_API.getMessages(userId);
            set({messages: res?.data})
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            set({isMessagesLoading: false});
        }
    },
    addMessage: (message) => set((state) => ({
        messages: [...state.messages, message],
    })),
    sendMessage: (messageData) => {
        const {selectedUser, messages} = get();
        const { authUser } = useAuthStore.getState();
        
        if (!authUser || !selectedUser) {
            toast.error("Thiếu người gửi hoặc người nhận");
            return;
        }
        const newMessage = {
            senderId: authUser.id,
            recipientId: selectedUser.id,
            text: messageData.text,
            image: messageData.image
        }
        try {
            sendPrivateMessage(newMessage);
        } catch (error) {
            console.error("Gửi tin nhắn thất bại:", error);
            toast.error("Gửi tin nhắn thất bại");
        }
    },
    setSelectedUser: (selectedUser) => set({ selectedUser }),
    removeInfo: () => {
        set({
            messages: [],
            users: [],
            selectedUser: null,
            isUsersLoading: false,
            isMessagesLoading: false,
        })
    },
}))


