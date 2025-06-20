import mongoose from 'mongoose';


const jobSchema = new mongoose.Schema({
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  type: {
    type: String,
    // enum: ['full-time', 'part-time', 'internship', 'freelance'],
    enum: ['work-from-office', 'work-from-home', 'hybrid'],
    required: true
  },
  location: {
    type: String,
    required: true
  },
  salary: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  requirements: {
    type: [String]
  },
  startDate: { type: Date },
  endDate: { type: Date },
  postedAt: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String
  },

});

const Job = mongoose.model('Job', jobSchema);
export default Job;
