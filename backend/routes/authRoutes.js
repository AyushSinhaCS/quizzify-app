import express from 'express';
const router = express.Router();
import {
  registerUser,
  loginUser,
  getMe,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

// Add /api prefix to all routes
router.post('/api/auth/register', registerUser);
router.post('/api/auth/login', loginUser);
router.get('/api/auth/me', protect, getMe);

export default router;
