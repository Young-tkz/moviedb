
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            MovieDb
        </Link>
        <div className="w-full max-w-xs">
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
