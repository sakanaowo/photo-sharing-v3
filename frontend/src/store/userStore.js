import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const userStore = create((set, get) => ({
    users: [],
    selectedUser: null,
    getUsers: async () => {
        try {
            const response = await axiosInstance.get("/user/list");
            set({ users: response.data });
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    },
    setSelectedUser: (user) => set({ selectedUser: user }),
}));