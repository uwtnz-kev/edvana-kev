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
    <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-3 transition-colors duration-200 hover:bg-white/20">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-900 w-4 h-4" />
          <Input
            placeholder="Search name, email, phone"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-10 bg-white/20 backdrop-blur-sm border-white/30 rounded-xl text-blue-900 placeholder:text-blue-900/60 focus:border-white/50 focus:bg-white/30 h-11"
            aria-label="Search students"
          />
        </div>

        <div className="sm:w-56">
          <GlassSelect value={selectedClass} onValueChange={onClassChange}>
            <GlassSelectTrigger className="h-11 w-full text-sm">
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
    </div>
  );
}



