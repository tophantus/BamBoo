import { axiosInstance } from "./constant"

export const CHAT_API = {
    getMessages: (userId) => {
        return axiosInstance.get(`/api/messages/${userId}`);
    },
    sendMessage: (userId, messageData) => {
        const formData = new FormData();


        if (messageData?.text) {
            formData.append("text", messageData.text);
        }


        if (messageData?.image) {
            formData.append("image", messageData.image);
        }
        return axiosInstance.post(`/api/messages/send/${userId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
    },
    uploadImage: (image) => {
        const formData = new FormData();
        if (!image) return;
        formData.append("image", image);

        return axiosInstance.post(`/api/messages/upload-image`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
    }
}