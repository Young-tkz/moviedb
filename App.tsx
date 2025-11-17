
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import SearchResultsPage from './pages/SearchResultsPage';
import TVShowDetailPage from './pages/TVShowDetailPage';

export type SearchType = 'movie' | 'tv';

const App: React.FC = () => {
  const [searchType, setSearchType] = useState<SearchType>('movie');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header searchType={searchType} setSearchType={setSearchType} />
      <main className="p-4 sm:p-6 md:p-8">
        <Routes>
          <Route path="/" element={<HomePage searchType={searchType} />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/tv/:id" element={<TVShowDetailPage />} />
          <Route path="/search/:type/:query" element={<SearchResultsPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
