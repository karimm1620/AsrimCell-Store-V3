import React from 'react';
import { FlashIcon } from './icons';

interface HeroBannerProps {
  onOpenProducts: () => void;
  onOpenOrderForm: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onOpenProducts, onOpenOrderForm }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl mx-4 mb-8">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32"></div>
      
      <div className="relative px-6 py-8 md:px-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-white">
              <div className="flex items-center gap-2 mb-3">
                <FlashIcon className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-semibold uppercase tracking-wide text-yellow-400">
                  Flash Sale Hari Ini
                </span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
                Voucher & Top Up
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                  Super Hemat!
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 mb-6">
                Dapatkan diskon hingga 15% untuk semua paket internet dan voucher game favorit kamu.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onOpenProducts}
                  className="px-8 py-3 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Lihat Penawaran
                </button>
                <button
                  onClick={onOpenOrderForm}
                  className="px-8 py-3 bg-white/20 border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-200"
                >
                  Mulai Belanja
                </button>
              </div>
              
              <div className="flex items-center gap-6 mt-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white/80">Proses Instan</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-white/80">24/7 Support</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 max-w-md">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 blur-3xl"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">15%</div>
                    <div className="text-white/80 text-sm mb-4">Diskon Maksimal</div>
                    <div className="w-full bg-white/20 rounded-full h-2 mb-4">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full w-3/4 animate-pulse"></div>
                    </div>
                    <div className="text-xs text-white/60">Penawaran terbatas hari ini!</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};