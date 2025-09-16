import React from "react";
import { HeartIcon, InternetIcon, GameIcon } from "./icons";
import { useFavorites } from "../hooks/useFavorites";

interface Product {
  id: number;
  category: string;
  provider: string;
  name: string;
  price: number;
  desc: string;
  logo: string;
}

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const formatRupiah = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isSelected,
  onSelect,
  onAddToCart,
}) => {
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <div className="group relative glass dark:glass-dark rounded-3xl p-6 shadow-glass border border-white/20 dark:border-white/10 hover:shadow-glass-xl hover:shadow-blue-500/20 dark:hover:shadow-purple-500/20 transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 animate-scale-in backdrop-blur-xl">
      {/* Favorite Button */}
      <button
        onClick={() => toggleFavorite(product.id)}
        className="absolute top-2 right-2 p-2 rounded-full glass dark:glass-dark hover:shadow-glass transition-all duration-300 z-10 transform hover:scale-110 opacity-80 hover:opacity-100"
        aria-label="Toggle favorite"
      >
        <HeartIcon
          className={`w-4 h-4 ${
            isFavorite(product.id)
              ? "text-red-500"
              : "text-gray-400 dark:text-gray-500"
          }`}
          filled={isFavorite(product.id)}
        />
      </button>

      {/* Provider Logo */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 glass dark:glass-dark rounded-2xl p-3 flex items-center justify-center shadow-inner-glass">
          <img
            src={product.logo}
            alt={product.provider}
            className="max-w-full max-h-full object-contain filter drop-shadow-sm"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 dark:text-white text-xl leading-tight truncate">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 truncate font-medium">
            {product.provider}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 line-clamp-2 font-medium">
        {product.desc}
      </p>

      {/* Category Badge */}
      <div className="flex items-center gap-2 mb-4">
        {product.category === "game" ? (
          <div className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-600 dark:text-purple-400 rounded-full text-xs font-bold backdrop-blur-sm border border-purple-500/20">
            <GameIcon className="w-3 h-3" />
            <span>Game</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold backdrop-blur-sm border border-blue-500/20">
            <InternetIcon className="w-3 h-3" />
            <span>Internet</span>
          </div>
        )}
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Rp {formatRupiah(product.price)}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onSelect(product)}
          className={`flex-1 py-3 px-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 ${
            isSelected
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-glass hover:shadow-glass-lg"
              : "glass dark:glass-dark text-gray-700 dark:text-gray-300 hover:shadow-glass"
          }`}
        >
          {isSelected ? "Dipilih" : "Pilih"}
        </button>
        <button
          onClick={() => onAddToCart(product)}
          className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-glass hover:shadow-glass-lg transform hover:scale-105"
        >
          Beli
        </button>
      </div>

      {/* Popular Badge */}
      {product.id % 3 === 0 && (
        <div className="absolute -top-2 -left-2">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-2 rounded-2xl shadow-glass backdrop-blur-sm border border-yellow-300/30">
            Popular
          </div>
        </div>
      )}

      {/* Glassmorphism overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};
