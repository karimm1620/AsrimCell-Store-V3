import React from "react";
import { Zap, Gift, CreditCard, ArrowRight, Star } from "lucide-react";

interface HeroBannerProps {
  onOpenProducts: () => void;
  onOpenOrderForm: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onOpenProducts,
  onOpenOrderForm,
}) => {
  return (
    <div className="relative overflow-hidden mx-4 mb-8">
      {/* Main Hero Card */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 dark:from-blue-700 dark:via-purple-700 dark:to-pink-700 rounded-3xl shadow-2xl overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24"></div>
        </div>

        <div className="relative px-6 py-8 md:px-8 md:py-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Content */}
              <div className="flex-1 text-white space-y-6">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold text-yellow-200">
                    AsrimCell V4 - Now Available!
                  </span>
                </div>

                {/* Main Title */}
                <div className="space-y-2">
                  <h1 className="text-4xl md:text-6xl font-black leading-tight">
                    Top Up
                    <span className="block text-yellow-200">Super Mudah!</span>
                  </h1>
                  <p className="text-lg md:text-xl text-white/90 font-medium max-w-lg">
                    Internet, Game, E-Wallet - Semua ada di satu tempat. Proses
                    instan, harga terbaik, terpercaya sejak 2020.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={onOpenProducts}
                    className="group flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded-2xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <span>Mulai Belanja</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                  <button
                    onClick={onOpenOrderForm}
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-2xl hover:bg-white/30 transition-all duration-200 border border-white/30"
                  >
                    <Star className="w-5 h-5" />
                    <span>Lihat Promo</span>
                  </button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-2">
                      <Zap className="w-6 h-6 text-yellow-300" />
                    </div>
                    <div className="text-sm font-bold">Proses Instan</div>
                    <div className="text-xs text-white/80">1-3 menit</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-2">
                      <Gift className="w-6 h-6 text-pink-300" />
                    </div>
                    <div className="text-sm font-bold">Bonus Poin</div>
                    <div className="text-xs text-white/80">
                      Setiap transaksi
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-2">
                      <CreditCard className="w-6 h-6 text-blue-300" />
                    </div>
                    <div className="text-sm font-bold">Aman 100%</div>
                    <div className="text-xs text-white/80">Terjamin</div>
                  </div>
                </div>
              </div>

              {/* Visual Element */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-40 h-40 md:w-48 md:h-48 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/20">
                    <div className="text-center">
                      <div className="text-5xl md:text-6xl font-black text-white mb-2">
                        V4
                      </div>
                      <div className="text-white/90 text-sm font-bold">
                        New Experience
                      </div>
                    </div>
                  </div>
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="text-2xl font-black text-blue-600 dark:text-blue-400">
            50K+
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
            Pelanggan
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="text-2xl font-black text-green-600 dark:text-green-400">
            99.9%
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
            Sukses Rate
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="text-2xl font-black text-purple-600 dark:text-purple-400">
            24/7
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
            Support
          </div>
        </div>
      </div>
    </div>
  );
};
