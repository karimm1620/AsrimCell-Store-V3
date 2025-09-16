import React from "react";
import { SearchIcon, FilterIcon } from "./icons";

interface SearchBarProps {
  search: string;
  setSearch: (search: string) => void;
  onFilterClick: () => void;
  showFilters: boolean;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const categories = [
  { key: "all", label: "Semua" },
  { key: "internet", label: "Internet" },
  { key: "game", label: "Game" },
];

export const SearchBar: React.FC<SearchBarProps> = ({
  search,
  setSearch,
  onFilterClick,
  showFilters,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="mb-8">
      <div className="relative flex items-center gap-3">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5 sm:w-6 sm:h-6" />
          <input
            type="text"
            placeholder="Cari paket, provider..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 sm:pl-16 pr-4 sm:pr-6 py-4 sm:py-5 glass dark:glass-dark border border-white/20 dark:border-white/10 rounded-2xl sm:rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-purple-500/50 focus:border-blue-500/50 dark:focus:border-purple-500/50 focus:shadow-glass-lg transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-medium text-base sm:text-lg backdrop-blur-xl"
          />
        </div>
        <button
          onClick={onFilterClick}
          className={`p-4 sm:p-5 glass dark:glass-dark border border-white/20 dark:border-white/10 rounded-2xl sm:rounded-3xl hover:shadow-glass transition-all duration-300 transform hover:scale-110 backdrop-blur-xl ${
            showFilters
              ? "bg-blue-500/20 dark:bg-purple-500/20 border-blue-500/50 dark:border-purple-500/50"
              : ""
          }`}
          aria-label="Toggle filters"
        >
          <FilterIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="mt-4 p-4 glass dark:glass-dark rounded-2xl border border-white/20 dark:border-white/10 shadow-glass animate-slide-down backdrop-blur-xl">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
            Filter Kategori
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 text-sm ${
                  selectedCategory === category.key
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-glass"
                    : "text-gray-600 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10 backdrop-blur-sm"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
