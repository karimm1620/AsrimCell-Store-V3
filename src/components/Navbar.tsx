import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { SunIcon, MoonIcon, MenuIcon, CloseIcon } from './icons';
import { ToggleSwitch } from './ToggleSwitch';

interface NavbarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const categories = [
  { key: 'all', label: 'Semua' },
  { key: 'internet', label: 'Internet' },
  { key: 'game', label: 'Game' }
];

export const Navbar: React.FC<NavbarProps> = ({
  selectedCategory,
  setSelectedCategory,
  mobileOpen,
  setMobileOpen
}) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/20 dark:border-gray-700/20 fixed w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {/* <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AR</span>
              </div> */}
              <div className='w-8 h-8 items-center justify-center'>
                <img src="/assets/logos/logo cell.png" alt="" />
              </div>
              <div className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AsrimCell
              </div>
            </div>
            <div className="hidden sm:block text-sm text-gray-600 dark:text-gray-400">
              • Voucher & Top Up Terpercaya
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {categories.map(category => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  selectedCategory === category.key
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <SunIcon className="w-4 h-4 text-yellow-500" />
              <ToggleSwitch
                checked={isDarkMode}
                onChange={toggleDarkMode}
                size="sm"
                variant="premium"
              />
              <MoonIcon className="w-4 h-4 text-purple-500" />
            </div>
            
            {/* Mobile theme toggle button */}
            <button
              onClick={toggleDarkMode}
              className="sm:hidden p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <SunIcon className="w-5 h-5 text-yellow-500" />
              ) : (
                <MoonIcon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="md:hidden mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
            <div className="flex flex-col gap-2">
              {categories.map(category => (
                <button
                  key={category.key}
                  onClick={() => {
                    setSelectedCategory(category.key);
                    setMobileOpen(false);
                  }}
                  className={`py-3 px-4 text-left rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category.key
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};