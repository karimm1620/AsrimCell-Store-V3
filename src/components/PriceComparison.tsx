import React from "react";
import { TrendingDown, Minus } from "lucide-react";

interface PriceComparisonProps {
  currentPrice: number;
  originalPrice?: number;
  competitorPrice?: number;
}

export const PriceComparison: React.FC<PriceComparisonProps> = ({
  currentPrice,
  originalPrice,
  competitorPrice,
}) => {
  const formatRupiah = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const calculateSavings = () => {
    if (!originalPrice) return null;
    const savings = originalPrice - currentPrice;
    const percentage = Math.round((savings / originalPrice) * 100);
    return { amount: savings, percentage };
  };

  const compareWithCompetitor = () => {
    if (!competitorPrice) return null;
    const difference = competitorPrice - currentPrice;
    const percentage = Math.round(
      (Math.abs(difference) / competitorPrice) * 100
    );
    return {
      amount: Math.abs(difference),
      percentage,
      cheaper: difference > 0,
    };
  };

  const savings = calculateSavings();
  const comparison = compareWithCompetitor();

  return (
    <div className="space-y-3">
      {/* Current Price */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Harga AsrimCell
        </span>
        <span className="text-lg font-bold text-green-600 dark:text-green-400">
          Rp {formatRupiah(currentPrice)}
        </span>
      </div>

      {/* Original Price & Savings */}
      {savings && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
            Harga Normal: Rp {formatRupiah(originalPrice!)}
          </span>
          <div className="flex items-center gap-1 text-sm font-semibold text-red-500">
            <TrendingDown className="w-4 h-4" />
            Hemat {savings.percentage}%
          </div>
        </div>
      )}

      {/* Competitor Comparison */}
      {comparison && (
        <div className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            vs Kompetitor
          </span>
          <div className="flex items-center gap-1 text-sm font-semibold">
            {comparison.cheaper ? (
              <>
                <TrendingDown className="w-4 h-4 text-green-500" />
                <span className="text-green-500">
                  Lebih murah Rp {formatRupiah(comparison.amount)}
                </span>
              </>
            ) : (
              <>
                <Minus className="w-4 h-4 text-gray-500" />
                <span className="text-gray-500">Harga kompetitif</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
