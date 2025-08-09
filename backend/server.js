import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// --- This part remains the same ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, './.env') });

import express from 'express';
import cors from 'cors'; // We will configure this
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import quizRoutes from './routes/quizRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

connectDB();

const app = express();

// --- NEW CORS CONFIGURATION ---
// We explicitly tell the server to allow requests from your live frontend URL
const corsOptions = {
  origin: 'https://quizzifyt.netlify.app',
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions)); // Use the new options
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
