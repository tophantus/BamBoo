import { axiosInstance } from "./constant"

export const ROOM_API = {
    getAllRoom: (userId) => {
        return axiosInstance.get(`/api/rooms/user/${userId}`);
    },
    getRoomMessages: (roomId) => {
        return axiosInstance.get(`/api/rooms/${roomId}/messages`);
    },
}


