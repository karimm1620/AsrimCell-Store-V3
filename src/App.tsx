/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Navbar } from "./components/Navbar";
import { HeroBanner } from "./components/HeroBanner";
import { SearchBar } from "./components/SearchBar";
import { ProductCard } from "./components/ProductCard";
import { OrderForm } from "./components/OrderForm";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { InstagramIcon } from "./components/icons";
import {
  PRODUCTS,
  Product,
  formatRupiah,
  Telepon_Admin,
} from "./data/products";

// SweetAlert2 for notifications
declare global {
  interface Window {
    Swal: any;
  }
}

// Error Fallback Component
function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center p-8 max-w-md mx-auto">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Oops! Something went wrong
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The application encountered an error. Please try refreshing the page.
        </p>
        <div className="space-y-3">
          <button
            onClick={resetErrorBoundary}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
        <details className="mt-4 text-left">
          <summary className="cursor-pointer text-sm text-gray-500">
            Error Details
          </summary>
          <pre className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-auto">
            {error.message}
          </pre>
        </details>
      </div>
    </div>
  );
}

function AppContent() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const productsRef = useRef<HTMLDivElement>(null);
  const orderFormRef = useRef<HTMLDivElement>(null);

  // Initialize app and handle loading state
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Simulate app initialization
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (error) {
        console.error("App initialization error:", error);
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Filter products based on category and search
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchCategory =
      selectedCategory === "all" ? true : product.category === selectedCategory;
    const searchQuery = search.toLowerCase();
    const matchSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery) ||
      product.provider.toLowerCase().includes(searchQuery) ||
      product.desc.toLowerCase().includes(searchQuery);

    return matchCategory && matchSearch;
  });

  // Show limited products on mobile initially
  const visibleProducts = showAll
    ? filteredProducts
    : filteredProducts.slice(0, 8);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    // Show success notification
    if (window.Swal) {
      window.Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: `${product.name} dipilih`,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
    }
  };

  const handleAddToCart = (product: Product) => {
    setSelectedProduct(product);
    // Scroll to order form
    setTimeout(() => {
      orderFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);

    if (window.Swal) {
      window.Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: `${product.name} ditambahkan`,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
    }
  };

  const handleOrderSubmit = async (orderData: any) => {
    const {
      product,
      name,
      phone,
      quantity,
      paymentMethod,
      classSelection,
      note,
      total,
    } = orderData;

    if (!name.trim() || !phone.trim()) {
      if (window.Swal) {
        window.Swal.fire({
          icon: "warning",
          title: "Data Tidak Lengkap",
          text: "Mohon isi nama dan nomor WhatsApp dengan lengkap",
        });
      }
      return;
    }

    // Build WhatsApp message
    const message = [
      "Halo, saya ingin memesan:",
      "",
      `📱 Paket: ${product.name}`,
      `🏢 Provider: ${product.provider}`,
      `📝 Deskripsi: ${product.desc}`,
      `📊 Jumlah: ${quantity}`,
      `💰 Total: Rp ${formatRupiah(total)}`,
      "",
      "👤 Data Pemesan:",
      `Nama: ${name}`,
      `No HP: ${phone}`,
      `💳 Pembayaran: ${paymentMethod === "cash" ? "Cash" : "Transfer"}`,
      `🎓 Kelas: ${classSelection}`,
      note ? `📝 Catatan: ${note}` : "",
      "",
      "Mohon konfirmasi pesanan saya. Terima kasih! 🙏",
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${Telepon_Admin}&text=${encodeURIComponent(
      message
    )}`;

    // Show confirmation dialog
    if (window.Swal) {
      const result = await window.Swal.fire({
        title: "Konfirmasi Pesanan",
        html: `<div style="text-align: left; white-space: pre-wrap; font-family: monospace; font-size: 12px; max-height: 300px; overflow-y: auto;">${message.replace(
          /\n/g,
          "<br>"
        )}</div>`,
        showCancelButton: true,
        confirmButtonText: "📱 Kirim ke WhatsApp",
        cancelButtonText: "Batal",
        confirmButtonColor: "#25D366",
        width: 600,
      });

      if (result.isConfirmed) {
        window.open(whatsappUrl, "_blank");
        window.Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Pesanan dikirim ke WhatsApp",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      }
    } else {
      // Fallback if SweetAlert2 is not loaded
      window.open(whatsappUrl, "_blank");
    }
  };

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToOrderForm = () => {
    orderFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  // Load SweetAlert2
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Update page title
  useEffect(() => {
    document.title = "AsrimCell - Voucher & Top Up Terpercaya";

    // Ensure body has proper background
    document.body.style.backgroundColor = "";
    document.body.style.minHeight = "100vh";
  }, []);

  // Loading screen component
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center">
        <div className="text-center">
          {/* <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-glow-blue animate-glow mb-6 mx-auto">
            <span className="text-white font-bold text-2xl">A</span>
          </div> */}
          <div className="w-16 h-16 rounded-3xl flex items-center justify-center shadow-glow-blue animate-glow mb-6 mx-auto">
            <img
              className="w-14 h-14"
              src="/assets/logos/logo cell.png"
              alt=""
            />
          </div>
          <div className="font-bold text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            AsrimCell
          </div>
          <div className="text-gray-600 dark:text-gray-300 mb-6">
            Loading sabar ya guyss...
          </div>
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 transition-all duration-500 scroll-smooth">
      {/* Glassmorphism background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-2xl animate-bounce-soft"></div>
      </div>

      <div className="relative z-10">
        <Navbar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-8 md:py-16 animate-fade-in">
            <HeroBanner
              onOpenProducts={scrollToProducts}
              onOpenOrderForm={scrollToOrderForm}
            />
          </section>

          {/* Products Section */}
          <section ref={productsRef} className="py-8 animate-slide-up">
            <div className="max-w-7xl mx-auto px-4">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
                  {selectedCategory === "all"
                    ? "Semua Produk"
                    : selectedCategory === "internet"
                    ? "Paket Internet"
                    : "Voucher Game"}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
                  Pilih paket terbaik dengan harga yang kompetitif
                </p>
              </div>

              <SearchBar
                search={search}
                setSearch={setSearch}
                onFilterClick={() => setShowFilters(!showFilters)}
                showFilters={showFilters}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />

              {isLoading ? (
                <div className="flex justify-center py-20">
                  <LoadingSpinner size="lg" />
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-scale-in">
                    {visibleProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        isSelected={selectedProduct?.id === product.id}
                        onSelect={(p) => handleProductSelect(p as Product)}
                        onAddToCart={(p) => handleAddToCart(p as Product)}
                      />
                    ))}
                  </div>

                  {filteredProducts.length === 0 && (
                    <div className="text-center py-20 animate-fade-in">
                      <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">
                        🔍
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Produk tidak ditemukan
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Coba ubah kata kunci pencarian atau pilih kategori lain
                      </p>
                    </div>
                  )}

                  {!showAll &&
                    filteredProducts.length > visibleProducts.length && (
                      <div className="text-center mt-8">
                        <button
                          onClick={() => setShowAll(true)}
                          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 shadow-glass hover:shadow-glass-lg transform hover:scale-105 backdrop-blur-sm"
                        >
                          Lihat Semua (
                          {filteredProducts.length - visibleProducts.length}{" "}
                          lainnya)
                        </button>
                      </div>
                    )}
                </>
              )}
            </div>
          </section>

          {/* Order Form Section */}
          <section ref={orderFormRef} className="py-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-gray-800/50 dark:to-purple-900/50 backdrop-blur-3xl"></div>
            <div className="max-w-4xl mx-auto px-4">
              <OrderForm
                selectedProduct={selectedProduct}
                onSubmit={handleOrderSubmit}
              />
            </div>
          </section>

          {/* Testimonial Section */}
          <section className="py-16 animate-slide-up">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-12">
                Testimoni Pelanggan
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: "Bayu Firmansyah",
                    text: "Pelayanan sangat cepat dan voucher langsung aktif! Recommended banget buat yang butuh top up cepat.",
                    rating: 5,
                  },
                  {
                    name: "Salman Alfarissi",
                    text: "Harga terjangkau dan admin responsif. Sudah langganan di sini dari awal buka.",
                    rating: 5,
                  },
                  {
                    name: "M. Abdul Rohman",
                    text: "Proses order mudah via WhatsApp, pembayaran fleksibel. Paket internet murah dan berkualitas.",
                    rating: 5,
                  },
                ].map((testimonial, index) => (
                  <div
                    key={index}
                    className="glass dark:glass-dark p-6 rounded-2xl shadow-glass border border-white/20 dark:border-white/10 hover:shadow-glass-lg transition-all duration-300 transform hover:scale-105 animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i}>⭐</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-200 mb-4 italic font-medium">
                      "{testimonial.text}"
                    </p>
                    <div className="font-bold text-gray-900 dark:text-white">
                      - {testimonial.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="relative py-16 overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 dark:from-gray-800 dark:via-blue-800 dark:to-purple-800">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-full blur-3xl animate-float"></div>
              <div
                className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-500/10 to-pink-600/10 rounded-full blur-3xl animate-float"
                style={{ animationDelay: "2s" }}
              ></div>
            </div>

            {/* Glass overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent backdrop-blur-sm"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-3 mb-4">
                    {/* <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-glow-blue animate-glow">
                      <span className="text-white font-bold text-xl">A</span>
                    </div> */}
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-glow-blue animate-glow">
                      <img
                        className="w-10 h-10"
                        src="/assets/logos/logo cell.png"
                        alt="logo"
                      />
                    </div>
                    <div className="font-black text-3xl bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                      AsrimCell
                    </div>
                  </div>
                  <p className="text-gray-200 mb-6 max-w-md font-medium text-lg leading-relaxed">
                    Platform voucher dan top up terpercaya dengan layanan 24/7.
                    Dapatkan paket internet dan voucher game dengan harga
                    terbaik dan pelayanan terpercaya.
                  </p>

                  {/* Trust indicators */}
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-glow-blue"></div>
                      <span className="text-white font-medium text-sm">
                        Proses Instan
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-glow-purple"
                        style={{ animationDelay: "0.5s" }}
                      ></div>
                      <span className="text-white font-medium text-sm">
                        24/7 Support
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 bg-purple-400 rounded-full animate-pulse shadow-glow-blue"
                        style={{ animationDelay: "1s" }}
                      ></div>
                      <span className="text-white font-medium text-sm">
                        Terpercaya
                      </span>
                    </div>
                  </div>

                  {/* Social media links */}
                  <div className="flex items-center gap-6">
                    <a
                      href="https://instagram.com/rimmzz__"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-white hover:text-blue-200 transition-all duration-300 hover:scale-110 glass px-4 py-2 rounded-2xl hover:shadow-glass"
                    >
                      <InstagramIcon className="w-5 h-5" />
                      <span className="font-medium">@rimmzz__</span>
                    </a>
                    <a
                      href="https://instagram.com/uus_dreamer"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-white hover:text-blue-200 transition-all duration-300 hover:scale-110 glass px-4 py-2 rounded-2xl hover:shadow-glass"
                    >
                      <InstagramIcon className="w-5 h-5" />
                      <span className="font-medium">@uus_dreamer</span>
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="font-black text-xl mb-6 text-white">
                    Layanan Kami
                  </h3>
                  <ul className="space-y-3 text-white">
                    <li className="flex items-center gap-2 hover:text-blue-200 transition-colors duration-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="font-medium">Paket Internet</span>
                    </li>
                    <li className="flex items-center gap-2 hover:text-blue-200 transition-colors duration-300">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="font-medium">Voucher Game</span>
                    </li>
                    <li className="flex items-center gap-2 hover:text-blue-200 transition-colors duration-300">
                      <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                      <span className="font-medium">Top Up Mobile Legends</span>
                    </li>
                    <li className="flex items-center gap-2 hover:text-blue-200 transition-colors duration-300">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="font-medium">Top Up Free Fire</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-black text-xl mb-6 text-white">
                    Hubungi Kami
                  </h3>
                  <ul className="space-y-3 text-white">
                    <li className="flex items-center gap-2 hover:text-blue-200 transition-colors duration-300">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="font-medium">
                        WhatsApp: 0888-8042-365
                      </span>
                    </li>
                    <li className="flex items-center gap-2 hover:text-blue-200 transition-colors duration-300">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="font-medium">
                        WhatsApp: 0857-8258-0079
                      </span>
                    </li>
                    <li className="flex items-center gap-2 hover:text-blue-200 transition-colors duration-300">
                      <div
                        className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0.5s" }}
                      ></div>
                      <span className="font-medium">Layanan 24/7</span>
                    </li>
                    <li className="flex items-center gap-2 hover:text-blue-200 transition-colors duration-300">
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                        style={{ animationDelay: "1s" }}
                      ></div>
                      <span className="font-medium">Respon Cepat</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom section */}
              <div className="border-t border-white/10 mt-12 pt-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-center md:text-left">
                    <p className="text-white font-medium">
                      &copy; {new Date().getFullYear()} AsrimCell. All rights
                      reserved.
                    </p>
                    <p className="text-gray-200 text-sm mt-1">
                      Platform voucher dan top up terpercaya di Indonesia
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="glass px-4 py-2 rounded-full">
                      <span className="text-sm font-medium text-white">
                        Made with ❤️ by Immz
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error("Application Error:", error, errorInfo);
      }}
    >
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </ErrorBoundary>
  );
}
