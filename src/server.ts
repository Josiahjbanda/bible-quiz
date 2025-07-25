import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from './routes/authRoutes';
import quizRoutes from './routes/quizRoutes';
import questionRoutes from './routes/quizRoutes';

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ DB Connection Error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes); 
app.use('/api/quiz/:quizId/questions', quizRoutes); 
app.use('/api', questionRoutes)


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
