/**
 * StudentsToolbar
 * ---------------
 * Renders controls for the teacher dashboard s tu de nt s feature.
 */
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  GlassSelect,
  GlassSelectContent,
  GlassSelectItem,
  GlassSelectTrigger,
  GlassSelectValue,
} from "@/dashboard/schooladmin/components/ui/GlassSelect";
import type { StudentsFilters } from "./types";

interface Props {
  filters: StudentsFilters;
  onFiltersChange: (next: StudentsFilters) => void;
  selectedClass: string;
  onClassChange: (value: string) => void;
  classes: string[];
}

export default function StudentsToolbar({
  filters,
  onFiltersChange,
  selectedClass,
  onClassChange,
  classes,
}: Props) {
  const [searchInput, setSearchInput] = useState(filters.search);

  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (searchInput !== filters.search) {
        onFiltersChange({ ...filters, search: searchInput });
      }
    }, 300);

    return () => clearTimeout(t);
  }, [searchInput, filters, onFiltersChange]);

  return (
    <div className="teacher-panel-surface rounded-2xl p-3 teacher-panel-hover">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
          <Input
            placeholder="Search name, email, phone"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="h-11 rounded-xl border-white/30 bg-white/20 pl-10 text-white placeholder:text-white/70 focus:border-white/50 focus:bg-white/30"
            aria-label="Search students"
          />
        </div>

        <div className="sm:w-56">
          <GlassSelect value={selectedClass} onValueChange={onClassChange}>
            <GlassSelectTrigger className="h-11 w-full text-sm text-white hover:text-white [&>span]:text-white [&>svg]:text-white">
              <GlassSelectValue className="text-white" placeholder="All classes" />
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
    </div>
  );
}




