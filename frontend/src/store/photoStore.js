import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-hot-toast';

export const photoStore = create((set, get) => ({
    photos: [],
    setPhotos: async (user) => {
        try {
            const res = await axiosInstance.get(`/photo/photoOfUser/${user._id}`);
            set({ photos: res.data });
            if (res.data.length === 0) {
                toast("No photos found for this user.");
            }
        } catch (error) {
            console.error("Error fetching photos:", error);
            toast.error("Failed to fetch photos. Please try again later.");
        }
    }
}));