/**
 * TeacherSubjectsControls
 * -----------------------
 * Renders controls for the teacher dashboard s ub je ct s feature.
 */
import { useEffect, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  GlassSelect,
  GlassSelectContent,
  GlassSelectItem,
  GlassSelectTrigger,
  GlassSelectValue,
} from "@/dashboard/schooladmin/components/ui/GlassSelect";

interface TeacherSubjectsControlsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedClass: string;
  onClassChange: (value: string) => void;
  classes: string[];
}

export function TeacherSubjectsControls({
  searchQuery,
  onSearchChange,
  selectedClass,
  onClassChange,
  classes,
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
    <div className="teacher-panel-surface rounded-2xl p-3 teacher-panel-hover">
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="flex items-center gap-2 text-white/80">
          <SlidersHorizontal className="h-4 w-4 text-[var(--text-secondary)]" />
          <span className="text-sm font-medium">Filters</span>
        </div>

        <div className="relative sm:w-80 w-full">
          <Search className="h-4 w-4 text-[var(--text-secondary)] absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search subjects or lessons"
            className="pl-9 bg-white/10 border-white/10 backdrop-blur-xl rounded-2xl text-white placeholder:text-white/60"
            aria-label="Search subjects"
          />
        </div>

        <GlassSelect value={selectedClass} onValueChange={onClassChange}>
          <GlassSelectTrigger className="h-11 w-full sm:w-[170px] text-sm">
            <GlassSelectValue placeholder="All classes" />
          </GlassSelectTrigger>
          <GlassSelectContent>
            {classes.map((className) => (
              <GlassSelectItem key={className} value={className}>
                {className === "all" ? "All classes" : className}
              </GlassSelectItem>
            ))}
          </GlassSelectContent>
        </GlassSelect>
      </div>
    </div>
  );
}




