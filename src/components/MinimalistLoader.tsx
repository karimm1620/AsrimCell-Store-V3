import React from "react";

export const MinimalistLoader: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 text-center px-4">
        <div className="mb-12 relative">
          <div className="relative inline-block">
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 dark:from-blue-500 dark:via-purple-500 dark:to-blue-600 flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <span className="text-white font-black text-5xl">A</span>
            </div>

            <div className="absolute -inset-4">
              <div
                className="absolute inset-0 border-4 border-blue-500/30 dark:border-blue-400/30 rounded-3xl animate-ping"
                style={{ animationDuration: "2s" }}
              ></div>
            </div>

            <div className="absolute -inset-2">
              <div
                className="w-full h-full border-2 border-purple-500/50 dark:border-purple-400/50 rounded-2xl animate-spin"
                style={{ animationDuration: "3s" }}
              ></div>
            </div>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent mb-4 animate-fade-in">
          AsrimCell
        </h1>

        <p
          className="text-lg md:text-xl text-slate-600 dark:text-slate-300 font-semibold mb-12 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          Menyiapkan pengalaman terbaik untuk Anda
        </p>

        <div className="max-w-xs mx-auto">
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
            <div className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-500 dark:via-purple-500 dark:to-blue-500 rounded-full animate-loading-bar shadow-lg"></div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto">
          <div
            className="text-center animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-400 dark:to-emerald-500 flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
              Cepat
            </span>
          </div>

          <div
            className="text-center animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 dark:from-blue-400 dark:to-cyan-500 flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
              Aman
            </span>
          </div>

          <div
            className="text-center animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 dark:from-purple-400 dark:to-pink-500 flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
              Terpercaya
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
