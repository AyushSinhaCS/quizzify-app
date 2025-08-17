import express from 'express';
const router = express.Router();
import { generateQuiz, getQuizById, submitQuiz } from '../controllers/quizController.js';
import { protect } from '../middleware/authMiddleware.js';

// Define routes relative to the base path '/api/quizzes'
router.route('/generate').post(protect, generateQuiz);
router.route('/submit').post(protect, submitQuiz);
router.route('/:id').get(protect, getQuizById);

export default router;
