import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function signinController(req, res) {
    const { email, password, role } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ message: "Email is required!" });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({ message: "Minimum length of password is 6!" });
        }

        if (!role) {
            return res.status(400).json({ message: "Please select role!" });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials (email)!" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid credentials (password)!" });
        }

        if (role !== user.role) {
            return res.status(401).json({ message: "Please select your registered role!" });
        }

        const token = jwt.sign({"userId": user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict", 
            maxAge: 3600000,
        });

        return res.status(200).json({
            user: {
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Error in signin controller:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}


export async function signupController(req, res) {
    const { name, email, password, role } = req.body;

    try {
        if (!name) {
            return res.status(400).json({ message: "Username is required!" });
        }

        if (!email) {
            return res.status(400).json({ message: "Email is required!" });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({ message: "Minimum length of password is 6!" });
        }

        if (!role) {
            return res.status(400).json({ message: "Please select role!" });
        }

        const isUser = await User.findOne({ email });

        if (isUser) {
            return res.status(409).json({ message: "Already registered!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await user.save();

        res.status(201).json({
            user: {
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Error in signup controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export async function updateSigninController(req, res) {
  const { name, email } = req.body;

  try {
    const userId = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true, context: 'query' }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating profile:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
