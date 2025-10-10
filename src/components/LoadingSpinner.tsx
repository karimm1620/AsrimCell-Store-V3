import React from "react";
import { Trefoil } from "ldrs/react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  variant?: "default" | "trefoil";
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className = "",
  variant = "default",
  color = "#3b82f6",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-16 h-16",
  };

  const trefoilSizes = {
    sm: "20",
    md: "40",
    lg: "60",
  };

  if (variant === "trefoil") {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <Trefoil
          size={trefoilSizes[size]}
          stroke="4"
          strokeLength="0.15"
          bgOpacity="0.1"
          speed="1.4"
          color={color}
        />
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} ${className} mx-auto`}>
      <div className="relative">
        <div className="absolute inset-0 border-4 border-white/20 dark:border-white/10 rounded-full backdrop-blur-sm"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 dark:border-t-purple-600 rounded-full animate-spin shadow-glow-blue dark:shadow-glow-purple"></div>
        <div className="absolute inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-sm animate-pulse"></div>
      </div>
    </div>
  );
};
