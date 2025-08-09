import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FiLogOut, FiUser, FiSun, FiMoon, FiHome } from 'react-icons/fi'; // Import FiHome

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Basic dark mode toggle - you can expand on this
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-6">
            <Link to="/" className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              Quizzify
            </Link>
            {/* --- NEW HOME BUTTON --- */}
            <Link to="/" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                <FiHome className="mr-1" />
                <span>Home</span>
            </Link>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <FiSun className="dark:hidden" />
            <FiMoon className="hidden dark:block" />
          </button>
          {user ? (
            <>
              <Link to="/dashboard" className="flex items-center hover:text-purple-600 dark:hover:text-purple-400">
                <FiUser className="mr-1" />
                <span>{user.name}</span>
              </Link>
              <button onClick={handleLogout} className="flex items-center text-red-500 hover:text-red-700">
                <FiLogOut className="mr-1" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link to="/login" className="font-medium hover:text-purple-600 dark:hover:text-purple-400">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
