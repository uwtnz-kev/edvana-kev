import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

interface SortOption {
  value: string;
  label: string;
}

interface SortControlsProps {
  options: SortOption[];
  sortField: string;
  sortDirection: "asc" | "desc";
  onSortChange: (field: string, direction: "asc" | "desc") => void;
  className?: string;
}

export function SortControls({ 
  options, 
  sortField, 
  sortDirection, 
  onSortChange, 
  className = "" 
}: SortControlsProps) {
  const handleSortClick = (field: string) => {
    if (sortField === field) {
      // Toggle direction if same field
      onSortChange(field, sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Default to ascending for new field
      onSortChange(field, "asc");
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <span className="text-white/60 text-sm font-medium">Sort by:</span>
      <div className="flex bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-1">
        {options.map((option) => {
          const isActive = sortField === option.value;
          const getSortIcon = () => {
            if (!isActive) return <ArrowUpDown className="h-3 w-3" />;
            return sortDirection === "asc" 
              ? <ArrowUp className="h-3 w-3" />
              : <ArrowDown className="h-3 w-3" />;
          };

          return (
            <button
              key={option.value}
              onClick={() => handleSortClick(option.value)}
              className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[#1EA896] text-white shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {getSortIcon()}
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}