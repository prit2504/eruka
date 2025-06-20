import express from 'express';
import { protect } from '../middlewares/protect.js';
import { JobseekerProfile } from '../models/jobseekerProfile.model.js';
import { createOrUpdateRecruiter, createOrUpdateJobseeker, getProfile, getRecruiterProfile } from '../controllers/profile.controller.js';

const router = express.Router();

router.post('/recruiter', protect, createOrUpdateRecruiter);
router.post('/jobseeker', protect, createOrUpdateJobseeker);
router.get('/getProfile', protect, getProfile);
router.get('/getRecruiterProfile', protect, getRecruiterProfile);
router.get('/getProfileForRecruiter/:userId', protect, async (req, res) => {
    try {
    const userId = req.params.userId;
    const profile = await JobseekerProfile.findOne({userId});

    res.status(200).json({profile});
  } catch (error) {
    
  }})
export default router;
