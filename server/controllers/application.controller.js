import Application from "../models/application.model.js";
import { JobseekerProfile } from "../models/jobseekerProfile.model.js";

export async function applyForJob (req, res)  {
  try {
     const { jobId } = req.body;
    const applicantId = req.user._id;

    const alreadyApplied = await Application.findOne({ jobId, applicantId });
    if (alreadyApplied) {
      return res.status(400).json({ message: 'You have already applied for this job.' });
    }

    const application = await Application.create({ jobId, applicantId });
    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export async function updateApplicationStatus (req, res) {
  try {
    const { status } = req.body;
    const appId = req.params.appId;

    if (!['shortlisted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updatedApp = await Application.findByIdAndUpdate(
      appId,
      { status },
      { new: true }
    );

    res.json(updatedApp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


export async function viewApplicant (req, res) {
  try {
    const jobId = req.params.jobId;

    const applications = await Application.find({ jobId })
      .populate('applicantId', 'name email')
      .sort({ appliedAt: -1 });
    console.log(applications)

    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function myAppliedJobs (req, res) {
  try {
    const applications = await Application.find({ applicantId: req.user._id })
      .populate('jobId');

    res.json(applications);
  } catch (err) {
    console.error('Failed to fetch applied jobs:', err);
    res.status(500).json({ message: 'Server error' });
  }
}