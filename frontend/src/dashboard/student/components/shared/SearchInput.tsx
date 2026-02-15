import { Search, X } from "lucide-react";
import { useState } from "react";

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SearchInput({ 
  placeholder = "Search...", 
  value, 
  onChange, 
  className = "" 
}: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChange("");
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`flex items-center bg-white/5 backdrop-blur-lg border rounded-xl transition-all duration-200 ${
        isFocused 
          ? "border-[#1EA896]/50 shadow-lg shadow-[#1EA896]/10" 
          : "border-white/10 hover:border-white/20"
      }`}>
        <Search className="h-4 w-4 text-white/60 ml-3" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full bg-transparent text-white placeholder-white/50 px-3 py-2 outline-none"
        />
        {value && (
          <button
            onClick={handleClear}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors mr-1"
            type="button"
          >
            <X className="h-4 w-4 text-white/60 hover:text-white" />
          </button>
        )}
      </div>
    </div>
  );
}