// import User from "../db/userModel.js";
// import mongoose from "mongoose";
// import Photo from "../db/photoModel.js";

const Comment = require("../db/commentModel.js");
const User = require("../db/userModel.js");
const mongoose = require("mongoose");
const Photo = require("../db/photoModel.js");

const getUserPhotos = async (req, res) => {
  const userId = req.params.id;
  console.log("Fetching photos for user ID:", userId);
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const photos = await Photo.find({ user_id: userId });

    console.log("Found photos:", photos.length, "for user ID:", userId);

    const photosWithComments = await Promise.all(
      photos.map(async (photo) => {
        const comments = await Comment.find({ photo_id: photo._id });
        // const formattedComments = comments.map((cmt) => ({
        //   _id: cmt._id,
        //   comment: cmt.comment,
        //   date_time: cmt.date_time,
        //   user_id: cmt.user_id,
        // }));

        const formattedComments = await Promise.all(
          comments.map(async (cmt) => {
            const user = await User.findById(cmt.user_id).select("_id first_name last_name");
            return {
              _id: cmt._id,
              comment: cmt.comment,
              date_time: cmt.date_time,
              user_id: cmt.user_id,
              user: user,
            };
          })
        )

        return {
          _id: photo._id,
          file_name: photo.file_name,
          date_time: photo.date_time,
          user_id: photo.user_id,
          comments: formattedComments,
        };
      })
    );
    res.status(200).json(photosWithComments);

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

const getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.find({}).lean();
    res.status(200).json(photos);
  } catch (error) {
    console.error("Error fetching all photos:", error);
    res.status(500).json({ message: "Failed to fetch photos", error: error.message });
  }
}
module.exports = { getUserPhotos, uploadPhoto, getAllPhotos };
