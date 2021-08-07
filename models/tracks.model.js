const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trackSchema = new Schema(
  {
    artwork: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    genre: {
      type: String,
      trim: true,
    },
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 5,
    },
    mood: {
      type: String,
      trim: true,
    },
    release_date: { type: Date, trim: true },
    repost_count: { type: Number, default: 0 },
    favorite_count: { type: Number, default: 0 },
    tags: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    duration: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Track = mongoose.model("Track", trackSchema);

module.exports = Track;
