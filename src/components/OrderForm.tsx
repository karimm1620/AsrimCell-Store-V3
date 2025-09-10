/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Product, CLASS_OPTIONS, formatRupiah } from '../data/products';
import { LoadingSpinner } from './LoadingSpinner';
import { EnhancedSelect } from './EnhancedSelect';
import { CreditCard, Banknote, GraduationCap } from 'lucide-react';

interface OrderFormProps {
  selectedProduct: Product | null;
  onSubmit: (orderData: any) => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({ selectedProduct, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    quantity: 1,
    paymentMethod: 'cash',
    classSelection: CLASS_OPTIONS[0],
    note: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPrice = selectedProduct ? selectedProduct.price * formData.quantity : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    setIsSubmitting(true);
    
    // Simulate form processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSubmit({
      product: selectedProduct,
      ...formData,
      total: totalPrice
    });
    
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Form Pemesanan
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Lengkapi data di bawah untuk melakukan pemesanan
        </p>
      </div>

      {selectedProduct && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
          <div className="flex items-center gap-3 mb-2">
            <img 
              src={selectedProduct.logo} 
              alt={selectedProduct.provider}
              className="w-10 h-10 object-contain bg-white rounded-lg p-1"
            />
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">
                {selectedProduct.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedProduct.provider} • {selectedProduct.desc}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
              Rp {formatRupiah(selectedProduct.price)}
            </span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white"
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Nomor WhatsApp
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white"
                placeholder="Contoh: 08123456789"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Jumlah
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', parseInt(e.target.value))}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Metode Pembayaran
              </label>
              <EnhancedSelect
                options={[
                  { 
                    value: 'cash', 
                    label: 'Cash (Bayar Langsung)', 
                    icon: <Banknote className="w-4 h-4 text-green-500" /> 
                  },
                  { 
                    value: 'transfer', 
                    label: 'Transfer Gopay & Dana', 
                    icon: <CreditCard className="w-4 h-4 text-blue-500" /> 
                  }
                ]}
                value={formData.paymentMethod}
                onChange={(value) => handleInputChange('paymentMethod', value)}
                placeholder="Pilih metode pembayaran"
                variant="card"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Kelas
              </label>
              <EnhancedSelect
                options={CLASS_OPTIONS.map(option => ({
                  value: option,
                  label: option,
                  icon: <GraduationCap className="w-4 h-4 text-purple-500" />
                }))}
                value={formData.classSelection}
                onChange={(value) => handleInputChange('classSelection', value)}
                placeholder="Pilih kelas Anda"
                variant="premium"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Catatan (Opsional)
              </label>
              <textarea
                value={formData.note}
                onChange={(e) => handleInputChange('note', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white resize-none"
                rows={3}
                placeholder="ID Game & Server (wajib untuk top up game)"
              />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              Rp {formatRupiah(selectedProduct?.price || 0)} x {formData.quantity}
            </span>
          </div>
          <div className="flex items-center justify-between text-xl font-bold">
            <span className="text-gray-900 dark:text-white">Total:</span>
            <span className="text-blue-600 dark:text-blue-400">
              Rp {formatRupiah(totalPrice)}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={!selectedProduct || isSubmitting}
            className="flex-1 py-4 px-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-xl transition-all duration-200 shadow-lg disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner size="sm" />
                <span>Memproses...</span>
              </>
            ) : (
              <span>Kirim ke WhatsApp</span>
            )}
          </button>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          🔒 Setelah klik "Kirim ke WhatsApp", Anda akan diarahkan ke WhatsApp dengan pesan yang sudah diformat otomatis
        </p>
      </form>
    </div>
  );
};