import React from "react";
import { ShoppingCart, Star, Tag } from "lucide-react";

interface Product {
  id: number;
  category: string;
  provider: string;
  name: string;
  price: number;
  desc: string;
  logo: string;
  popular?: boolean;
  discount?: number;
}

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onSelect: (product: Product | null) => void;
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
  const getCategoryColor = () => {
    switch (product.category) {
      case "internet":
        return "from-blue-600 to-cyan-600";
      case "game":
        return "from-purple-600 to-pink-600";
      case "ewallet":
        return "from-green-600 to-emerald-600";
      case "pulsa":
        return "from-orange-600 to-yellow-600";
      default:
        return "from-gray-600 to-gray-700";
    }
  };

  const getCategoryBadge = () => {
    switch (product.category) {
      case "internet":
        return "bg-blue-600 text-white";
      case "game":
        return "bg-purple-600 text-white";
      case "ewallet":
        return "bg-green-600 text-white";
      case "pulsa":
        return "bg-orange-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  const originalPrice = product.discount
    ? Math.round(product.price / (1 - product.discount / 100))
    : null;

  return (
    <div className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-b from-codashop-card-dark to-codashop-deep-purple border border-primary-600/20">
      {/* Badges Container - Top Left & Top Right */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-start justify-between pointer-events-none">
        <div className="flex flex-col gap-2">
          {product.popular && (
            <div className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg pointer-events-auto">
              <Star className="w-3 h-3 fill-current" />
              <span>Popular</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 items-end">
          {product.discount && (
            <div className="flex items-center gap-1 bg-secondary-500 text-codashop-deep-purple text-xs font-bold px-3 py-1.5 rounded-full shadow-lg pointer-events-auto">
              <Tag className="w-3 h-3" />
              <span>{product.discount}% OFF</span>
            </div>
          )}
        </div>
      </div>

      {/* Product Image */}
      <div className="relative h-40 sm:h-48 bg-gradient-to-br from-codashop-deep-purple/50 to-codashop-card-dark/50 overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor()} opacity-20`}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <img
            src={product.logo}
            alt={product.provider}
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-xl shadow-2xl"
            loading="lazy"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category & Provider */}
        <div className="flex items-center justify-between gap-2">
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-md ${getCategoryBadge()}`}
          >
            {product.category === "internet"
              ? "Internet"
              : product.category === "game"
                ? "Game"
                : product.category === "pulsa"
                  ? "Pulsa"
                  : "E-Wallet"}
          </span>
          <span className="text-xs text-gray-300 font-bold">
            {product.provider}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-bold text-white text-sm leading-snug line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-400 line-clamp-2 min-h-[2.5rem]">
          {product.desc}
        </p>

        {/* Price Section */}
        <div className="pt-2">
          {originalPrice && (
            <div className="text-xs text-gray-500 line-through mb-1">
              Rp {formatRupiah(originalPrice)}
            </div>
          )}
          <div className="text-lg font-black text-secondary-500">
            Rp {formatRupiah(product.price)}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-3">
          <button
            onClick={() => onSelect(product)}
            className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all duration-300 transform hover:scale-105 ${
              isSelected
                ? "bg-green-600 hover:bg-green-700 text-white shadow-lg"
                : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
            }`}
          >
            {isSelected ? "✓ Dipilih" : "Pilih"}
          </button>

          <button
            onClick={() => onAddToCart(product)}
            className="p-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg transition-all duration-200 shadow-lg flex items-center justify-center"
            title="Add to cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
