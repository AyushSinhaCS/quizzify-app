import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiAward, FiBarChart2, FiZap, FiPlusCircle, FiCheckCircle } from 'react-icons/fi';

const DashboardPage = () => {
  const { user, refreshUser } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    refreshUser();
  }, [location, refreshUser]);

  if (!user) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="main-background min-h-full p-4 sm:p-6 lg:p-8">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome back, {user.name}!</h1>
        <Link
          to="/create-quiz"
          className="flex items-center justify-center px-6 py-3 bg-purple-600 text-white font-bold rounded-lg shadow-lg hover:bg-purple-700 transition-all transform hover:scale-105"
        >
          <FiPlusCircle className="mr-2" />
          Create New Quiz
        </Link>
      </div>
      
      {/* Stat Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-lg flex items-center transition-all transform hover:-translate-y-1 hover:shadow-2xl">
          <FiZap className="text-yellow-400 text-4xl mr-4" />
          <div>
            <p className="text-gray-500 dark:text-gray-400">Experience</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{user.xp || 0} XP</p>
          </div>
        </div>
        <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-lg flex items-center transition-all transform hover:-translate-y-1 hover:shadow-2xl">
          <FiBarChart2 className="text-green-500 text-4xl mr-4" />
          <div>
            <p className="text-gray-500 dark:text-gray-400">Level</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{user.level || 1}</p>
          </div>
        </div>
        <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-lg flex items-center transition-all transform hover:-translate-y-1 hover:shadow-2xl">
          <FiAward className="text-blue-500 text-4xl mr-4" />
          <div>
            <p className="text-gray-500 dark:text-gray-400">Badges</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{user.badges?.length || 0}</p>
          </div>
        </div>
      </div>

      {/* Recent Quizzes Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Recent Activity</h2>
        <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-lg">
          {user.quizHistory && user.quizHistory.length > 0 ? (
            <ul className="space-y-4">
              {user.quizHistory.slice().reverse().slice(0, 5).map((attempt) => (
                <li key={attempt._id} className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <FiCheckCircle className="text-green-500 text-2xl mr-4"/>
                  <div className="flex-grow">
                    <p className="font-semibold text-gray-700 dark:text-gray-200">Quiz on {attempt.topic}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(attempt.date).toLocaleDateString()}</p>
                  </div>
                  <p className="font-bold text-lg text-gray-800 dark:text-white">{attempt.score}/{attempt.totalQuestions}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">You have not completed any quizzes yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
