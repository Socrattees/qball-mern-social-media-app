import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 6
  },
  profilePicture: {
    type: String,
    default: ""
  },
  coverPicture: {
    type: String,
    default: ""
  },
  followers: {
    type: Array,
    default: []
  },
  following: {
    type: Array,
    default: []
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  desc: {
    type: String,
    max: 50,
    default: ""
  },
  city: {
    type: String,
    max: 50,
    default: ""
  },
  from: {
    type: String,
    max: 50,
    default: ""
  },
  relationship: {
    type: String,
    enum: ["Single", "Married", "Other"],
    default: "Single"
  }
}, { timestamps: true});

export default mongoose.model("User", UserSchema);