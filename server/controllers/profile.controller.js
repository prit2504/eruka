import { RecruiterProfile } from "../models/recruiterProfile.model.js";
import { JobseekerProfile } from "../models/jobseekerProfile.model.js";

// Recruiter Profile
export const createOrUpdateRecruiter = async (req, res) => {
  try {
    const { companyName, designation, website, location, about } = req.body;
    const userId = req.user._id;

    const profile = await RecruiterProfile.findOneAndUpdate(
      { userId },
      { companyName, designation, website, location, about },
      { upsert: true, new: true }
    );

    res.status(200).json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating/updating recruiter profile" });
  }
};

export const createOrUpdateJobseeker = async (req, res) => {
  try {
    const { resumeLink, skills, experience, preferredLocations, education, about } = req.body;
    const userId = req.user._id;

    const profile = await JobseekerProfile.findOneAndUpdate(
      { userId },
      { resumeLink, skills, experience, preferredLocations, education, about },
      { upsert: true, new: true }
    );

    res.status(200).json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating/updating jobseeker profile" });
  }
};

export async function getProfile (req, res) {
  try {
    const userId = req.user._id;
    const profile = await JobseekerProfile.findOne({userId});

    res.status(200).json({profile});
  } catch (error) {
    
  }
}

export async function getRecruiterProfile (req, res) {
  try {
    const userId = req.user._id;
    const profile = await RecruiterProfile.findOne({userId});

    res.status(200).json({profile});
  } catch (error) {
    
  }
}