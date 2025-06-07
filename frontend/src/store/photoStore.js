import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-hot-toast';

export const photoStore = create((set, get) => ({
    photos: [],
    uploadFile: null,
    previewURL: null,
    setPhotos: async (user) => {
        try {
            const res = await axiosInstance.get(`/photo/photoOfUser/${user._id}`);
            set({ photos: res.data });
            if (res.data.length === 0) {
                toast("This user has no photos yet.");
            }
        } catch (error) {
            console.error("Error fetching photos:", error);
            toast.error("Failed to fetch photos. Please try again later.");
        }
    },
    setUploadFile: (file) => {
        if (!file || !file.type.startsWith("image/")) {
            toast.error("Please select a valid image file.");
            return;
        }

        set({ uploadFile: file, previewURL: URL.createObjectURL(file) });
        toast.success("Image loaded!");
    },
    // resetUpload: () => {
    //     set({ uploadFile: null, previewURL: null });
    //     toast("Upload reset.");
    // },
    uploadPhoto: async () => {
        const file = get().uploadFile;
        if (!file)
            return toast.error("Please select an image to upload.");
        const formData = new FormData();
        formData.append("photo", file);
        try {
            await axiosInstance.post("/photo/new", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Photo uploaded successfully!");
            set({ uploadFile: null, previewURL: null });
        } catch (error) {
            console.error("Error uploading photo:", error);
            toast.error("Failed to upload photo. Please try again later.");
        }
    },
    deletePhoto: async (photoId) => {
        try {
            await axiosInstance.delete(`/photo/${photoId}`);
            set((state) => ({
                photos: state.photos.filter((photo) => photo._id !== photoId),
            }));
            toast.success("Photo deleted successfully!");
        } catch (error) {
            console.error("Error deleting photo:", error);
            toast.error("Failed to delete photo. Please try again later.");
        }
    },
}));