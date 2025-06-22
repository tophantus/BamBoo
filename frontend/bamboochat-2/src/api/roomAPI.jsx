import { axiosInstance } from "./constant"

export const ROOM_API = {
    getAllRoom: (userId) => {
        return axiosInstance.get(`/api/room/user/${userId}`);
    },
    getRoomMessages: (roomId) => {
        return axiosInstance.get(`/api/room/${roomId}/messages`);
    },
}


