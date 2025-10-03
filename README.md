Quizzify – AI Quiz Generator & Gamified Learning Portal
Quizzify is a full-stack MERN web application that allows users to dynamically generate quizzes on any topic using the Google Gemini API, engage in a gamified learning experience, and track their progress.

✨ Live Demo

quizzifyt.netlify.app

📸 Screenshots

Homepage

<img src="https://github.com/user-attachments/assets/f26f6da0-7bb5-4453-ae42-15d903074cc2" width="100%" />

Dashboard

<img src="https://github.com/user-attachments/assets/3d68f595-ab69-49f5-8376-eed39312fbc2" width="100%" />

Quiz Page

<img src="https://github.com/user-attachments/assets/a9a55eae-b7d8-44e2-83ee-886798c62a6f" width="100%" />

🚀 Core Features

AI-Powered Quiz Generation: Dynamically create quizzes (MCQs) from any user-provided topic and difficulty level using the Google Gemini API.

Interactive Quiz Interface: A clean, timed, and responsive interface for taking quizzes.

Real-time Scoring & Feedback: Instant feedback on answers and a comprehensive final score summary.

Gamified Learning System:

Earn Experience Points (XP) for correct answers.

Level Up every 100 XP.

Unlock Badges for achievements like completing your first quiz or getting a perfect score.

Secure User Authentication: Robust user registration and login system using JSON Web Tokens (JWT).

Personalized User Dashboard: Track quiz history, scores, XP, level, and earned badges.

Modern & Responsive UI: A clean, mobile-first design built with Tailwind CSS, featuring smooth transitions and a dark mode toggle.

CI/CD Pipeline: Automated deployments from GitHub to live servers.

⚙️ Tech Stack

Frontend: React.js, React Router, Tailwind CSS, Axios

Backend: Node.js, Express.js

Database: MongoDB with Mongoose

AI Integration: Google Gemini API

Authentication: JSON Web Tokens (JWT)

Deployment:

Backend: Vercel

Frontend: Netlify

🛠️ Getting Started Locally

(Instructions on how to run the project on a local machine)

Prerequisites

Node.js and npm

MongoDB instance (local or Atlas)

Google AI (Gemini) API Key

Backend Setup

# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create a .env file and add your environment variables
# (MONGO_URI, GEMINI_API_KEY, JWT_SECRET, PORT)

# Start the server
npm start

Frontend Setup

# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Create a .env file and add your backend URL
# REACT_APP_API_URL=http://localhost:5001

# Start the client
npm start

## License

**Copyright (c) 2025 Ayush Sinha. All Rights Reserved.**

This project is proprietary software. You are not permitted to copy, modify, distribute, or use this software in any way without obtaining express written permission from the author.

You may view the source code for educational or reference purposes only.

To request permission or a license for usage, please contact me at [your-email@example.com].
