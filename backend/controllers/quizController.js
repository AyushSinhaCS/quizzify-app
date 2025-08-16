import asyncHandler from 'express-async-handler';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Quiz from '../models/quizModel.js';
import User from '../models/userModel.js';

// ... (generateQuiz function remains the same) ...
const generateQuiz = asyncHandler(async (req, res) => {
  const { topic, numQuestions = 5, difficulty = 'medium' } = req.body;

  if (!topic) {
    res.status(400);
    throw new Error('Please provide a topic');
  }

  if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not found in .env file');
  }
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest"});

  const prompt = `Generate a quiz with ${numQuestions} multiple-choice questions on the topic of "${topic}" with a difficulty level of ${difficulty}.
  For each question, provide:
  1. The question text.
  2. Four options (A, B, C, D).
  3. The correct answer letter.
  
  Format the output as a valid JSON array of objects, where each object has "question", "options" (an array of strings), and "correctAnswer" (a string like "C").
  Do not include any text before or after the JSON array.
  Example:
  [
    {
      "question": "What is the capital of France?",
      "options": ["London", "Berlin", "Paris", "Madrid"],
      "correctAnswer": "C"
    }
  ]
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let quizDataText = response.text();
    
    quizDataText = quizDataText.replace(/```json/g, '').replace(/```/g, '').trim();

    const quizData = JSON.parse(quizDataText);

    const newQuiz = await Quiz.create({
      title: `Quiz on ${topic}`,
      topic,
      questions: quizData,
      createdBy: req.user._id,
    });

    res.status(201).json(newQuiz);

  } catch (error) {
    console.error('Error generating quiz from Google AI:', error);
    res.status(500);
    throw new Error('Failed to generate quiz. Please try again.');
  }
});

// @desc    Get a quiz by ID
// @route   GET /api/quizzes/:id
// @access  Private
const getQuizById = asyncHandler(async (req, res) => {
    // --- NEW DEBUGGING LINE ---
    console.log(`Attempting to find quiz with ID: ${req.params.id}`);

    const quiz = await Quiz.findById(req.params.id);

    if (quiz) {
        console.log("Quiz found successfully!");
        res.json(quiz);
    } else {
        console.log("Quiz NOT found in the database.");
        res.status(404);
        throw new Error('Quiz not found');
    }
});

// ... (submitQuiz and getQuizReview functions remain the same) ...
const submitQuiz = asyncHandler(async (req, res) => {
  const { quizId, score, totalQuestions, userAnswers } = req.body;
  const user = await User.findById(req.user._id);

  if (user) {
    user.quizHistory.push({ quizId, score, totalQuestions, userAnswers });
    
    const earnedXp = score * 10;
    user.xp += earnedXp;

    const currentLevel = Math.floor(user.xp / 100) + 1;
    if (currentLevel > user.level) {
        user.level = currentLevel;
    }

    if (user.quizHistory.length === 1 && !user.badges.some(b => b.name === "First Quiz")) {
        user.badges.push({ name: "First Quiz", date: new Date() });
    }
    if (score === totalQuestions && !user.badges.some(b => b.name === "Perfect Score")) {
        user.badges.push({ name: "Perfect Score", date: new Date() });
    }
    
    await user.save();
    res.status(200).json({ message: 'Quiz submitted successfully' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const getQuizReview = asyncHandler(async (req, res) => {
    const { attemptId } = req.params;
    const user = await User.findById(req.user._id).populate('quizHistory.quizId');

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    const attempt = user.quizHistory.id(attemptId);

    if (!attempt) {
        res.status(404);
        throw new Error('Quiz attempt not found');
    }

    res.status(200).json(attempt);
});

export { generateQuiz, getQuizById, submitQuiz, getQuizReview };
