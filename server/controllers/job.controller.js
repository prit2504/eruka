import express from 'express';
import Job from '../models/job.model.js';
import { protect } from '../middlewares/protect.js';

const router = express.Router();

router.post('/', protect, async (req, res) => {
  try {
    const {
      title, company, type, location,
      salary, description, requirements, email, startDate, endDate
    } = req.body;

    const job = await Job.create({
      recruiterId: req.user._id,
      title, company, type, location,
      salary, description,
      requirements,
      email, startDate, endDate
    });

    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', protect, async (req, res) => {
  try {
    const jobs = await Job.find({ recruiterId: req.user._id }).sort({ postedAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, recruiterId: req.user._id });

    if (!job) {
      return res.status(404).json({ message: 'Job not found or not authorized' });
    }

    const updates = req.body;
    Object.assign(job, updates);
    await job.save();

    res.json(job);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ 
      _id: req.params.id, 
      recruiterId: req.user._id 
    });

    if (!job) {
      return res.status(404).json({ message: 'Job not found or unauthorized' });
    }

    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ message: 'Server error while deleting job' });
  }
});


router.get('/search', async (req, res) => {
  const { query, type, location, salary } = req.query;

  try {
    const andConditions = [];

    // Keyword search
    if (query) {
      andConditions.push({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { company: { $regex: query, $options: 'i' } },
          { location: { $regex: query, $options: 'i' } },
          { type: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
          { requirements: { $regex: query, $options: 'i' } },
        ]
      });
    }

    if (type) {
      const types = type.split(',');
      andConditions.push({ type: { $in: types } });
    }

    if (location) {
      const locations = location.split(',');
      andConditions.push({ location: { $in: locations } });
    }

    if (salary) {
      const salaryFilters = salary.split(',').map((range) => {
        if (range === '< 5 LPA') return { salary: { $lt: 500000 } };
        if (range === '> 20 LPA') return { salary: { $gt: 2000000 } };
        const [min, max] = range.replace(' LPA', '').split('-').map(Number);
        return { salary: { $gte: min * 100000, $lte: max * 100000 } };
      });

      andConditions.push({ $or: salaryFilters });
    }

    const results = await Job.find(andConditions.length > 0 ? { $and: andConditions } : {});
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Search failed' });
  }
});





export default router;
