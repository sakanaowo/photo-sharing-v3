
const Photo = require('../db/photoModel');

const postComment = async (req, res) => {
    const { photo_id } = req.params;
    const { comment } = req.body;
    const userId = req.userId;


    console.log("Posting comment:", { photo_id, comment, userId });

    if (!comment || !userId) {
        return res.status(400).json({ message: "Missing comment or user ID" });
    }

    try {
        const photo = await Photo.findById(photo_id);
        console.log("Found photo:", photo);
        if (!photo) {
            return res.status(404).json({ message: "Photo not found" });
        }

        photo.comments.push({
            comment: comment.trim(),
            user_id: userId,
            date_time: new Date(),
        });

        await photo.save();

        res.status(201).json({ message: "Comment posted successfully" });
    } catch (error) {
        console.error("Error posting comment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = { postComment };