import React from 'react';
import { SearchIcon, FilterIcon } from './icons';

interface SearchBarProps {
  search: string;
  setSearch: (search: string) => void;
  onFilterClick: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch, onFilterClick }) => {
  return (
    <div className="relative flex items-center gap-3 mb-8">
      <div className="relative flex-1">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Cari paket, provider, atau deskripsi..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>
      <button
        onClick={onFilterClick}
        className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
        aria-label="Filter products"
      >
        <FilterIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      </button>
    </div>
  );
};