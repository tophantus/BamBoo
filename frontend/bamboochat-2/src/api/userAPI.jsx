import { axiosInstance } from "./constant"

export const USER_API = {
    getProfile: () => {
        return axiosInstance.get('/api/user/profile')
    },
    updateProfile: (userData) => {
        const formData = new FormData();

        const userInfo = JSON.stringify({
            firstName: userData?.firstName ?? null,
            lastName: userData?.lastName ?? null,
            phoneNumber: userData?.phoneNumber ?? null
        })

        formData.append("userinfo", new Blob(
            [userInfo],
            {type: "application/json"}
        ))
        if (userData?.image) {
            formData.append("image", userData.image);
        }

        return axiosInstance.put("/api/user/update-profile", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
    },
    getAllUser: () => {
        return axiosInstance.get('/api/user/get-all-user');
    },
    checkAuth: () => {
        return axiosInstance.get('/api/user/check-auth')
    }
}