import React from "react";
import { CategoryData, SubcategoryData } from "../types/category";
import { ArrowLeft } from "lucide-react";

interface CategoryPageProps {
  category: CategoryData;
  onBack: () => void;
  onSubcategoryClick: (subcategoryId: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  category,
  onBack,
  onSubcategoryClick,
}) => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white dark:text-white light:text-light-text-primary hover:text-primary-400 transition-colors mb-8 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali</span>
        </button>

        <div className="mb-12 animate-fade-in">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{category.icon}</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white dark:text-white light:text-light-text-primary title-responsive">
                {category.name}
              </h1>
              <p className="text-lg text-gray-300 dark:text-gray-300 light:text-light-text-secondary mt-2 text-responsive">
                {category.description}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-scale-in">
          {category.subcategories.map(
            (subcategory: SubcategoryData, index: number) => (
              <button
                key={subcategory.id}
                onClick={() => onSubcategoryClick(subcategory.id)}
                className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl card-dark light:card-light"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-primary-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative p-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-xl overflow-hidden bg-white/10 dark:bg-white/10 light:bg-gray-100 ring-2 ring-white/10 dark:ring-white/10 light:ring-gray-200 group-hover:ring-primary-400 transition-all">
                    <img
                      src={subcategory.icon}
                      alt={subcategory.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-white dark:text-white light:text-light-text-primary mb-2 text-responsive">
                    {subcategory.name}
                  </h3>

                  <p className="text-sm text-gray-300 dark:text-gray-300 light:text-light-text-secondary mb-4 text-responsive">
                    {subcategory.products.length} Produk
                  </p>

                  <div className="flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-primary-400 dark:text-primary-400 light:text-primary-600 transform group-hover:translate-x-1 transition-transform duration-300"
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
            )
          )}
        </div>
      </div>
    </div>
  );
};
