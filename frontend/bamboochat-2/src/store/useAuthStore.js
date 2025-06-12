import { create } from "zustand";
import { AUTH_API } from "../api/authAPI";
import toast from "react-hot-toast";
import { USER_API } from "../api/userAPI";
import { API_BASE_URL, WEBSOCKET_URL } from "../api/constant";
import SockJS from "sockjs-client";
import { Client, CompatClient } from "@stomp/stompjs";

const SOCKET_URL = API_BASE_URL + "/api/ws";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isVerifying: false,
    isUpdatingProfile: false,
    isCheckingAuth: false,
    onlineUsers: [],
    setOnlineUsers: (users) => set({ onlineUsers: users }),
    checkAuth: async () => {
        set({isCheckingAuth: true});
        try {
            const res = await USER_API.checkAuth();
            set({authUser: res?.data});
        } catch {
            set({ authUser: null });
        } finally {
            set({isCheckingAuth: false});
        }
    },

    login: async (data) => {
        set({isLoggingIn: true});
        try {
            const res = await AUTH_API.login(data);
            set({authUser: res?.data});
            toast.success("Logged in successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            set({isLoggingIn: false});
        }
    },

    signup: async (data) => {
        set({isSigningUp: true});
        try {
            const res = await AUTH_API.register(data);
            toast.success("Account created successfully")
            return true;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
            return false;
        } finally {
            set({ isSigningUp: false });
        }
    },
    verify: async (data) => {
        set({isVerifying: true});
        try {
            const res = await AUTH_API.verify(data);
            toast.success("Account verified successfully")
            return true;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
            return false;
        } finally {
            set({ isVerifying: false });
        }
    },
    logout: async () => {
        try {
            await AUTH_API.logout();
            set({ authUser: null, hasConnectedOnce: false });
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    },
    updateProfile: async (data) => {
        console.log(data.image)
        set({isUpdatingProfile: true});
        try {
            const res = await USER_API.updateProfile(data);
            set({authUser: res.data})
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("error in update profile:", error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },
    
}));