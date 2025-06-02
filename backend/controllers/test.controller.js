const Comment = require("../db/commentModel.js");
const Photo = require("../db/photoModel.js");

const migrateComments = async (req, res) => {
    try {
        const photos = await Photo.find({});
        let migratedCount = 0;

        for (const photo of photos) {
            if (Array.isArray(photo.comments) && photo.comments.length > 0) {
                for (const oldCmt of photo.comments) {
                    const newComment = new Comment({
                        comment: oldCmt.comment,
                        date_time: oldCmt.date_time || new Date(),
                        user_id: oldCmt.user_id,
                        photo_id: photo._id,
                    });
                    await newComment.save();
                    migratedCount++;
                }
                console.log(`Migrating comments for photo ID: ${photo._id}, migrated ${photo.comments.length} comments.`);

                // Xóa trường comments khỏi document
                photo.set("comments", undefined); // hoặc: delete photo.comments;
                await photo.save();
            }
            await Photo.updateMany(
                { comments: { $exists: true, $size: 0 } },
                { $unset: { comments: "" } }
            );

        }

        return res.status(200).json({
            message: `Migration successful! Migrated ${migratedCount} comments.`,
        });
    } catch (error) {
        console.error("Error migrating comments:", error);
        return res.status(500).json({ message: "Migration failed", error: error.message });
    }
};


module.exports = { migrateComments };
