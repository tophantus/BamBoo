import { create } from "zustand";
import { USER_API } from "../api/userAPI";
import toast from "react-hot-toast";
import { CHAT_API } from "../api/chatAPi";
import { useAuthStore } from "./useAuthStore";
import { sendGroupMessage, sendPrivateMessage } from "../socket/socket";
import { ROOM_API } from "../api/roomAPI";

export const useChatStore = create((set, get) => ({
    messages: [],
    pendingMessages: [],
    users: [],
    rooms: [],
    selectedUser: null,
    selectedRoom: null,
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
    getAllRooms: async (userId) => {
        set({isUsersLoading : true});
        try {
            const res = await ROOM_API.getAllRoom(userId);
            set({rooms : res?.data})
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
    getRoomMessages: async (roomId) => {
        set({isMessagesLoading: true})
        try {
            const res = await ROOM_API.getRoomMessages(roomId);
            set({messages: res?.data});
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            set({isMessagesLoading: false});
        }
    },
    addMessage: (message) => {
        const {selectedRoom, messages, pendingMessages} = get();
        if (message.roomId === selectedRoom.id) {
            set({ messages: [...messages, message] });
        } else {
            set({ pendingMessages: [...pendingMessages, message] });
        }
    },
    removePendingMessage: (roomId) => {
        const {pendingMessages} = get();
        const filteredMessages = pendingMessages.filter((message) => 
            message.roomId !== roomId
        )
        set({pendingMessages : filteredMessages});
    },
    sendMessage: (messageData) => {
  //      const {selectedUser, messages} = get();
        const {selectedRoom, message} = get();
        const { authUser } = useAuthStore.getState();
        const recipientId = selectedRoom?.members?.find((m) => 
            m?.user?.id !== authUser.id
        )?.user?.id
        
        if (!authUser || !selectedRoom) {
            toast.error("Thiếu người gửi hoặc người nhận");
            return;
        }
        const newMessage = selectedRoom?.privateChat 
            ?   {
                    senderId: authUser.id,
                    recipientId: recipientId,
                    roomId: selectedRoom?.id,
                    text: messageData.text,
                    image: messageData.image
                }
            :   {
                    senderId: authUser?.id,
                    roomId: selectedRoom?.id,
                    text: messageData.text,
                    image: messageData.image
                }
        try {
            selectedRoom?.privateChat
                ? sendPrivateMessage(newMessage)
                : sendGroupMessage(newMessage);
        } catch (error) {
            console.error("Gửi tin nhắn thất bại:", error);
            toast.error("Gửi tin nhắn thất bại");
        }
    },
    setSelectedUser: (selectedUser) => set({ selectedUser }),
    setSelectedRoom: (selectedRoom) => {
        const { removePendingMessage } = get();
        set({ selectedRoom })
        if (selectedRoom?.id) {
            removePendingMessage(selectedRoom.id);
        }
    },
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


