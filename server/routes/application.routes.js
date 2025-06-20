import {protect} from '../middlewares/protect.js'
import express from 'express'
const router = express.Router();
import Application from '../models/application.model.js';

import { applyForJob, myAppliedJobs, updateApplicationStatus, viewApplicant } from '../controllers/application.controller.js';

router.post('/apply', protect, applyForJob);
router.get('/applications/:jobId', protect, viewApplicant);
router.put('/applications/:appId/status', protect, updateApplicationStatus);

router.get('/status/:jobId', protect, async (req, res) => {
  try {
    const application = await Application.findOne({
      jobId: req.params.jobId,
      applicantId: req.user._id,
    });

    res.json({ applied: !!application });
  } catch (error) {
    res.status(500).json({ message: 'Error checking application status' });
  }
});

router.get('/myappliedjobs', protect, myAppliedJobs);

export default router;

