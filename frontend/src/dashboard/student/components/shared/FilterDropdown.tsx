import { ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function FilterDropdown({ 
  label, 
  options, 
  value, 
  onChange, 
  className = "" 
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl px-4 py-2 text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 ${
          isOpen ? "border-[#1EA896]/50 shadow-lg shadow-[#1EA896]/10" : ""
        }`}
      >
        <span className="text-sm">
          {selectedOption ? selectedOption.label : label}
        </span>
        <ChevronDown className={`h-4 w-4 text-white/60 transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-black/80 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`flex items-center justify-between w-full px-4 py-3 text-left hover:bg-white/10 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                value === option.value ? "bg-[#1EA896]/20 text-[#1EA896]" : "text-white"
              }`}
            >
              <span className="text-sm">{option.label}</span>
              {value === option.value && (
                <Check className="h-4 w-4" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}