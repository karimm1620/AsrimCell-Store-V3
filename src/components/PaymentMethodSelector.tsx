import React from "react";
import { Banknote, Wallet, CreditCard } from "lucide-react";

export type PaymentMethod = "cash" | "gopay" | "dana" | "ovo" | "shopeepay";

interface PaymentMethodOption {
  id: PaymentMethod;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  logo?: string;
}

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
}

const paymentMethods: PaymentMethodOption[] = [
  {
    id: "cash",
    name: "Cash",
    icon: <Banknote className="w-5 h-5" />,
    color: "bg-green-600 hover:bg-green-700",
    description: "Bayar langsung ke admin via WhatsApp",
  },
  {
    id: "gopay",
    name: "GoPay",
    icon: <Wallet className="w-5 h-5" />,
    color: "bg-payment-gopay hover:bg-payment-gopay/90",
    description: "Transfer via aplikasi Gojek",
  },
  {
    id: "dana",
    name: "DANA",
    icon: <Wallet className="w-5 h-5" />,
    color: "bg-payment-dana hover:bg-payment-dana/90",
    description: "Transfer via aplikasi DANA",
  },
  {
    id: "ovo",
    name: "OVO",
    icon: <Wallet className="w-5 h-5" />,
    color: "bg-payment-ovo hover:bg-payment-ovo/90",
    description: "Transfer via aplikasi OVO",
  },
  {
    id: "shopeepay",
    name: "ShopeePay",
    icon: <CreditCard className="w-5 h-5" />,
    color: "bg-payment-shopeepay hover:bg-payment-shopeepay/90",
    description: "Transfer via aplikasi Shopee",
  },
];

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onMethodChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {paymentMethods.map((method) => {
          const isSelected = selectedMethod === method.id;

          return (
            <button
              key={method.id}
              type="button"
              onClick={() => onMethodChange(method.id)}
              className={`relative p-4 rounded-xl transition-all duration-300 text-left ${
                isSelected
                  ? `${method.color} text-white shadow-lg ring-2 ring-white/50 transform scale-105`
                  : "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    isSelected ? "bg-white/20" : "bg-white/10"
                  }`}
                >
                  {method.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm">{method.name}</span>
                    {isSelected && <span className="text-xs">✓</span>}
                  </div>
                  <p
                    className={`text-xs ${
                      isSelected ? "text-white/90" : "text-gray-300"
                    }`}
                  >
                    {method.description}
                  </p>
                </div>
              </div>

              {isSelected && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
              )}
            </button>
          );
        })}
      </div>

      {selectedMethod !== "cash" && (
        <div className="bg-blue-600/20 border border-blue-500/30 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <div className="text-blue-400 mt-0.5">ℹ️</div>
            <div className="text-sm text-blue-100">
              <p className="font-semibold mb-1">
                Instruksi Pembayaran{" "}
                {paymentMethods.find((m) => m.id === selectedMethod)?.name}:
              </p>
              <ol className="list-decimal list-inside space-y-1 text-blue-200">
                <li>Klik tombol "Kirim ke WhatsApp"</li>
                <li>
                  Admin akan memberikan nomor rekening/ID{" "}
                  {paymentMethods.find((m) => m.id === selectedMethod)?.name}
                </li>
                <li>Transfer sesuai nominal yang tertera</li>
                <li>Kirim bukti transfer ke admin</li>
                <li>Pesanan akan diproses setelah pembayaran dikonfirmasi</li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
