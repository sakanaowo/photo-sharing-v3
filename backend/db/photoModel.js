
const mongoose = require("mongoose");
const commentSchema = require("./commentModel");

const photoSchema = new mongoose.Schema({
  file_name: { type: String, required: true },
  date_time: { type: Date, default: Date.now },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  comments: [commentSchema]
});

const Photo = mongoose.model("Photo", photoSchema);
module.exports = Photo;
