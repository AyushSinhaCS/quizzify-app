import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import QuizPage from './pages/QuizPage';
import Header from './components/common/Header';
import Footer from './components/common/Footer'; // Import Footer
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';
import QuizCreationPage from './pages/QuizCreationPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
              <Route path="/create-quiz" element={<PrivateRoute><QuizCreationPage /></PrivateRoute>} />
              <Route path="/quiz/:id" element={<PrivateRoute><QuizPage /></PrivateRoute>} />
            </Routes>
          </main>
          <Footer /> {/* Add Footer here */}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
