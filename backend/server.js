import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import quizRoutes from './routes/quizRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

connectDB();

const app = express();

// --- FINAL, DEFINITIVE CORS CONFIGURATION ---
const corsOptions = {
  origin: 'https://quizzifyt.netlify.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

// This handles the preflight request that browsers send first.
app.options('*', cors(corsOptions)); 
app.use(cors(corsOptions));
// --- END OF NEW CONFIGURATION ---

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running and ready!');
});

// Use the routers directly. The full path is now in the route files.
app.use(quizRoutes);
app.use(authRoutes);
app.use(userRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`Server running on port ${PORT}`));

// Export the app for Vercel
export default app;
