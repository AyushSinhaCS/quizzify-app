import express from 'express';
const router = express.Router();
import { generateQuiz, getQuizById, submitQuiz } from '../controllers/quizController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/generate').post(protect, generateQuiz);
router.route('/submit').post(protect, submitQuiz); // Added this line
router.route('/:id').get(protect, getQuizById);

export default router;
