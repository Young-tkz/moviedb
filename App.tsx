
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import SearchResultsPage from './pages/SearchResultsPage';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="p-4 sm:p-6 md:p-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/search/:query" element={<SearchResultsPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
