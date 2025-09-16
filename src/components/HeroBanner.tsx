import React from "react";
import { FlashIcon } from "./icons";

interface HeroBannerProps {
  onOpenProducts: () => void;
  onOpenOrderForm: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onOpenProducts,
  onOpenOrderForm,
}) => {
  return (
    <div className="relative overflow-hidden mx-4 mb-12">
      {/* Glassmorphism container */}
      <div className="glass rounded-4xl shadow-glass-xl backdrop-blur-4xl border border-white/30 hover:shadow-glass-xl transition-all duration-500">
        {/* Animated background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-purple-600/90 to-pink-600/90 rounded-4xl"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/20 to-transparent rounded-full -mr-48 -mt-48 animate-float"></div>
        <div
          className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-400/30 to-transparent rounded-full -ml-40 -mb-40 animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-bounce-soft"></div>

        {/* Additional sparkle effects */}
        <div className="absolute top-8 right-8 w-4 h-4 bg-white/40 rounded-full animate-ping"></div>
        <div
          className="absolute bottom-8 left-8 w-3 h-3 bg-yellow-300/60 rounded-full animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-2 h-2 bg-pink-300/50 rounded-full animate-bounce"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="relative px-6 py-10 md:px-10 md:py-16 z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <FlashIcon className="w-7 h-7 text-yellow-300 animate-bounce-soft drop-shadow-lg" />
                  <span className="text-sm font-black uppercase tracking-wider text-yellow-300 backdrop-blur-sm bg-yellow-400/30 px-4 py-2 rounded-full border border-yellow-300/30 shadow-glow-blue">
                    🔥 Flash Sale Hari Ini
                  </span>
                </div>

                <h1 className="text-4xl md:text-7xl font-black leading-tight mb-8 animate-slide-up drop-shadow-2xl">
                  Voucher & Top Up
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-orange-200 to-pink-200 animate-glow drop-shadow-none">
                    Super Hemat!
                  </span>
                </h1>

                <p className="text-xl md:text-3xl text-white/95 mb-10 font-semibold backdrop-blur-sm leading-relaxed drop-shadow-lg">
                  Dapatkan diskon hingga{" "}
                  <span className="text-yellow-300 font-black text-2xl md:text-4xl animate-pulse">
                    15%
                  </span>{" "}
                  untuk semua paket internet dan voucher game favorit kamu.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <button
                    onClick={onOpenProducts}
                    className="px-12 py-5 bg-white/95 backdrop-blur-sm text-gray-900 font-black rounded-3xl hover:bg-white transform hover:scale-105 transition-all duration-300 shadow-glass-lg hover:shadow-glass-xl text-lg border-2 border-white/20"
                  >
                    🎯 Lihat Penawaran
                  </button>
                  <button
                    onClick={onOpenOrderForm}
                    className="px-12 py-5 glass border-2 border-white/50 text-white font-black rounded-3xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm transform hover:scale-105 text-lg shadow-glass"
                  >
                    🛒 Mulai Belanja
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-3 glass px-4 py-2 rounded-full backdrop-blur-sm">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-glow-blue"></div>
                    <span className="text-white/95 font-semibold">
                      ⚡ Proses Instan
                    </span>
                  </div>
                  <div className="flex items-center gap-3 glass px-4 py-2 rounded-full backdrop-blur-sm">
                    <div
                      className="w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-glow-purple"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    <span className="text-white/95 font-semibold">
                      🕐 24/7 Support
                    </span>
                  </div>
                  <div className="flex items-center gap-3 glass px-4 py-2 rounded-full backdrop-blur-sm">
                    <div
                      className="w-3 h-3 bg-purple-400 rounded-full animate-pulse shadow-glow-blue"
                      style={{ animationDelay: "1s" }}
                    ></div>
                    <span className="text-white/95 font-semibold">
                      🛡️ Terpercaya
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1 max-w-md">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/40 to-orange-400/40 blur-3xl animate-glow"></div>
                  <div className="relative glass rounded-4xl p-10 border border-white/40 shadow-glass-xl animate-float hover:shadow-glass-xl transition-all duration-500">
                    <div className="text-center">
                      <div className="text-7xl font-black text-white mb-4 animate-bounce-soft drop-shadow-2xl">
                        15<span className="text-yellow-300">%</span>
                      </div>
                      <div className="text-white/95 text-lg font-bold mb-8 drop-shadow-lg">
                        Diskon Maksimal
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-white/20 rounded-full h-4 mb-8 overflow-hidden backdrop-blur-sm border border-white/30">
                        <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 h-4 rounded-full w-3/4 animate-pulse shadow-glow-blue relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                        </div>
                      </div>

                      <div className="text-sm text-white/90 font-bold backdrop-blur-sm bg-white/20 px-6 py-3 rounded-full border border-white/30 shadow-glass">
                        ⏰ Penawaran terbatas hari ini
                      </div>
                    </div>
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
