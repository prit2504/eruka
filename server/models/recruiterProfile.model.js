import mongoose from "mongoose";

const recruiterProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  companyName: String,
  designation: String,
  website: String,
  location: String,
  about: String
}, { timestamps: true });

export const RecruiterProfile = mongoose.model("RecruiterProfile", recruiterProfileSchema);
