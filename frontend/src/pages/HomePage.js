import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlayCircle, FiLogIn, FiCpu, FiAward, FiTrendingUp } from 'react-icons/fi';

const HomePage = () => {
  return (
    <div className="text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <div className="text-center py-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
          Welcome to Quizzify
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Generate quizzes on any topic instantly with the power of AI. Challenge yourself, track your progress, and climb the leaderboard!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/create-quiz"
            className="flex items-center justify-center px-8 py-4 bg-purple-600 text-white font-bold rounded-lg shadow-lg hover:bg-purple-700 transition-transform transform hover:scale-105"
          >
            <FiPlayCircle className="mr-2" />
            Create a Quiz
          </Link>
          <Link
            to="/login"
            className="flex items-center justify-center px-8 py-4 bg-gray-200 text-gray-800 font-bold rounded-lg shadow-lg hover:bg-gray-300 transition-transform transform hover:scale-105 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            <FiLogIn className="mr-2" />
            Login to Get Started
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <FiCpu className="text-5xl text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">AI-Powered Generation</h3>
              <p className="text-gray-600 dark:text-gray-400">Create unique quizzes on any subject in seconds.</p>
            </div>
            <div className="text-center p-6">
              <FiAward className="text-5xl text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Gamified Learning</h3>
              <p className="text-gray-600 dark:text-gray-400">Earn XP, level up, and unlock badges as you learn.</p>
            </div>
            <div className="text-center p-6">
              <FiTrendingUp className="text-5xl text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Track Your Progress</h3>
              <p className="text-gray-600 dark:text-gray-400">Monitor your scores and see your knowledge grow.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
