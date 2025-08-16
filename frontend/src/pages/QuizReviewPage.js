import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FiCheckCircle, FiXCircle, FiArrowLeft } from 'react-icons/fi';

const QuizReviewPage = () => {
    const { attemptId } = useParams();
    const [reviewData, setReviewData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchReviewData = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/quizzes/review/${attemptId}`, config);
                setReviewData(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load quiz review.');
                setLoading(false);
            }
        };
        if (user?.token) {
            fetchReviewData();
        }
    }, [attemptId, user?.token]);

    if (loading) return <div className="text-center mt-10">Loading Review...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
    if (!reviewData) return null;

    const { quizId: quiz, userAnswers } = reviewData;
    const optionLetters = ['A', 'B', 'C', 'D'];

    return (
        <div>
            <Link to="/dashboard" className="inline-flex items-center mb-6 text-purple-600 hover:underline">
                <FiArrowLeft className="mr-2" />
                Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold mb-2">{quiz.title} - Review</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">Your Score: {reviewData.score}/{reviewData.totalQuestions}</p>

            <div className="space-y-8">
                {quiz.questions.map((question, index) => {
                    const userAnswer = userAnswers.find(ans => ans.questionIndex === index)?.selectedAnswer;
                    const isCorrect = userAnswer === question.correctAnswer;

                    return (
                        <div key={index} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                            <div className="flex justify-between items-start mb-4">
                                <p className="text-lg font-semibold flex-1">{index + 1}. {question.question}</p>
                                {isCorrect ? (
                                    <FiCheckCircle className="text-green-500 text-2xl ml-4" />
                                ) : (
                                    <FiXCircle className="text-red-500 text-2xl ml-4" />
                                )}
                            </div>
                            <div className="space-y-3">
                                {question.options.map((option, optIndex) => {
                                    const letter = optionLetters[optIndex];
                                    const isSelected = userAnswer === letter;
                                    const isCorrectAnswer = question.correctAnswer === letter;
                                    
                                    let style = "border-gray-300 dark:border-gray-600";
                                    if (isCorrectAnswer) {
                                        style = "border-green-500 bg-green-100 dark:bg-green-900/50";
                                    }
                                    if (isSelected && !isCorrect) {
                                        style = "border-red-500 bg-red-100 dark:bg-red-900/50";
                                    }

                                    return (
                                        <div key={optIndex} className={`p-3 border-2 rounded-md ${style}`}>
                                            <span className="font-bold mr-2">{letter}.</span> {option}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default QuizReviewPage;
