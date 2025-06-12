import { axiosInstance } from "./constant"

export const AUTH_API = {
    login: (credential) => {
        return axiosInstance.post('/api/auth/login', credential);
    },
    register: (userData) => {
        return axiosInstance.post('/api/auth/register', userData);
    },
    logout: () => {
        return axiosInstance.post('/api/auth/logout');
    },
    verify: (verifyCode) => {
        return axiosInstance.post('/api/auth/verify', verifyCode);
    }
}