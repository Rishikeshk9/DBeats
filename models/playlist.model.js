const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playlistSchema = new Schema(
  {
    artwork: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    description: {
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
    is_album: { type: Boolean, default: false },
    playlist_name: {
      type: String,
      required: true,
      trim: true,
    },
    repost_count: { type: Number, default: 0 },
    favorite_count: { type: Number, default: 0 },
    total_play_count: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
