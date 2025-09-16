import React from "react";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "premium";
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  size = "md",
  variant = "default",
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return {
          container: "w-10 h-6",
          thumb: "w-4 h-4",
          translate: checked ? "translate-x-4" : "translate-x-1",
        };
      case "lg":
        return {
          container: "w-16 h-8",
          thumb: "w-6 h-6",
          translate: checked ? "translate-x-8" : "translate-x-1",
        };
      default: // md
        return {
          container: "w-12 h-7",
          thumb: "w-5 h-5",
          translate: checked ? "translate-x-5" : "translate-x-1",
        };
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "success":
        return {
          background: checked
            ? "bg-gradient-to-r from-green-400 to-green-600 shadow-lg shadow-green-500/25"
            : "bg-gray-200 dark:bg-gray-700",
          thumb: checked
            ? "bg-white shadow-lg ring-2 ring-green-500/20"
            : "bg-white dark:bg-gray-300 shadow-md",
        };
      case "premium":
        return {
          background: checked
            ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/25"
            : "bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600",
          thumb: checked
            ? "bg-white shadow-xl ring-2 ring-white/20 backdrop-blur-sm"
            : "bg-white dark:bg-gray-200 shadow-lg",
        };
      default:
        return {
          background: checked
            ? "bg-blue-600 dark:bg-purple-600 shadow-lg shadow-blue-500/25 dark:shadow-purple-500/25"
            : "bg-gray-200 dark:bg-gray-700",
          thumb: checked
            ? "bg-white shadow-lg"
            : "bg-white dark:bg-gray-300 shadow-md",
        };
    }
  };

  const sizeClasses = getSizeClasses();
  const variantClasses = getVariantClasses();

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`
          relative inline-flex items-center rounded-full transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900
          ${sizeClasses.container}
          ${variantClasses.background}
          ${
            disabled
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:scale-105 active:scale-95"
          }
        `}
      >
        <span
          className={`
            inline-block rounded-full transition-all duration-300 ease-in-out transform
            ${sizeClasses.thumb}
            ${sizeClasses.translate}
            ${variantClasses.thumb}
            ${checked ? "rotate-180" : "rotate-0"}
          `}
        >
          {/* Optional inner icon */}
          <span
            className={`
            absolute inset-0 flex items-center justify-center transition-opacity duration-200
            ${checked ? "opacity-100" : "opacity-0"}
          `}
          >
            <svg
              className="w-3 h-3 text-blue-600 dark:text-purple-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </span>
      </button>

      {label && (
        <label
          className={`text-sm font-medium text-gray-900 dark:text-white select-none ${
            disabled ? "opacity-50" : "cursor-pointer"
          }`}
          onClick={() => !disabled && onChange(!checked)}
        >
          {label}
        </label>
      )}
    </div>
  );
};
