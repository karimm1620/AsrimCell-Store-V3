import React, { useState, useRef, useEffect } from "react";
import { memo, useCallback } from "react";
import { ChevronDown, Check } from "lucide-react";

interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface EnhancedSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  variant?: "card" | "minimal" | "premium";
  disabled?: boolean;
}

const EnhancedSelect: React.FC<EnhancedSelectProps> = memo(
  ({
    options,
    value,
    onChange,
    placeholder = "Select an option",
    label,
    variant = "card",
    disabled = false,
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const selectRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((option) => option.value === value);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          selectRef.current &&
          !selectRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setFocusedIndex(-1);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        if (disabled) return;

        switch (event.key) {
          case "Enter":
          case " ":
            event.preventDefault();
            if (isOpen && focusedIndex >= 0) {
              onChange(options[focusedIndex].value);
              setIsOpen(false);
              setFocusedIndex(-1);
            } else {
              setIsOpen(true);
            }
            break;
          case "Escape":
            setIsOpen(false);
            setFocusedIndex(-1);
            break;
          case "ArrowDown":
            event.preventDefault();
            if (!isOpen) {
              setIsOpen(true);
            } else {
              setFocusedIndex((prev) => Math.min(prev + 1, options.length - 1));
            }
            break;
          case "ArrowUp":
            event.preventDefault();
            if (isOpen) {
              setFocusedIndex((prev) => Math.max(prev - 1, 0));
            }
            break;
        }
      },
      [disabled, isOpen, focusedIndex, options, onChange],
    );

    const getVariantStyles = useCallback(() => {
      switch (variant) {
        case "card":
          return {
            container: `
            relative bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 
            rounded-xl shadow-sm hover:shadow-md transition-all duration-300 
            ${
              isOpen
                ? "ring-2 ring-blue-500 dark:ring-purple-500 border-blue-500 dark:border-purple-500"
                : ""
            }
            ${
              disabled
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:border-gray-300 dark:hover:border-gray-500"
            }
          `,
            trigger: "px-4 py-4 flex items-center justify-between",
            dropdown: `
            absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 
            border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg 
            max-h-60 overflow-auto z-[100] backdrop-blur-sm
          `,
          };
        case "minimal":
          return {
            container: `
            relative bg-transparent border-b-2 border-gray-300 dark:border-gray-600 
            transition-all duration-300 
            ${isOpen ? "border-blue-500 dark:border-purple-500" : ""}
            ${
              disabled
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:border-gray-400 dark:hover:border-gray-500"
            }
          `,
            trigger: "px-2 py-3 flex items-center justify-between",
            dropdown: `
            absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 
            border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg 
            max-h-60 overflow-auto z-[100]
          `,
          };
        case "premium":
          return {
            container: `
            relative bg-white/90 dark:bg-gray-800/90 
            border border-gray-200 dark:border-gray-600 rounded-2xl shadow-sm 
            hover:shadow-lg transition-all duration-300 backdrop-blur-sm
            ${
              isOpen
                ? "ring-2 ring-blue-500 dark:ring-purple-500 shadow-lg"
                : ""
            }
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `,
            trigger:
              "px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between",
            dropdown: `
            absolute top-full left-0 right-0 mt-3 bg-white/95 dark:bg-gray-800/95 
            border border-gray-200 dark:border-gray-600 rounded-2xl shadow-xl 
            max-h-60 overflow-auto z-[100] backdrop-blur-lg
          `,
          };
        default:
          return getVariantStyles();
      }
    }, [variant, isOpen, disabled]);

    const styles = getVariantStyles();

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-semibold text-gray-900 dark:text-white">
            {label}
          </label>
        )}

        <div
          ref={selectRef}
          className={styles.container}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label={label || placeholder}
        >
          <div className={styles.trigger}>
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {selectedOption?.icon && (
                <div className="flex-shrink-0 text-gray-500 dark:text-gray-400 w-4 h-4">
                  {selectedOption.icon}
                </div>
              )}
              <span
                className={`truncate text-sm sm:text-base ${
                  selectedOption
                    ? "text-gray-900 dark:text-white font-medium"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {selectedOption?.label || placeholder}
              </span>
            </div>

            <ChevronDown
              className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {isOpen && (
            <div ref={optionsRef} className={styles.dropdown} role="listbox">
              {options.map((option, index) => (
                <div
                  key={option.value}
                  className={`
                  px-4 py-3 flex items-center gap-3 cursor-pointer transition-colors duration-150 text-sm sm:text-base
                  ${
                    focusedIndex === index
                      ? "bg-blue-50 dark:bg-blue-900/20"
                      : "hover:bg-gray-50 dark:hover:bg-gray-700"
                  }
                  ${
                    value === option.value
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200"
                      : "text-gray-900 dark:text-white"
                  }
                `}
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(option.value);
                    setIsOpen(false);
                    setFocusedIndex(-1);
                  }}
                  onMouseEnter={() => setFocusedIndex(index)}
                  role="option"
                  aria-selected={value === option.value}
                >
                  {option.icon && (
                    <div className="flex-shrink-0 w-4 h-4">{option.icon}</div>
                  )}
                  <span className="flex-1 truncate font-medium">
                    {option.label}
                  </span>
                  {value === option.value && (
                    <Check className="w-4 h-4 text-blue-600 dark:text-blue-300 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  },
);

EnhancedSelect.displayName = "EnhancedSelect";

export { EnhancedSelect };
