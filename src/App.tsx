/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
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

function AppContent() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const productsRef = useRef<HTMLDivElement>(null);
  const orderFormRef = useRef<HTMLDivElement>(null);

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
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-8 md:py-16">
          <HeroBanner
            onOpenProducts={scrollToProducts}
            onOpenOrderForm={scrollToOrderForm}
          />
        </section>

        {/* Products Section */}
        <section ref={productsRef} className="py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {selectedCategory === "all"
                  ? "Semua Produk"
                  : selectedCategory === "internet"
                  ? "Paket Internet"
                  : "Voucher Game"}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Pilih paket terbaik dengan harga yang kompetitif
              </p>
            </div>

            <SearchBar
              search={search}
              setSearch={setSearch}
              onFilterClick={() => {}}
            />

            {isLoading ? (
              <div className="flex justify-center py-20">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                  <div className="text-center py-20">
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
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg"
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
        <section ref={orderFormRef} className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4">
            <OrderForm
              selectedProduct={selectedProduct}
              onSubmit={handleOrderSubmit}
            />
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Testimoni Pelanggan
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Salman Alfarissi",
                  text: "Harga terjangkau dan admin responsif. Sudah langganan di sini dari awal buka.",
                  rating: 5,
                },
                {
                  name: "Bayu Febrian",
                  text: "Pelayanan sangat cepat dan voucher langsung aktif! Recommended banget buat yang butuh top up cepat.",
                  rating: 5,
                },
                {
                  name: "Rohman",
                  text: "Proses order mudah via WhatsApp, pembayaran fleksibel. Paket internet murah dan berkualitas.",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    - {testimonial.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 dark:bg-black text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  {/* <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">A</span>
                  </div> */}
                  <div className='w-10 h-10 rounded-lg flex items-center justify-center'>
                <img src="/assets/logos/logo cell.png" alt="" />
              </div>
                  <div className="font-bold text-2xl">AsrimCell</div>
                </div>
                <p className="text-gray-400 mb-4 max-w-md">
                  Platform voucher dan top up terpercaya dengan layanan 24/7.
                  Dapatkan paket internet dan voucher game dengan harga terbaik.
                </p>
                <div className="flex items-center gap-4">
                  <a
                    href="https://instagram.com/rimmzz__"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <InstagramIcon />
                    <span>@rimmzz__</span>
                  </a>
                  <a
                    href="https://instagram.com/uus_dreamer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <InstagramIcon />
                    <span>@uus_dreamer</span>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">Layanan</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>Paket Internet</li>
                  <li>Voucher Game</li>
                  <li>Top Up Mobile Legends</li>
                  <li>Top Up Free Fire</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">Kontak</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>WhatsApp: 0888-8042-365</li>
                  <li>WhatsApp: 0857-8258-0079</li>
                  <li>Layanan 24/7</li>
                  <li>Respon Cepat</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>
                &copy; {new Date().getFullYear()} AsrimCell. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
