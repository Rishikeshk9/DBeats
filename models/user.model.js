const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    album_count: { type: Number, default: 0 },
    bio: { type: String, default:'',trim: true},
    cover_photo: { type: String, trim: true },
    followee_count: { type: Number, default: 0 },
    follower_count: { type: Number, default: 0 },
    handle: { type: String, unique: true, trim: true,required: true, },
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 5,
    },
    is_verified: { type: Boolean, default: false },
    location: { type: String, trim: true,default:null },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    playlist_count: { type: Number, default: 0 },
    profile_picture: {
      type: String,
      trim: true,
      minlength: 3,
    },
    repost_count: { type: Number, default: 0 },
    track_count: { type: Number, default: 0 },
    wallet_id: { type: String, trim: true ,default:null},
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
