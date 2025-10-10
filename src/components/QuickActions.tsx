/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Wifi,
  Gamepad2,
  CreditCard,
  Heart,
  ShoppingCart,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { PRODUCTS } from "../data/products";

interface QuickActionsProps {
  onQuickSearch: (category: string, provider?: string) => void;
  onShowFavorites: () => void;
  onShowCart: () => void;
  selectedProducts: any[];
  favoriteProducts: any[];
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onQuickSearch,
  onShowFavorites,
  onShowCart,
  selectedProducts = [],
  favoriteProducts = [],
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const internetProviders = [
    ...new Set(
      PRODUCTS.filter((p) => p.category === "internet").map((p) => p.provider)
    ),
  ];
  const gameProviders = [
    ...new Set(
      PRODUCTS.filter((p) => p.category === "game").map((p) => p.provider)
    ),
  ];
  const ewalletProviders = [
    ...new Set(
      PRODUCTS.filter((p) => p.category === "ewallet").map((p) => p.provider)
    ),
  ];

  const handleSectionClick = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const handleProviderSelect = (provider: string, category: string) => {
    onQuickSearch(category, provider);
    setExpandedSection(null);
  };

  return (
    <div className="mb-8 space-y-4">
      {/* Main Categories */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {/* Internet */}
        <div className="relative">
          <button
            onClick={() => handleSectionClick("internet")}
            className="w-full p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Wifi className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1">
                Internet
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    expandedSection === "internet" ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
          </button>

          {/* Internet Providers Dropdown */}
          {expandedSection === "internet" && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 p-2 min-w-max">
              {internetProviders.map((provider) => (
                <button
                  key={provider}
                  onClick={() => handleProviderSelect(provider, "internet")}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors duration-150 flex items-center gap-2"
                >
                  <ChevronRight className="w-4 h-4 text-blue-500" />
                  {provider}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Games */}
        <div className="relative">
          <button
            onClick={() => handleSectionClick("game")}
            className="w-full p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1">
                Games
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    expandedSection === "game" ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
          </button>

          {/* Game Providers Dropdown */}
          {expandedSection === "game" && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 p-2 min-w-max">
              {gameProviders.map((provider) => (
                <button
                  key={provider}
                  onClick={() => handleProviderSelect(provider, "game")}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-colors duration-150 flex items-center gap-2"
                >
                  <ChevronRight className="w-4 h-4 text-purple-500" />
                  {provider}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* E-Wallet */}
        <div className="relative">
          <button
            onClick={() => handleSectionClick("ewallet")}
            className="w-full p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1">
                E-Wallet
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    expandedSection === "ewallet" ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
          </button>

          {/* E-Wallet Providers Dropdown */}
          {expandedSection === "ewallet" && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 p-2 min-w-max">
              {ewalletProviders.map((provider) => (
                <button
                  key={provider}
                  onClick={() => handleProviderSelect(provider, "ewallet")}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-xl transition-colors duration-150 flex items-center gap-2"
                >
                  <ChevronRight className="w-4 h-4 text-green-500" />
                  {provider}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Favorites */}
        <button
          onClick={onShowFavorites}
          className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200 group relative"
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="text-sm font-bold text-gray-900 dark:text-white">
              Favorit
            </div>
          </div>
          {favoriteProducts.length > 0 && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
              {favoriteProducts.length}
            </div>
          )}
        </button>

        {/* Cart */}
        <button
          onClick={onShowCart}
          className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200 group relative"
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div className="text-sm font-bold text-gray-900 dark:text-white">
              Keranjang
            </div>
          </div>
          {selectedProducts.length > 0 && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
              {selectedProducts.length}
            </div>
          )}
        </button>
      </div>
    </div>
  );
};
