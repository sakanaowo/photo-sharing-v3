import User from "../db/userModel.js";
import mongoose from "mongoose";
import Photo from "../db/photoModel.js";

export const getUserPhotos = async (req, res) => {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
        const photos = await Photo.find({ user_id: userId })
            .select("_id user_id file_name date_time comments").lean();
        if (!photos) {
            return res.status(404).json({ message: "No photos found for this user" });
        }
        // handle comment
        for (const photo of photos) {
            const commentWithUser = []
            for (const comment of photo.comments) {
                const user = await User.findById(comment.user_id, "_id first_name last_name").lean();
                if (user) {
                    commentWithUser.push({
                        _id: comment._id,
                        comment: comment.comment,
                        date_time: comment.date_time,
                        user: user,
                    });
                }
            }
            photo.comments = commentWithUser;
        }
        res.status(200).json(photos);
    }

    catch (error) {
        console.error("Error fetching user photos:", error);
        return res.status(500).json({ message: error.message });
    }
};