import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestion extends Document {
  quizId: string;
  text: string;
  options: string[];
  correctAnswer: string;
}

const QuestionSchema: Schema = new Schema({
  quizId: { type: String, required: true },
  text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
});

export default mongoose.model<IQuestion>('Question', QuestionSchema);
