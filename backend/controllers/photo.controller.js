// import User from "../db/userModel.js";
// import mongoose from "mongoose";
// import Photo from "../db/photoModel.js";

const User = require("../db/userModel.js");
const mongoose = require("mongoose");
const Photo = require("../db/photoModel.js");

const getUserPhotos = async (req, res) => {
  const userId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const photos = await Photo.find({ user_id: new mongoose.Types.ObjectId(userId) })
      .select("_id user_id file_name date_time comments")
      .lean();

    for (const photo of photos) {
      const commentWithUser = [];
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
  } catch (error) {
    console.error("Error fetching user photos:", error);
    res.status(500).json({ message: error.message });
  }
};

const uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const userId = req.userId;
    const newPhoto = new Photo({
      file_name: req.file.filename,
      user_id: userId,
      date_time: new Date(),
      comments: [],
    })

    await newPhoto.save();
    res.status(201).json({
      message: "Photo uploaded successfully",
      photo: newPhoto
    });
  } catch (error) {
    console.error("Error uploading photo:", error);
    res.status(500).json({ message: "Failed to upload photo", error: error.message });
  }
}

module.exports = { getUserPhotos, uploadPhoto };
