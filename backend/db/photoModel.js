const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  file_name: { type: String, required: true },
  date_time: { type: Date, default: Date.now },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
})

const Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;