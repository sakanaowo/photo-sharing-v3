
const Comment = require('../db/commentModel');
const Photo = require('../db/photoModel');

const postComment = async (req, res) => {
    const { photo_id } = req.params;
    const { comment } = req.body;
    const userId = req.userId;

    if (!comment || !userId) {
        return res.status(400).json({ message: "Missing comment or user ID" });
    }

    try {
        const photo = await Photo.findById(photo_id);
        console.log("Found photo:", photo);
        if (!photo) {
            return res.status(404).json({ message: "Photo not found" });
        }

        const newComment = new Comment({
            comment: comment.trim(),
            user_id: userId,
            date_time: new Date(),
            photo_id: photo._id,
        });

        await newComment.save();

        res.status(201).json({ message: "Comment posted successfully" });
    } catch (error) {
        console.error("Error posting comment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateComment = async (req, res) => {
    try {
        const { comment } = req.body;
        const updated = await Comment.findByIdAndUpdate(
            req.params.id,
            { comment, date_time: new Date() },
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Comment not found" });

        res.status(200).json({ comment: updated });
    } catch (err) {
        res.status(500).json({ message: "Failed to update comment" });
    }
};
const deleteComment = async (req, res) => {
    console.log("Deleting comment with ID:", req.params.id);
    try {
        const deleted = await Comment.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Comment not found" });
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete comment" });
    }
}
module.exports = { postComment, updateComment, deleteComment };