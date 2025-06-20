import express from 'express';
import { protect } from '../middlewares/protect.js';
const router = express.Router();
import { User } from '../models/user.model.js';

import { signinController, signupController, updateSigninController } from '../controllers/auth.controller.js';

router.post('/signin', signinController);
router.post('/signup', signupController);
router.get('/me', protect, async (req, res) => {
  const user = await User.findById(req.user).select('-password');
  res.json(user);
});

router.put('/updateDetail', protect, updateSigninController);

router.post('/signout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'Strict',
        secure: process.env.NODE_ENV === 'production',
    });
    res.json({ message: "Signed out successfully" });
});

export default router;