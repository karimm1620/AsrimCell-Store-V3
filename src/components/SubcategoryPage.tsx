import React, { useState } from 'react';
import { SubcategoryData } from '../types/category';
import { Product } from '../data/products';
import { ProductCard } from './ProductCard';
import { OrderForm } from './OrderForm';
import { ArrowLeft } from 'lucide-react';

interface SubcategoryPageProps {
  subcategory: SubcategoryData;
  categoryName: string;
  onBack: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onOrderSubmit: (orderData: any) => void;
}

export const SubcategoryPage: React.FC<SubcategoryPageProps> = ({
  subcategory,
  categoryName,
  onBack,
  onOrderSubmit
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = subcategory.products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setTimeout(() => {
      document.getElementById('order-form')?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }, 100);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white dark:text-white light:text-light-text-primary hover:text-primary-400 transition-colors mb-8 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali ke {categoryName}</span>
        </button>

        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/10 dark:bg-white/10 light:bg-gray-100 ring-2 ring-white/10 dark:ring-white/10 light:ring-gray-200">
              <img
                src={subcategory.icon}
                alt={subcategory.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white dark:text-white light:text-light-text-primary title-responsive">
                {subcategory.name}
              </h1>
              <p className="text-lg text-gray-300 dark:text-gray-300 light:text-light-text-secondary mt-1 text-responsive">
                {subcategory.products.length} produk tersedia
              </p>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 bg-white/10 dark:bg-white/10 light:bg-white border border-white/20 dark:border-white/20 light:border-light-border rounded-xl text-white dark:text-white light:text-light-text-primary placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-light-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-responsive"
            />
            <svg
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-400 light:text-light-text-secondary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12 animate-scale-in">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isSelected={selectedProduct?.id === product.id}
              onSelect={handleProductSelect}
              onAddToCart={handleProductSelect}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white dark:text-white light:text-light-text-primary mb-2">
              Produk tidak ditemukan
            </h3>
            <p className="text-gray-300 dark:text-gray-300 light:text-light-text-secondary text-responsive">
              Coba ubah kata kunci pencarian Anda
            </p>
          </div>
        )}

        {selectedProduct && (
          <div id="order-form" className="mt-12 animate-slide-up">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-black text-white dark:text-white light:text-light-text-primary mb-6 title-responsive">
                Form Pemesanan
              </h2>
              <OrderForm
                selectedProduct={selectedProduct}
                onSubmit={onOrderSubmit}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
