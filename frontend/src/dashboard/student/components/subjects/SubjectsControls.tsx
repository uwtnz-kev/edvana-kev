import { SearchInput, FilterDropdown, SortControls } from "../shared";

interface SubjectsControlsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterValue: string;
  onFilterChange: (value: string) => void;
  sortField: string;
  sortDirection: "asc" | "desc";
  onSortChange: (field: string, direction: "asc" | "desc") => void;
}

export function SubjectsControls({
  searchQuery,
  onSearchChange,
  filterValue,
  onFilterChange,
  sortField,
  sortDirection,
  onSortChange
}: SubjectsControlsProps) {
  const filterOptions = [
    { value: "all", label: "All Subjects" },
    { value: "senior-6", label: "Senior 6" },
    { value: "science", label: "Science" },
    { value: "arts", label: "Arts" },
    { value: "languages", label: "Languages" }
  ];

  const sortOptions = [
    { value: "title", label: "Subject Name" },
    { value: "instructor", label: "Teacher" },
    { value: "progress", label: "Progress" }
  ];

  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
      <SearchInput
        placeholder="Search subjects..."
        value={searchQuery}
        onChange={onSearchChange}
        className="lg:w-80"
      />
      
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:ml-auto">
        <FilterDropdown
          label="Filter by Category"
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