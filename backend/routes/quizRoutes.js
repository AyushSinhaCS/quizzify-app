import express from 'express';
const router = express.Router();
import { generateQuiz, getQuizById } from '../controllers/quizController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/generate').post(protect, generateQuiz);
router.route('/:id').get(protect, getQuizById);

export default router;
