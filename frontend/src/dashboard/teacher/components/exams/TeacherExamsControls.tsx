// src/dashboard/teacher/components/exams/TeacherExamsControls.tsx

import { SearchInput, SortControls } from "@/dashboard/student/components/shared";
import {
  GlassSelect,
  GlassSelectContent,
  GlassSelectItem,
  GlassSelectTrigger,
  GlassSelectValue,
} from "@/dashboard/schooladmin/components/ui/GlassSelect";

interface TeacherExamsControlsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterValue: string;
  onFilterChange: (value: string) => void;
  sortField: string;
  sortDirection: "asc" | "desc";
  onSortChange: (field: string, direction: "asc" | "desc") => void;
}

export function TeacherExamsControls({
  searchQuery,
  onSearchChange,
  filterValue,
  onFilterChange,
  sortField,
  sortDirection,
  onSortChange,
}: TeacherExamsControlsProps) {
  const filterOptions = [
    { value: "all", label: "All Exams" },
    { value: "upcoming", label: "Upcoming" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
    { value: "past", label: "Past Exams" },
  ];

  const sortOptions = [
    { value: "date", label: "Date" },
    { value: "subject", label: "Subject" },
    { value: "status", label: "Status" },
    { value: "score", label: "Avg Score" },
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
        <div className="sm:w-48">
          <div className="text-xs font-medium text-white/70 mb-2">
            Filter by Status
          </div>

          <GlassSelect value={filterValue} onValueChange={onFilterChange}>
            <GlassSelectTrigger className="h-10 w-full rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/15 transition-colors">
              <GlassSelectValue placeholder="All Exams" />
            </GlassSelectTrigger>

            <GlassSelectContent>
              {filterOptions.map((opt) => (
                <GlassSelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </GlassSelectItem>
              ))}
            </GlassSelectContent>
          </GlassSelect>
        </div>

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