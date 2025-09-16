import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { SunIcon, MoonIcon, MenuIcon, CloseIcon } from "./icons";
import { ToggleSwitch } from "./ToggleSwitch";

interface NavbarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const categories = [
  { key: "all", label: "Semua" },
  { key: "internet", label: "Internet" },
  { key: "game", label: "Game" },
];

export const Navbar: React.FC<NavbarProps> = ({
  selectedCategory,
  setSelectedCategory,
  mobileOpen,
  setMobileOpen,
}) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <nav className="glass dark:glass-dark fixed w-full z-50 transition-all duration-500 shadow-glass">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {/* <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-glow-blue animate-glow">
                <span className="text-white font-bold text-lg">A</span>
              </div> */}
              <div className="w-10 h-10 items-center justify-center rounded-2xl flex shadow-glow-blue animate-glow">
                <img
                  className="w-8 h-8"
                  src="/assets/logos/logo cell.png"
                  alt="logo"
                />
              </div>
              <div className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AsrimCell
              </div>
            </div>
            <div className="hidden sm:block text-sm text-gray-600 dark:text-gray-300 font-medium">
              • Voucher & Top Up Terpercaya
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.key
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-glass hover:shadow-glass-lg"
                    : "text-gray-600 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10 backdrop-blur-sm"
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
              className="sm:hidden p-3 rounded-2xl glass dark:glass-dark hover:shadow-glass transition-all duration-300 transform hover:scale-110"
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
              className="md:hidden p-3 rounded-2xl glass dark:glass-dark hover:shadow-glass transition-all duration-300 transform hover:scale-110"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="md:hidden mt-4 p-4 glass dark:glass-dark rounded-2xl shadow-glass animate-slide-down">
            <div className="flex flex-col gap-2">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => {
                    setSelectedCategory(category.key);
                    setMobileOpen(false);
                  }}
                  className={`py-4 px-6 text-left rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category.key
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-glass"
                      : "text-gray-600 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10"
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
