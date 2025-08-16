import express from 'express';
const router = express.Router();
import { generateQuiz, getQuizById, submitQuiz, getQuizReview } from '../controllers/quizController.js';
import { protect } from '../middleware/authMiddleware.js';

// Add /api prefix to all routes
router.route('/api/quizzes/generate').post(protect, generateQuiz);
router.route('/api/quizzes/submit').post(protect, submitQuiz);
router.route('/api/quizzes/review/:attemptId').get(protect, getQuizReview);
router.route('/api/quizzes/:id').get(protect, getQuizById);

export default router;
