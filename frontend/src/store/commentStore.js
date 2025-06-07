import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-hot-toast';

export const useCommentStore = create((set) => ({
    comment: "",
    editedComment: null,
    setEditedComment: (comment) => set({ editedComment: comment }),
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
    },
    // updateComment: async (commentId, updatedText) => {
    //     try {
    //         const res = await axiosInstance.put(`/comment/${commentId}`, {
    //             comment: updatedText,
    //         });
    //         set((state) => ({
    //             comments: state.comments.map((c) =>
    //                 c._id === commentId ? res.data.comment : c
    //             ),
    //         }));
    //         toast.success("Comment updated");
    //     } catch (error) {
    //         console.error("Error updating comment:", error);
    //         toast.error("Failed to update comment");
    //     }
    // },
    deleteComment: async (commentId) => {
        try {
            const res = await axiosInstance.delete(`/comment/${commentId}`);
            console.log("Deleted comment:", res.data);
            toast.success("Comment deleted");
        } catch (error) {
            console.error("Error deleting comment:", error);
            toast.error("Failed to delete comment");
        }
    }
}));