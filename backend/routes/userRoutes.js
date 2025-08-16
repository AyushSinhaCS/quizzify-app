import express from 'express';
const router = express.Router();
import { getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

// Add /api prefix to all routes
router.route('/api/users/profile').get(protect, getUserProfile);

export default router;
