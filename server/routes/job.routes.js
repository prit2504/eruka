import express from 'express';
import {
  createJob,
  getAllJobs,
  getJobsByRecruiter,
  updateJob
} from '../controllers/job.controller.js';

const router = express.Router();

router.post('/jobs', createJob);
router.get('/jobs', getAllJobs);
router.get('/jobs/recruiter/:recruiterId', getJobsByRecruiter);
router.put('/jobs/:jobId', updateJob);

export default router;
