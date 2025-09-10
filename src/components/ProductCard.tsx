import React from 'react';
import { HeartIcon, InternetIcon, GameIcon } from './icons';
import { useFavorites } from '../hooks/useFavorites';

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
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isSelected,
  onSelect,
  onAddToCart
}) => {
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-purple-500/10 transform hover:-translate-y-1 transition-all duration-300">
      {/* Favorite Button */}
      <button
        onClick={() => toggleFavorite(product.id)}
        className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 z-10"
        aria-label="Toggle favorite"
      >
        <HeartIcon 
          className={`w-5 h-5 ${isFavorite(product.id) ? 'text-red-500' : 'text-gray-400'}`}
          filled={isFavorite(product.id)}
        />
      </button>

      {/* Provider Logo */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 bg-gray-50 dark:bg-gray-700 rounded-xl p-2 flex items-center justify-center">
          <img 
            src={product.logo} 
            alt={product.provider} 
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight truncate">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
            {product.provider}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {product.desc}
      </p>

      {/* Category Badge */}
      <div className="flex items-center gap-2 mb-4">
        {product.category === 'game' ? (
          <div className="flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg text-xs font-medium">
            <GameIcon className="w-3 h-3" />
            <span>Game</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-medium">
            <InternetIcon className="w-3 h-3" />
            <span>Internet</span>
          </div>
        )}
      </div>

      {/* Price */}
      <div className="mb-5">
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          Rp {formatRupiah(product.price)}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onSelect(product)}
          className={`flex-1 py-2.5 px-4 rounded-xl font-semibold transition-all duration-200 ${
            isSelected
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {isSelected ? 'Dipilih' : 'Pilih'}
        </button>
        <button
          onClick={() => onAddToCart(product)}
          className="px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-green-600/25"
        >
          Beli
        </button>
      </div>

      {/* Popular Badge */}
      {product.id % 3 === 0 && (
        <div className="absolute -top-2 -left-2">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg">
            Popular
          </div>
        </div>
      )}
    </div>
  );
};