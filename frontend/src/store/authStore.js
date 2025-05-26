import { axiosInstance } from "../lib/axios";
import { create } from "zustand";
import { toast } from "react-hot-toast";

export const authStore = create((set, get) => ({
    authUser: null,
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
        } catch (error) {
            console.error("Error checking authentication:", error);
            set({ authUser: null });
            toast.error("Authentication check failed. Please log in again.");
        }
    },
    login: async (data) => {
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Login successful!");
        } catch (error) {
            toast.error("Login failed. Please check your credentials.");
            console.error("Error during login:", error);
        }
    },
    register: async (data) => {
        try {
            const res = await axiosInstance.post("/auth/register", data);
            set({ authUser: res.data });
            toast.success("Registration successful!");
        } catch (error) {
            console.error("Error during registration:", error);
            toast.error("Registration failed. Please try again.");
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logout successful!");
        } catch (error) {
            console.error("Error during logout:", error);
            toast.error("Logout failed. Please try again.");
        }
    }
}));