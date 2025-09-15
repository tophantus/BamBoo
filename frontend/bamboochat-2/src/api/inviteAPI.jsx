import { axiosInstance } from "./constant"

export const INVITE_API = {
    inviteFriend: (invite) => {
        return axiosInstance.post('/api/rooms/private/invite', invite);
    },
    acceptInvite: (inviteId) => {
        return axiosInstance.post(`/api/rooms/private/invite/${inviteId}/accept`);
    },
    rejectInvite: (inviteId) => {
        return axiosInstance.post(`/api/rooms/private/invite/${inviteId}/reject`);
    },
    getAllPendingInvite: (userId) => {
        return axiosInstance.get(`/api/rooms/private/invite/${userId}`);
    },
    getAllSentInvite: (userId) => {
        return axiosInstance.get(`/api/rooms/private/invite/sent/${userId}`)
    }
}