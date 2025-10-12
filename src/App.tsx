/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./components/HomePage";
import { CategoryPage } from "./components/CategoryPage";
import { SubcategoryPage } from "./components/SubcategoryPage";
import { MinimalistLoader } from "./components/MinimalistLoader";
import {
  NotificationSystem,
  useNotifications,
} from "./components/NotificationSystem";
import { InstagramIcon } from "./components/icons";
import {
  CATEGORIES,
  getCategoryById,
  getSubcategoryById,
} from "./data/categories";
import { formatRupiah, Telepon_Admin } from "./data/products";
import { NavigationState } from "./types/category";

declare global {
  interface Window {
    Swal: any;
  }
}

function ErrorFallback({
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-codashop-dark-bg dark:bg-codashop-dark-bg light:bg-light-bg">
      <div className="text-center p-8 max-w-md mx-auto card-dark light:card-light rounded-2xl">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-white dark:text-white light:text-light-text-primary mb-4">
          Oops! Something went wrong
        </h2>
        <p className="text-gray-300 dark:text-gray-300 light:text-light-text-secondary mb-6 text-responsive">
          The application encountered an error. Please try refreshing the page.
        </p>
        <div className="space-y-3">
          <button
            onClick={resetErrorBoundary}
            className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
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
      </div>
    </div>
  );
}

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [navigation, setNavigation] = useState<NavigationState>({
    view: "home",
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const { notifications, removeNotification } = useNotifications();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);
      } catch (error) {
        console.error("App initialization error:", error);
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    document.title = "AsrimCell - Voucher & Top Up Terpercaya";
    document.body.style.backgroundColor = "";
    document.body.style.minHeight = "100vh";
  }, []);

  const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      cash: "Cash (Bayar Langsung)",
      gopay: "GoPay",
      dana: "DANA",
      ovo: "OVO",
      shopeepay: "ShopeePay",
    };
    return labels[method] || method;
  };

  const handleOrderSubmit = async (orderData: any) => {
    const { product, name, phone, quantity, paymentMethod, note, total } =
      orderData;

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
      `💳 Pembayaran: ${getPaymentMethodLabel(paymentMethod)}`,
      note ? `📝 Catatan: ${note}` : "",
      "",
      "Mohon konfirmasi pesanan saya. Terima kasih! 🙏",
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${Telepon_Admin}&text=${encodeURIComponent(
      message
    )}`;

    if (window.Swal) {
      const result = await window.Swal.fire({
        title: "<strong>📋 Konfirmasi Pesanan Anda</strong>",
        html: `
          <div style="text-align: left; background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); padding: 20px; border-radius: 15px; border: 2px solid #e9ecef; margin: 10px 0;">
            <div style="background: white; padding: 15px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); margin-bottom: 15px;">
              <h3 style="margin: 0 0 10px 0; color: #495057; font-size: 14px; font-weight: 600; border-bottom: 2px solid #6242FC; padding-bottom: 8px;">📦 Detail Produk</h3>
              <p style="margin: 5px 0; color: #212529; font-weight: 600; font-size: 15px;">📱 ${
                product.name
              }</p>
              <p style="margin: 5px 0; color: #6c757d; font-size: 13px;">🏢 Provider: ${
                product.provider
              }</p>
              <p style="margin: 5px 0; color: #6c757d; font-size: 13px;">📝 ${
                product.desc
              }</p>
              <p style="margin: 5px 0; color: #6c757d; font-size: 13px;">📊 Jumlah: <strong style="color: #212529;">${quantity} item</strong></p>
            </div>

            <div style="background: white; padding: 15px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); margin-bottom: 15px;">
              <h3 style="margin: 0 0 10px 0; color: #495057; font-size: 14px; font-weight: 600; border-bottom: 2px solid #6242FC; padding-bottom: 8px;">👤 Data Pemesan</h3>
              <p style="margin: 5px 0; color: #212529; font-size: 13px;">Nama: <strong>${name}</strong></p>
              <p style="margin: 5px 0; color: #212529; font-size: 13px;">No HP: <strong>${phone}</strong></p>
              <p style="margin: 5px 0; color: #212529; font-size: 13px;">💳 Pembayaran: <strong style="color: #6242FC;">${getPaymentMethodLabel(
                paymentMethod
              )}</strong></p>
              ${
                note
                  ? `<p style="margin: 5px 0; color: #212529; font-size: 13px;">📝 Catatan: <em>${note}</em></p>`
                  : ""
              }
            </div>

            <div style="background: linear-gradient(135deg, #6242FC 0%, #8142ff 100%); padding: 15px; border-radius: 10px; text-align: center;">
              <p style="margin: 0; color: white; font-size: 13px; font-weight: 500;">Total Pembayaran</p>
              <p style="margin: 5px 0 0 0; color: white; font-size: 24px; font-weight: 700;">Rp ${formatRupiah(
                total
              )}</p>
            </div>

            <div style="margin-top: 15px; padding: 10px; background: #e7f3ff; border-left: 4px solid #0d6efd; border-radius: 5px;">
              <p style="margin: 0; color: #084298; font-size: 12px;">💡 <strong>Info:</strong> Setelah klik tombol di bawah, Anda akan diarahkan ke WhatsApp untuk menyelesaikan transaksi dengan admin kami.</p>
            </div>
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: "📱 Lanjut ke WhatsApp",
        cancelButtonText: "❌ Batal",
        confirmButtonColor: "#25D366",
        cancelButtonColor: "#6c757d",
        width: 650,
        customClass: {
          popup: "swal-popup-custom",
          title: "swal-title-custom",
          confirmButton: "swal-confirm-custom",
          cancelButton: "swal-cancel-custom",
        },
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
      window.open(whatsappUrl, "_blank");
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setNavigation({ view: "category", categoryId });
    setMobileOpen(false);
  };

  const handleSubcategoryClick = (subcategoryId: string) => {
    if (navigation.categoryId) {
      setNavigation({
        view: "subcategory",
        categoryId: navigation.categoryId,
        subcategoryId,
      });
    }
  };

  const handleBackToHome = () => {
    setNavigation({ view: "home" });
  };

  const handleBackToCategory = () => {
    if (navigation.categoryId) {
      setNavigation({ view: "category", categoryId: navigation.categoryId });
    }
  };

  if (isLoading) {
    return <MinimalistLoader />;
  }

  const currentCategory = navigation.categoryId
    ? getCategoryById(navigation.categoryId)
    : null;
  const currentSubcategory =
    navigation.categoryId && navigation.subcategoryId
      ? getSubcategoryById(navigation.categoryId, navigation.subcategoryId)
      : null;

  return (
    <div className="min-h-screen bg-codashop-dark-bg dark:bg-codashop-dark-bg light:bg-light-bg transition-all duration-500 scroll-smooth">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-codashop-deep-purple via-codashop-dark-bg to-black dark:from-codashop-deep-purple dark:via-codashop-dark-bg dark:to-black light:from-white light:via-light-bg light:to-gray-100"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary-600/10 to-primary-700/10 dark:from-primary-600/10 dark:to-primary-700/10 light:from-primary-200/30 light:to-primary-300/30 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-primary-500/10 to-secondary-500/10 dark:from-primary-500/10 dark:to-secondary-500/10 light:from-primary-200/30 light:to-secondary-200/30 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary-600/5 dark:bg-primary-600/5 light:bg-primary-200/20 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>

      <div className="relative z-10">
        <NotificationSystem
          notifications={notifications}
          onRemove={removeNotification}
        />

        <Navbar
          categories={CATEGORIES}
          onCategoryClick={handleCategoryClick}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        <main>
          {navigation.view === "home" && (
            <HomePage onCategoryClick={handleCategoryClick} />
          )}

          {navigation.view === "category" && currentCategory && (
            <CategoryPage
              category={currentCategory}
              onBack={handleBackToHome}
              onSubcategoryClick={handleSubcategoryClick}
            />
          )}

          {navigation.view === "subcategory" &&
            currentCategory &&
            currentSubcategory && (
              <SubcategoryPage
                subcategory={currentSubcategory}
                categoryName={currentCategory.name}
                onBack={handleBackToCategory}
                onOrderSubmit={handleOrderSubmit}
              />
            )}
        </main>

        <footer className="relative py-16 overflow-hidden bg-gradient-to-br from-codashop-deep-purple via-codashop-card-dark to-codashop-deep-purple dark:from-codashop-deep-purple dark:via-codashop-card-dark dark:to-codashop-deep-purple light:from-gray-50 light:via-white light:to-gray-100 border-t border-primary-600/20 dark:border-primary-600/20 light:border-light-border">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-500/10 to-primary-600/10 dark:from-primary-500/10 dark:to-primary-600/10 light:from-primary-200/30 light:to-primary-300/30 rounded-full blur-3xl animate-float"></div>
            <div
              className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-primary-500/10 to-secondary-500/10 dark:from-primary-500/10 dark:to-secondary-500/10 light:from-primary-200/30 light:to-secondary-200/30 rounded-full blur-3xl animate-float"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  {/* <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 dark:from-primary-600 dark:to-primary-700 light:from-primary-500 light:to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">A</span>
                  </div> */}
                  <div className="w-12 h-12 items-center justify-center rounded-xl shadow-lg">
                <img className="w-12 h-12" src="/assets/lock/docker_.png" alt="logo" />
              </div>
                  <div className="font-black text-3xl text-white dark:text-white light:text-light-text-primary">
                    AsrimCell
                  </div>
                </div>
                <p className="text-gray-200 dark:text-gray-200 light:text-light-text-secondary mb-6 max-w-md font-medium text-lg leading-relaxed text-responsive">
                  Platform voucher dan top up terpercaya dengan layanan 24/7.
                  Dapatkan paket internet, voucher game, dan top up e-wallet
                  dengan harga terbaik.
                </p>

                <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white dark:text-white light:text-light-text-primary font-medium text-sm">
                      Proses Instan
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    <span className="text-white dark:text-white light:text-light-text-primary font-medium text-sm">
                      24/7 Support
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"
                      style={{ animationDelay: "1s" }}
                    ></div>
                    <span className="text-white dark:text-white light:text-light-text-primary font-medium text-sm">
                      Terpercaya
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 md:gap-6">
                  <a
                    href="https://instagram.com/rimmzz__"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white dark:text-white light:text-light-text-primary hover:text-primary-400 dark:hover:text-primary-400 light:hover:text-primary-600 transition-all duration-300"
                  >
                    <InstagramIcon className="w-5 h-5" />
                    <span className="font-medium text-sm md:text-base">
                      @rimmzz__
                    </span>
                  </a>
                  <a
                    href="https://instagram.com/uus_dreamer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white dark:text-white light:text-light-text-primary hover:text-primary-400 dark:hover:text-primary-400 light:hover:text-primary-600 transition-all duration-300"
                  >
                    <InstagramIcon className="w-5 h-5" />
                    <span className="font-medium text-sm md:text-base">
                      @uus_dreamer
                    </span>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="font-black text-xl mb-6 text-white dark:text-white light:text-light-text-primary">
                  Layanan Kami
                </h3>
                <ul className="space-y-3 text-white dark:text-white light:text-light-text-primary">
                  <li
                    className="flex items-center gap-2 hover:text-primary-400 dark:hover:text-primary-400 light:hover:text-primary-600 transition-colors duration-300 cursor-pointer"
                    onClick={() => handleCategoryClick("internet")}
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="font-medium text-responsive">
                      Paket Internet
                    </span>
                  </li>
                  <li
                    className="flex items-center gap-2 hover:text-primary-400 dark:hover:text-primary-400 light:hover:text-primary-600 transition-colors duration-300 cursor-pointer"
                    onClick={() => handleCategoryClick("game")}
                  >
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="font-medium text-responsive">
                      Voucher Game
                    </span>
                  </li>
                  <li
                    className="flex items-center gap-2 hover:text-primary-400 dark:hover:text-primary-400 light:hover:text-primary-600 transition-colors duration-300 cursor-pointer"
                    onClick={() => handleCategoryClick("ewallet")}
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="font-medium text-responsive">
                      Top Up E-Wallet
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-black text-xl mb-6 text-white dark:text-white light:text-light-text-primary">
                  Hubungi Kami
                </h3>
                <ul className="space-y-3 text-white dark:text-white light:text-light-text-primary">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="font-medium text-responsive">
                      WhatsApp: 0857-8258-0079
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="font-medium text-responsive">
                      WhatsApp: 0888-804-2365
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    <span className="font-medium text-responsive">
                      Layanan 24/7
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                      style={{ animationDelay: "1s" }}
                    ></div>
                    <span className="font-medium text-responsive">
                      Respon Cepat
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 dark:border-white/10 light:border-light-border mt-12 pt-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <p className="text-white dark:text-white light:text-light-text-primary font-medium">
                    &copy; {new Date().getFullYear()} AsrimCell. All rights
                    reserved.
                  </p>
                  <p className="text-gray-200 dark:text-gray-200 light:text-light-text-secondary text-sm mt-1">
                    Platform voucher dan top up terpercaya di Indonesia
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="px-4 py-2 rounded-full bg-white/10 dark:bg-white/10 light:bg-gray-200 hidden">
                    <span className="text-sm font-medium text-white dark:text-white light:text-light-text-primary">
                      Made with ❤️ in Indonesia
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
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
