import React from 'react';
import { FiGithub } from 'react-icons/fi'; // Import a GitHub icon

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="container mx-auto px-4 py-6 text-center text-gray-500 dark:text-gray-400">
        <p className="mb-2">&copy; {new Date().getFullYear()} Quizzify. All Rights Reserved.</p>
        <a 
          href="https://github.com/AyushSinhaCS" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          <FiGithub className="mr-2" />
          Designed & Developed by Ayush Sinha
        </a>
      </div>
    </footer>
  );
};

export default Footer;
