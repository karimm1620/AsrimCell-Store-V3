/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { memo, useMemo, useCallback } from "react";
import { Product, CLASS_OPTIONS, formatRupiah } from "../data/products";
import { LoadingSpinner } from "./LoadingSpinner";
import { EnhancedSelect } from "./EnhancedSelect";
import { CreditCard, Banknote, GraduationCap } from "lucide-react";

interface OrderFormProps {
  selectedProduct: Product | null;
  onSubmit: (orderData: any) => void;
}

const OrderForm: React.FC<OrderFormProps> = memo(
  ({ selectedProduct, onSubmit }) => {
    const [formData, setFormData] = useState({
      name: "",
      phone: "",
      quantity: 1,
      paymentMethod: "cash",
      classSelection: CLASS_OPTIONS[0],
      note: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Memoize expensive calculations
    const totalPrice = useMemo(
      () => (selectedProduct ? selectedProduct.price * formData.quantity : 0),
      [selectedProduct, formData.quantity]
    );

    // Memoize payment options to prevent re-renders
    const paymentOptions = useMemo(
      () => [
        {
          value: "cash",
          label: "Cash (Bayar Langsung)",
          icon: <Banknote className="w-4 h-4 text-green-500" />,
        },
        {
          value: "transfer",
          label: "Transfer Bank",
          icon: <CreditCard className="w-4 h-4 text-blue-500" />,
        },
      ],
      []
    );

    // Memoize class options to prevent re-renders
    const classOptions = useMemo(
      () =>
        CLASS_OPTIONS.map((option) => ({
          value: option,
          label: option,
          icon: <GraduationCap className="w-4 h-4 text-purple-500" />,
        })),
      []
    );

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedProduct) return;

      setIsSubmitting(true);

      // Simulate form processing
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onSubmit({
        product: selectedProduct,
        ...formData,
        total: totalPrice,
      });

      setIsSubmitting(false);
    };

    // Optimize input change handler with useCallback
    const handleInputChange = useCallback((field: string, value: any) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }, []);

    return (
      <div className="glass dark:glass-dark rounded-4xl shadow-glass-xl p-4 sm:p-6 lg:p-8 border border-white/20 dark:border-white/10 backdrop-blur-xl animate-scale-in">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-3">
            Form Pemesanan
          </h2>
          <p className="text-gray-600 dark:text-gray-300 font-medium text-base sm:text-lg">
            Lengkapi data di bawah untuk melakukan pemesanan
          </p>
        </div>

        {selectedProduct && (
          <div className="mb-6 sm:mb-8 p-4 sm:p-6 glass rounded-3xl border border-blue-500/20 shadow-glass animate-slide-up relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={selectedProduct.logo}
                  alt={selectedProduct.provider}
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain glass rounded-2xl p-2 shadow-inner-glass"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg truncate">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium truncate">
                    {selectedProduct.provider} • {selectedProduct.desc}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Rp {formatRupiah(selectedProduct.price)}
                </span>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600 pb-2">
              📋 Informasi Pribadi
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-900 dark:text-white">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-purple-500/50 focus:border-blue-500/50 dark:focus:border-purple-500/50 focus:shadow-glass transition-all duration-300 text-gray-900 dark:text-white font-medium backdrop-blur-xl text-sm sm:text-base"
                  placeholder="Masukkan nama lengkap"
                  required
                  aria-describedby="name-help"
                />
                <p
                  id="name-help"
                  className="text-xs text-gray-500 dark:text-gray-400"
                >
                  Nama sesuai identitas untuk konfirmasi pesanan
                </p>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-900 dark:text-white">
                  Nomor WhatsApp *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-purple-500/50 focus:border-blue-500/50 dark:focus:border-purple-500/50 focus:shadow-glass transition-all duration-300 text-gray-900 dark:text-white font-medium backdrop-blur-xl text-sm sm:text-base"
                  placeholder="Contoh: 08123456789"
                  required
                  aria-describedby="phone-help"
                />
                <p
                  id="phone-help"
                  className="text-xs text-gray-500 dark:text-gray-400"
                >
                  Nomor aktif untuk konfirmasi via WhatsApp
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-900 dark:text-white">
                  Jumlah
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.quantity}
                  onChange={(e) =>
                    handleInputChange("quantity", parseInt(e.target.value))
                  }
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-purple-500/50 focus:border-blue-500/50 dark:focus:border-purple-500/50 focus:shadow-glass transition-all duration-300 text-gray-900 dark:text-white font-medium backdrop-blur-xl text-sm sm:text-base"
                  aria-describedby="quantity-help"
                />
                <p
                  id="quantity-help"
                  className="text-xs text-gray-500 dark:text-gray-400"
                >
                  Maksimal 10 item per transaksi
                </p>
              </div>
            </div>
          </div>

          {/* Payment & Class Information Section */}
          <div className="space-y-6 relative z-20">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600 pb-2">
              💳 Informasi Pembayaran & Kelas
            </h3>

            <div className="space-y-8">
              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-900 dark:text-white">
                  Metode Pembayaran
                </label>
                <div className="relative z-30">
                  <EnhancedSelect
                    options={paymentOptions}
                    value={formData.paymentMethod}
                    onChange={(value) =>
                      handleInputChange("paymentMethod", value)
                    }
                    placeholder="Pilih metode pembayaran"
                    variant="premium"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-900 dark:text-white">
                  Kelas
                </label>
                <div className="relative z-25">
                  <EnhancedSelect
                    options={classOptions}
                    value={formData.classSelection}
                    onChange={(value) =>
                      handleInputChange("classSelection", value)
                    }
                    placeholder="Pilih kelas Anda"
                    variant="premium"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="space-y-6 relative z-10 mt-8">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600 pb-2">
              📝 Catatan Tambahan
            </h3>

            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-900 dark:text-white">
                Catatan (Opsional)
              </label>
              <textarea
                value={formData.note}
                onChange={(e) => handleInputChange("note", e.target.value)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-purple-500/50 focus:border-blue-500/50 dark:focus:border-purple-500/50 focus:shadow-glass transition-all duration-300 text-gray-900 dark:text-white resize-none font-medium backdrop-blur-xl text-sm sm:text-base"
                rows={4}
                placeholder="ID Game & Server (wajib untuk top up game)"
                aria-describedby="note-help"
              />
              <p
                id="note-help"
                className="text-xs text-gray-500 dark:text-gray-400"
              >
                Untuk voucher game, mohon cantumkan ID Game dan Server yang
                valid
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="relative p-4 sm:p-6 lg:p-8 rounded-3xl overflow-hidden animate-slide-up">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl"></div>
            <div className="absolute inset-0 bg-white/70 dark:bg-gray-800/70 rounded-3xl border border-gray-200 dark:border-gray-600"></div>
            <div className="relative z-10">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                📊 Ringkasan Pesanan
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-200 font-medium text-sm sm:text-base">
                    Subtotal:
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">
                    Rp {formatRupiah(selectedProduct?.price || 0)} x{" "}
                    {formData.quantity}
                  </span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                  <div className="flex items-center justify-between text-lg sm:text-2xl font-black">
                    <span className="text-gray-900 dark:text-white">
                      Total:
                    </span>
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Rp {formatRupiah(totalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={!selectedProduct || isSubmitting}
              className="flex-1 py-4 sm:py-5 px-6 sm:px-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-3xl transition-all duration-300 shadow-glass hover:shadow-glass-lg disabled:cursor-not-allowed flex items-center justify-center gap-3 transform hover:scale-105 disabled:hover:scale-100 backdrop-blur-sm text-sm sm:text-base"
              aria-label="Kirim pesanan ke WhatsApp"
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>Memproses...</span>
                </>
              ) : (
                <span>📱 Kirim ke WhatsApp</span>
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">
              🔒 Setelah klik "Kirim ke WhatsApp", Anda akan diarahkan ke
              WhatsApp dengan pesan yang sudah diformat otomatis
            </p>
          </div>
        </form>
      </div>
    );
  }
);

OrderForm.displayName = "OrderForm";

export { OrderForm };
