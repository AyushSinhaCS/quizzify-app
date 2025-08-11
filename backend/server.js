import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, './.env') });

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import quizRoutes from './routes/quizRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

connectDB();

const app = express();

// --- FINAL, MOST ROBUST CORS CONFIGURATION ---
app.use(cors({
  origin: 'https://quizzifyt.netlify.app'
}));
// --- END OF NEW CONFIGURATION ---


app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

// API Routes
app.use('/api/quizzes', quizRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);


// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`Server running on port ${PORT}`));

// Export the app for Vercel
export default app;
