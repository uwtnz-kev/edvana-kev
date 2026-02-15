import { SearchInput, FilterDropdown, SortControls } from "../shared";

interface ExamsControlsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterValue: string;
  onFilterChange: (value: string) => void;
  sortField: string;
  sortDirection: "asc" | "desc";
  onSortChange: (field: string, direction: "asc" | "desc") => void;
}

export function ExamsControls({
  searchQuery,
  onSearchChange,
  filterValue,
  onFilterChange,
  sortField,
  sortDirection,
  onSortChange
}: ExamsControlsProps) {
  const filterOptions = [
    { value: "all", label: "All Exams" },
    { value: "upcoming", label: "Upcoming" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
    { value: "past", label: "Past Exams" }
  ];

  const sortOptions = [
    { value: "date", label: "Date" },
    { value: "subject", label: "Subject" },
    { value: "status", label: "Status" },
    { value: "score", label: "Score" }
  ];

  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
      <SearchInput
        placeholder="Search exams by subject or title..."
        value={searchQuery}
        onChange={onSearchChange}
        className="lg:w-80"
      />
      
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:ml-auto">
        <FilterDropdown
          label="Filter by Status"
          options={filterOptions}
          value={filterValue}
          onChange={onFilterChange}
          className="sm:w-48"
        />
        
        <SortControls
          options={sortOptions}
          sortField={sortField}
          sortDirection={sortDirection}
          onSortChange={onSortChange}
        />
      </div>
    </div>
  );
}