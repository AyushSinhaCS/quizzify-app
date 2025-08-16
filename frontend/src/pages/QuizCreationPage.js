import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const QuizCreationPage = () => {
    const [topic, setTopic] = useState('');
    const [numQuestions, setNumQuestions] = useState(5);
    const [difficulty, setDifficulty] = useState('medium');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleGenerateQuiz = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            // This line ensures '/api' is correctly added to the request URL
            const { data } = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/quizzes/generate`,
                { topic, numQuestions, difficulty },
                config
            );
            
            setLoading(false);
            navigate(`/quiz/${data._id}`);

        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-8 border rounded-lg shadow-lg bg-white dark:bg-gray-800">
            <h2 className="text-2xl font-bold text-center mb-6">Create a New Quiz</h2>
            {error && <p className="text-red-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleGenerateQuiz}>
                <div className="mb-4">
                    <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Topic
                    </label>
                    <input
                        type="text"
                        id="topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
                        placeholder="e.g., Solar System"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="numQuestions" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Number of Questions
                    </label>
                    <select
                        id="numQuestions"
                        value={numQuestions}
                        onChange={(e) => setNumQuestions(Number(e.target.value))}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                    </select>
                </div>
                <div className="mb-6">
                    <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Difficulty
                    </label>
                    <select
                        id="difficulty"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-purple-300"
                >
                    {loading ? 'Generating...' : 'Generate Quiz'}
                </button>
            </form>
        </div>
    );
};

export default QuizCreationPage;
