import mongoose from 'mongoose';

const questionSchema = mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
});

const quizSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    questions: [questionSchema],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
