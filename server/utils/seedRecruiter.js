// seedRecruiters.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/user.model.js'; // Adjust path as needed

dotenv.config();

const recruiterUsers = [
  {
    name: "Aarav Mehta",
    email: "aarav.mehta@tcs.com",
    password: "xyz@123",
    role: "recruiter"
  },
  {
    name: "Priya Sharma",
    email: "priya.sharma@infosys.com",
    password: "xyz@123",
    role: "recruiter"
  },
  {
    name: "Rohan Gupta",
    email: "rohan.gupta@wipro.com",
    password: "xyz@123",
    role: "recruiter"
  },
  {
    name: "Anjali Verma",
    email: "anjali.verma@hcl.com",
    password: "xyz@123",
    role: "recruiter"
  },
  {
    name: "Neeraj Singh",
    email: "neeraj.singh@zoho.com",
    password: "xyz@123",
    role: "recruiter"
  },
  {
    name: "Sneha Reddy",
    email: "sneha.reddy@freshworks.com",
    password: "xyz@123",
    role: "recruiter"
  },
  {
    name: "Karan Malhotra",
    email: "karan.malhotra@capgemini.com",
    password: "xyz@123",
    role: "recruiter"
  },
  {
    name: "Divya Nair",
    email: "divya.nair@deloitte.com",
    password: "xyz@123",
    role: "recruiter"
  },
  {
    name: "Amit Joshi",
    email: "amit.joshi@cognizant.com",
    password: "xyz@123",
    role: "recruiter"
  },
  {
    name: "Pooja Iyer",
    email: "pooja.iyer@mindtree.com",
    password: "xyz@123",
    role: "recruiter"
  }
];


const seedRecruiters = async () => {
  try {
    await mongoose.connect("mongodb+srv://project_eruka:eruka%40123@cluster0.qma72mm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    await User.insertMany(recruiterUsers);
    console.log('✅ Recruiters seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding recruiters:', error);
    process.exit(1);
  }
};

seedRecruiters();
