import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const QuizPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);

    const { user, refreshUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchQuiz = async () => {
            if (!user?.token) return;
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/quizzes/${id}`, config);
                setQuiz(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load quiz.');
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [id, user?.token]);

    const submitScore = async (finalScore, finalAnswers) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };
            await axios.post(
                `${process.env.REACT_APP_API_URL}/api/quizzes/submit`,
                {
                    quizId: id,
                    score: finalScore,
                    totalQuestions: quiz.questions.length,
                    topic: quiz.topic, // This line sends the topic
                    userAnswers: finalAnswers,
                },
                config
            );
            await refreshUser();
        } catch (err) {
            console.error("Error submitting score:", err);
            alert("There was an error submitting your score. Please check the console for details.");
        }
    };

    const handleAnswerSelect = (option) => {
        setSelectedAnswer(option);
    };
    
    const handleNextQuestion = () => {
        const newAnswers = [...userAnswers, { questionIndex: currentQuestionIndex, selectedAnswer }];
        setUserAnswers(newAnswers);

        let newScore = score;
        if (selectedAnswer === quiz.questions[currentQuestionIndex].correctAnswer) {
            newScore = score + 1;
            setScore(newScore);
        }

        setSelectedAnswer(null);

        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setShowResult(true);
            submitScore(newScore, newAnswers);
        }
    };

    if (loading) return <div className="text-center mt-10">Loading Quiz...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
    if (!quiz) return null;

    if (showResult) {
        return (
            <div className="text-center mt-10 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-lg mx-auto">
                <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
                <p className="text-xl mb-6">Your final score is: <span className="font-bold text-purple-600">{score}</span> out of {quiz.questions.length}</p>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
                >
                    Back to Dashboard
                </button>
            </div>
        )
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const optionLetters = ['A', 'B', 'C', 'D'];

    return (
        <div className="max-w-2xl mx-auto mt-10 p-8 border rounded-lg shadow-lg bg-white dark:bg-gray-800">
            <h2 className="text-2xl font-bold mb-2">{quiz.title}</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>
            
            <div className="mb-6">
                <p className="text-lg font-semibold">{currentQuestion.question}</p>
            </div>

            <div className="space-y-4">
                {currentQuestion.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerSelect(optionLetters[index])}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${selectedAnswer === optionLetters[index] ? 'bg-purple-200 border-purple-500 dark:bg-purple-900' : 'bg-gray-100 border-gray-200 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600'}`}
                    >
                        <span className="font-bold mr-2">{optionLetters[index]}.</span> {option}
                    </button>
                ))}
            </div>

            <button
                onClick={handleNextQuestion}
                disabled={!selectedAnswer}
                className="w-full mt-8 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-purple-300"
            >
                {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
        </div>
    );
};

export default QuizPage;
