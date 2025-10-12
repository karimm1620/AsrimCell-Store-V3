import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { SunIcon, MoonIcon, MenuIcon, CloseIcon } from "./icons";
import { ToggleSwitch } from "./ToggleSwitch";
import { CategoryData } from "../types/category";

interface NavbarProps {
  categories: CategoryData[];
  onCategoryClick: (categoryId: string) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  categories,
  onCategoryClick,
  mobileOpen,
  setMobileOpen,
}) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  const handleCategoryClick = (categoryId: string) => {
    onCategoryClick(categoryId);
    setMobileOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 transition-all duration-500 bg-codashop-deep-purple/95 dark:bg-codashop-deep-purple/95 light:bg-white/95 backdrop-blur-xl shadow-2xl border-b border-primary-600/20 dark:border-primary-600/20 light:border-light-border">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => onCategoryClick("")}
            >
              {/* <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 dark:from-primary-600 dark:to-primary-700 light:from-primary-500 light:to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">A</span>
              </div> */}
              <div className="w-10 h-10 items-center justify-center rounded-xl shadow-lg">
                <img className="w-10 h-10" src="/assets/lock/docker_.png" alt="logo" />
              </div>
              <div className="font-black text-2xl text-white dark:text-white light:text-light-text-primary">
                AsrimCell
              </div>
            </div>
            <div className="hidden sm:block text-sm text-gray-300 dark:text-gray-300 light:text-light-text-secondary font-medium">
              • Voucher & Top Up Terpercaya
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="px-3 py-2 rounded-lg font-bold text-sm transition-all duration-300 transform hover:scale-105 flex items-center gap-2 bg-white/10 dark:bg-white/10 light:bg-gray-100 text-gray-300 dark:text-gray-300 light:text-light-text-primary hover:bg-white/20 dark:hover:bg-white/20 light:hover:bg-primary-100 hover:text-white dark:hover:text-white light:hover:text-primary-600"
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-white/10 dark:bg-white/10 light:bg-gray-200 rounded-full p-1">
              <SunIcon className="w-4 h-4 text-secondary-500 dark:text-secondary-500 light:text-yellow-600" />
              <ToggleSwitch
                checked={isDarkMode}
                onChange={toggleDarkMode}
                size="sm"
                variant="premium"
              />
              <MoonIcon className="w-4 h-4 text-primary-400 dark:text-primary-400 light:text-primary-600" />
            </div>

            <button
              onClick={toggleDarkMode}
              className="sm:hidden p-3 rounded-xl bg-white/10 dark:bg-white/10 light:bg-gray-200 hover:bg-white/20 dark:hover:bg-white/20 light:hover:bg-gray-300 transition-all duration-300 transform hover:scale-110 relative group"
              aria-label="Toggle theme"
              title={
                isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
              }
            >
              {isDarkMode ? (
                <MoonIcon className="w-5 h-5 text-primary-400" />
              ) : (
                <SunIcon className="w-5 h-5 text-yellow-600" />
              )}
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {isDarkMode ? "Dark" : "Light"}
              </span>
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-3 rounded-xl bg-white/10 dark:bg-white/10 light:bg-gray-200 hover:bg-white/20 dark:hover:bg-white/20 light:hover:bg-gray-300 transition-all duration-300 transform hover:scale-110"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden mt-4 p-4 bg-codashop-card-dark dark:bg-codashop-card-dark light:bg-white rounded-2xl shadow-2xl animate-slide-down backdrop-blur-2xl border border-primary-600/20 dark:border-primary-600/20 light:border-light-border">
            <div className="flex flex-col gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="py-3 px-4 text-left rounded-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center gap-3 text-gray-300 dark:text-gray-300 light:text-light-text-primary hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-primary-50 hover:text-white dark:hover:text-white light:hover:text-primary-600"
                >
                  <span className="text-xl">{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
