
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchType } from '../App';

interface SearchBarProps {
  searchType: SearchType;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchType }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${searchType}/${query.trim()}`);
      setQuery('');
    }
  };

  const placeholderText = searchType === 'movie' ? 'Search for a movie...' : 'Search for a TV show...';

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholderText}
        className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
      />
      <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
