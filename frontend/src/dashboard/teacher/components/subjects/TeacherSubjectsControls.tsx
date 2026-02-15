interface TeacherSubjectsControlsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterValue: string;
  onFilterChange: (value: string) => void;
  sortField: string;
  sortDirection: "asc" | "desc";
  onSortChange: (field: string, direction: "asc" | "desc") => void;
}

export function TeacherSubjectsControls({
  searchQuery,
  onSearchChange,
  filterValue,
  onFilterChange,
  sortField,
  sortDirection,
  onSortChange,
}: TeacherSubjectsControlsProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
      <input
        className="lg:w-80 w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#1EA896]/40"
        placeholder="Search subjects or classes"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:ml-auto">
        <select
          className="sm:w-56 w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#FF715B]/40"
          value={filterValue}
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <option value="all">All subjects</option>
          <option value="science">Science</option>
          <option value="arts">Arts</option>
          <option value="languages">Languages</option>
        </select>

        <div className="flex items-center gap-2">
          <select
            className="px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none"
            value={sortField}
            onChange={(e) => onSortChange(e.target.value, sortDirection)}
          >
            <option value="title">Subject name</option>
            <option value="classes">Classes</option>
            <option value="pending">Pending</option>
          </select>

          <button
            className="px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white hover:bg-white/15"
            onClick={() => onSortChange(sortField, sortDirection === "asc" ? "desc" : "asc")}
          >
            {sortDirection === "asc" ? "Asc" : "Desc"}
          </button>
        </div>
      </div>
    </div>
  );
}
