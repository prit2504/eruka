import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './utils/db.js';
dotenv.config();

import authRouter from './routes/auth.routes.js';
import profileRoutes from './routes/profile.routes.js';
import jobRoutes from './controllers/job.controller.js';
import ApplcationRoutes from './routes/application.routes.js'




const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(urlencoded());

app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true,                 
}));



app.use('/api', authRouter);
app.use('/api/profile', profileRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api', ApplcationRoutes);

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log("Server is Running on PORT = 7000");
    connectDB();
})