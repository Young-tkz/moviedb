
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { SearchType } from '../App';

interface HeaderProps {
    searchType: SearchType;
    setSearchType: (type: SearchType) => void;
}

const Header: React.FC<HeaderProps> = ({ searchType, setSearchType }) => {
  const getButtonClass = (type: SearchType) => {
    return searchType === type
      ? 'bg-yellow-500 text-gray-900'
      : 'bg-gray-700 text-gray-300 hover:bg-gray-600';
  };
    
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-4 flex justify-between items-center gap-4">
        <Link to="/" className="text-2xl font-bold text-white flex-shrink-0 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            MovieDb
        </Link>
        <div className="flex-grow flex items-center justify-end gap-4">
            <div className="flex items-center bg-gray-800 rounded-full p-1">
                <button onClick={() => setSearchType('movie')} className={`px-4 py-1 text-sm font-semibold rounded-full transition-colors ${getButtonClass('movie')}`}>
                    Movies
                </button>
                <button onClick={() => setSearchType('tv')} className={`px-4 py-1 text-sm font-semibold rounded-full transition-colors ${getButtonClass('tv')}`}>
                    TV
                </button>
            </div>
            <div className="w-full max-w-xs">
                <SearchBar searchType={searchType} />
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
