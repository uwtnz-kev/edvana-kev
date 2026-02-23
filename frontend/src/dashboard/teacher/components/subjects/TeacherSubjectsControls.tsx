import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import {
  GlassSelect,
  GlassSelectContent,
  GlassSelectItem,
  GlassSelectTrigger,
  GlassSelectValue,
} from "../../../schooladmin/components/ui/GlassSelect";

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
  const [searchInput, setSearchInput] = useState(searchQuery);

  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (searchInput !== searchQuery) onSearchChange(searchInput);
    }, 300);

    return () => clearTimeout(t);
  }, [searchInput, searchQuery, onSearchChange]);

  return (
    <div
      className="
        bg-white/15 backdrop-blur-xl
        border border-white/25
        shadow-xl
        rounded-2xl
        p-6
        transition-all duration-300 ease-out
        hover:bg-white/20
        hover:border-white/40
        hover:shadow-2xl
        hover:-translate-y-1
      "
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="relative w-full lg:flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-900 w-5 h-5" />
          <input
            className="
              w-full h-12 pl-12 pr-4
              rounded-2xl
              bg-white/20 backdrop-blur-sm
              border border-white/30
              text-blue-900
              placeholder:text-blue-900/60
              transition-colors duration-200
              hover:bg-white/25
              focus:outline-none
              focus:border-white/50
              focus:bg-white/30
            "
            placeholder="Search subjects or classes"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            aria-label="Search subjects"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full lg:w-auto lg:ml-auto">
          <div className="w-full sm:w-[190px]">
            <GlassSelect value={filterValue} onValueChange={onFilterChange}>
              <GlassSelectTrigger className="h-12 rounded-2xl bg-white/20 border-white/30 text-blue-900 hover:bg-white/25 transition-colors">
                <GlassSelectValue placeholder="All subjects" />
              </GlassSelectTrigger>
              <GlassSelectContent>
                <GlassSelectItem value="all">All subjects</GlassSelectItem>
                <GlassSelectItem value="science">Science</GlassSelectItem>
                <GlassSelectItem value="arts">Arts</GlassSelectItem>
                <GlassSelectItem value="languages">Languages</GlassSelectItem>
              </GlassSelectContent>
            </GlassSelect>
          </div>

          <div className="w-full sm:w-[190px]">
            <GlassSelect
              value={sortField}
              onValueChange={(v) => onSortChange(v, sortDirection)}
            >
              <GlassSelectTrigger className="h-12 rounded-2xl bg-white/20 border-white/30 text-blue-900 hover:bg-white/25 transition-colors">
                <GlassSelectValue placeholder="Subject name" />
              </GlassSelectTrigger>
              <GlassSelectContent>
                <GlassSelectItem value="title">Subject name</GlassSelectItem>
                <GlassSelectItem value="classes">Classes</GlassSelectItem>
                <GlassSelectItem value="pending">Pending</GlassSelectItem>
              </GlassSelectContent>
            </GlassSelect>
          </div>

          <button
            type="button"
            className="
              h-12 w-full sm:w-[110px]
              rounded-2xl
              bg-white/20 backdrop-blur-sm
              border border-white/30
              text-blue-900
              transition-all duration-200
              hover:bg-white/30
              hover:shadow-md
              active:shadow-sm
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-white/30
            "
            onClick={() =>
              onSortChange(sortField, sortDirection === "asc" ? "desc" : "asc")
            }
            aria-label="Toggle sort direction"
          >
            {sortDirection === "asc" ? "Asc" : "Desc"}
          </button>
        </div>
      </div>
    </div>
  );
}