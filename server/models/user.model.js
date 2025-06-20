import mongoose, { Types } from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    role: {
        type: String,
        enum: ['jobseeker', 'recruiter'],
        default: 'jobseeker'
    }
});

export const User = mongoose.model('User', userSchema);