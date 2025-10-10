import React from "react";
import { CATEGORIES } from "../data/categories";
import { CategoryData } from "../types/category";

interface HomePageProps {
  onCategoryClick: (categoryId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onCategoryClick }) => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-black text-white dark:text-white light:text-light-text-primary mb-4 title-responsive">
            Selamat Datang di AsrimCell
          </h1>
          <p className="text-lg md:text-xl text-gray-300 dark:text-gray-300 light:text-light-text-secondary font-medium text-responsive">
            Platform voucher dan top up terpercaya dengan layanan 24/7
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 animate-scale-in">
          {CATEGORIES.map((category: CategoryData, index: number) => (
            <button
              key={category.id}
              onClick={() => onCategoryClick(category.id)}
              className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl card-dark light:card-light"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-primary-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative p-6 md:p-8">
                <div className="text-4xl md:text-6xl mb-4 md:mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>

                <h2 className="text-lg md:text-2xl font-black text-white dark:text-white light:text-light-text-primary mb-2 md:mb-3 title-responsive">
                  {category.name}
                </h2>

                <p className="text-sm md:text-base text-gray-300 dark:text-gray-300 light:text-light-text-secondary mb-4 md:mb-6 text-responsive">
                  {category.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-primary-400 dark:text-primary-400 light:text-primary-600 text-responsive">
                    {category.subcategories.length} Provider
                  </span>
                  <svg
                    className="w-6 h-6 text-primary-400 dark:text-primary-400 light:text-primary-600 transform group-hover:translate-x-2 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
          <div className="card-dark light:card-light rounded-2xl p-6">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-white dark:text-white light:text-light-text-primary mb-2">
              Proses Cepat
            </h3>
            <p className="text-gray-300 dark:text-gray-300 light:text-light-text-secondary text-responsive">
              Transaksi diproses dalam hitungan detik
            </p>
          </div>

          <div className="card-dark light:card-light rounded-2xl p-6">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold text-white dark:text-white light:text-light-text-primary mb-2">
              Aman & Terpercaya
            </h3>
            <p className="text-gray-300 dark:text-gray-300 light:text-light-text-secondary text-responsive">
              Keamanan data dan transaksi terjamin
            </p>
          </div>

          <div className="card-dark light:card-light rounded-2xl p-6">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-bold text-white dark:text-white light:text-light-text-primary mb-2">
              Support 24/7
            </h3>
            <p className="text-gray-300 dark:text-gray-300 light:text-light-text-secondary text-responsive">
              Admin support siap membantu kapan saja
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
