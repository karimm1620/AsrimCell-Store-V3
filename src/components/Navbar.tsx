import React from "react";
import { MenuIcon, CloseIcon } from "./icons";
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
  const handleCategoryClick = (categoryId: string) => {
    onCategoryClick(categoryId);
    setMobileOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 transition-all duration-500 bg-codashop-deep-purple/95 backdrop-blur-xl shadow-2xl border-b border-primary-600/20">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => onCategoryClick("")}
            >
              {/* <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">A</span>
              </div> */}
              <div className="w-10 h-10 items-center justify-center rounded-xl shadow-lg">
                <img
                  className="w-10 h-10"
                  src="/assets/lock/docker_.png"
                  alt="logo"
                />
              </div>
              <div className="font-black text-2xl text-white">AsrimCell</div>
            </div>
            <div className="hidden sm:block text-sm text-gray-300 font-medium">
              • Voucher & Top Up Terpercaya
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="px-3 py-2 rounded-lg font-bold text-sm transition-all duration-300 transform hover:scale-105 flex items-center gap-2 bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden mt-4 p-4 bg-codashop-card-dark rounded-2xl shadow-2xl animate-slide-down backdrop-blur-2xl border border-primary-600/20">
            <div className="flex flex-col gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="py-3 px-4 text-left rounded-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center gap-3 text-gray-300 hover:bg-white/10 hover:text-white"
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
