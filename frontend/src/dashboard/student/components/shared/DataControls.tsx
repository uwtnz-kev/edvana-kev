import { SearchInput } from "./SearchInput";
import { FilterDropdown } from "./FilterDropdown";
import { SortControls } from "./SortControls";

interface FilterOption {
  value: string;
  label: string;
}

interface SortOption {
  value: string;
  label: string;
}

interface DataControlsProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  
  filters?: Array<{
    key: string;
    label: string;
    value: string;
    options: FilterOption[];
    onChange: (value: string) => void;
  }>;
  
  sortOptions: SortOption[];
  sortField: string;
  sortDirection: "asc" | "desc";
  onSortChange: (field: string, direction: "asc" | "desc") => void;
  
  className?: string;
}

export function DataControls({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  filters = [],
  sortOptions,
  sortField,
  sortDirection,
  onSortChange,
  className = ""
}: DataControlsProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Search */}
        <SearchInput
          value={searchValue}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
          className="lg:w-80"
        />

        {/* Sort Controls */}
        <SortControls
          options={sortOptions}
          sortField={sortField}
          sortDirection={sortDirection}
          onSortChange={onSortChange}
        />
      </div>

      {/* Filters */}
      {filters.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <FilterDropdown
              key={filter.key}
              label={filter.label}
              options={filter.options}
              value={filter.value}
              onChange={filter.onChange}
              className="min-w-[150px]"
            />
          ))}
        </div>
      )}
    </div>
  );
}