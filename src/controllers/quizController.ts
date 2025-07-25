// src/controllers/quizController.ts
import { Request, Response } from 'express';
import Question from '../models/Question';
import User from '../models/User';

// Get all questions
export const getAllQuestions = async (req: Request, res: Response) => {
  try {
    const questions = await Question.find().select('-correctAnswer');
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single question by ID
export const getQuestionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const question = await Question.findById(id).select('-correctAnswer');
    
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get questions by quiz ID
export const getQuestionsByQuiz = async (req: Request, res: Response) => {
  try {
    const { quizId } = req.params;
    const questions = await Question.find({ quizId }).select('-correctAnswer');
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Submit quiz answers
export const submitAnswers = async (req: Request, res: Response) => {
  try {
    const { quizId } = req.params;
    const { answers } = req.body;
    const userId = req.user.id;

    const questions = await Question.find({ quizId });

    let score = 0;
    for (const q of questions) {
      const userAnswer = answers.find((a: any) => a.questionId === q._id.toString());
      if (userAnswer && userAnswer.answer === q.correctAnswer) {
        score++;
      }
    }

    await User.findByIdAndUpdate(userId, {
      $push: {
        quizHistory: { quizId, score, date: new Date() }
      }
    });

    res.json({ score, total: questions.length });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting quiz' });
  }
};

// Create new question
export const createQuestion = async (req: Request, res: Response) => {
  try {
    const { quizId, text, options, correctAnswer } = req.body;
    const question = new Question({ quizId, text, options, correctAnswer });
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ message: 'Error creating question' });
  }
};