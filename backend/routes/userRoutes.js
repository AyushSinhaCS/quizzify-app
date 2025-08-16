import express from 'express';
const router = express.Router();
import { getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

// Define routes relative to the base path '/api/users'
router.route('/profile').get(protect, getUserProfile);

export default router;
