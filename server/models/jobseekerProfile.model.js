import mongoose from "mongoose";

const jobseekerProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  resumeLink: String,
  skills: [String],
  experience: String,
  preferredLocations: [String],
  education: String,
  about: String
}, { timestamps: true });

export const JobseekerProfile = mongoose.model("JobseekerProfile", jobseekerProfileSchema);
