// seedJobs.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Job  from '../models/job.model.js'; 

dotenv.config(); // To use .env file

const MONGO_URI = process.env.MONGO_URI;

const sampleJobs = [
  {
    recruiterId: '6854f7d63b4e92793da3f4d8',
    title: "Backend Engineer",
    company: "InnoSoft Pvt Ltd",
    type: "work-from-office",
    location: "Mumbai",
    salary: "10 LPA",
    description: "Backend engineer with experience in Node.js and MongoDB.",
    requirements: ["Node.js", "MongoDB", "REST APIs"],
    startDate: new Date("2025-07-10"),
    endDate: new Date("2026-01-10"),
    email: "jobs@innosoft.in"
  },
  {
    recruiterId: '6854f7d63b4e92793da3f4cf',
    title: "UI/UX Designer",
    company: "ByteForge",
    type: "hybrid",
    location: "Hyderabad",
    salary: "7 LPA",
    description: "Creative designer needed to shape product experiences.",
    requirements: ["Figma", "Adobe XD", "User Research"],
    startDate: new Date("2025-08-01"),
    endDate: new Date("2026-08-01"),
    email: "design@byteforge.io"
  },
  {
    recruiterId: '6854f7d63b4e92793da3f4d0',
    title: "DevOps Engineer",
    company: "FinEdge Tech",
    type: "work-from-office",
    location: "Pune",
    salary: "12 LPA",
    description: "Join our infra team to manage cloud-native apps.",
    requirements: ["AWS", "Docker", "CI/CD", "Linux"],
    startDate: new Date("2025-07-15"),
    endDate: new Date("2026-07-15"),
    email: "careers@finedge.tech"
  },
  {
    recruiterId: '6854f7d63b4e92793da3f4d1',
    title: "Software Tester",
    company: "GreenGrid Energy",
    type: "hybrid",
    location: "Delhi",
    salary: "6 LPA",
    description: "Manual and automated testing of web apps.",
    requirements: ["Selenium", "Test Cases", "Bug Reporting"],
    startDate: new Date("2025-07-20"),
    endDate: new Date("2026-07-20"),
    email: "qa@greengrid.energy"
  },
  {
    recruiterId: '6854f7d63b4e92793da3f4d2',
    title: "Java Developer",
    company: "EduVerse Learning",
    type: "work-from-home",
    location: "Remote",
    salary: "9 LPA",
    description: "Build backend systems for our e-learning platform.",
    requirements: ["Java", "Spring Boot", "MySQL"],
    startDate: new Date("2025-07-05"),
    endDate: new Date("2026-01-05"),
    email: "dev@eduverse.com"
  },
  {
    recruiterId: '6854f7d63b4e92793da3f4d3',
    title: "Product Manager",
    company: "LogiChain Technologies",
    type: "work-from-office",
    location: "Ahmedabad",
    salary: "15 LPA",
    description: "Lead the product development lifecycle for logistics tools.",
    requirements: ["Agile", "Jira", "Roadmapping"],
    startDate: new Date("2025-08-01"),
    endDate: new Date("2026-08-01"),
    email: "pm@logichain.tech"
  },
  {
    recruiterId: '6854f7d63b4e92793da3f4d4',
    title: "Machine Learning Engineer",
    company: "MedSmart AI",
    type: "hybrid",
    location: "Kolkata",
    salary: "14 LPA",
    description: "Work on medical data models and prediction systems.",
    requirements: ["Python", "Pandas", "TensorFlow", "NLP"],
    startDate: new Date("2025-07-25"),
    endDate: new Date("2026-07-25"),
    email: "ml@medsmartai.com"
  },
  {
    recruiterId: '6854f7d63b4e92793da3f4d5',
    title: "Cloud Architect",
    company: "CloudNest Systems",
    type: "work-from-home",
    location: "Remote",
    salary: "18 LPA",
    description: "Lead cloud migration and deployment solutions.",
    requirements: ["Azure", "Terraform", "Kubernetes"],
    startDate: new Date("2025-07-01"),
    endDate: new Date("2026-07-01"),
    email: "cloud@cloudnest.io"
  },
  {
    recruiterId: '6854f7d63b4e92793da3f4d6',
    title: "Robotics Engineer",
    company: "NeoBots Robotics",
    type: "work-from-office",
    location: "Jaipur",
    salary: "11 LPA",
    description: "Develop robotics software and control algorithms.",
    requirements: ["C++", "ROS", "Microcontrollers"],
    startDate: new Date("2025-07-10"),
    endDate: new Date("2026-07-10"),
    email: "jobs@neobots.in"
  }
];

const seedJobs = async () => {
  try {
    await mongoose.connect("mongodb+srv://project_eruka:eruka%40123@cluster0.qma72mm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    await Job.insertMany(sampleJobs);
    console.log('✅ Job data seeded successfully.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to seed jobs:', err);
    process.exit(1);
  }
};

seedJobs();
