import express from 'express';
import {
  getAllQuestions,
  getQuestionById,
  getQuestionsByQuiz,
  submitAnswers,
  createQuestion
} from '../controllers/quizController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// GET /api/quiz - Get all quizzes (example)
router.get('/', (req, res) => {
  res.json({ message: 'Quiz API is working' });
});

// GET /api/quiz/questions - Get all questions
router.get('/questions', protect, getAllQuestions);

// GET /api/quiz/questions/:id - Get single question
router.get('/questions/:id', protect, getQuestionById);

// GET /api/quiz/:quizId/questions - Get questions by quiz ID
router.get('/:quizId/questions', protect, getQuestionsByQuiz);

// POST /api/quiz/:quizId/submit - Submit answers
router.post('/:quizId/submit', protect, submitAnswers);

// POST /api/quiz - Create new question (admin only)
router.post('/', protect, createQuestion);

export default router;