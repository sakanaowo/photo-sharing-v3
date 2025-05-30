import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-hot-toast';

export const useCommentStore = create((set) => ({
    comment: "",
    setComment: (comment) => set({ comment }),
    sendComment: async (photoId, comment) => {
        try {
            await axiosInstance.post(`/comment/commentsOfPhoto/${photoId}`, { comment });
            set({ comment: "" });
            toast.success("Comment sent!");
        } catch (error) {
            console.error("Error sending comment:", error);
            toast.error("Failed to send comment");
        }
    }
}));