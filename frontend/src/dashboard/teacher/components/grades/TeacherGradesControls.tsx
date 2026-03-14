/**
 * TeacherGradesControls
 * ---------------------
 * Renders controls for the teacher dashboard g ra de s feature.
 */
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = {
  value: string;
  label: string;
};

type Props = {
  search: string;
  classValue: string;
  classOptions: Option[];
  onSearchChange: (value: string) => void;
  onClassValueChange: (value: string) => void;
  searchPlaceholder?: string;
  disabled?: boolean;
};

export function TeacherGradesControls({
  search,
  classValue,
  classOptions,
  onSearchChange,
  onClassValueChange,
  searchPlaceholder = "Search student name",
  disabled = false,
}: Props) {
  return (
    <div className="teacher-panel-surface rounded-2xl p-4 teacher-panel-hover">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 md:gap-6">
        <div className="flex items-center gap-2 text-white/80">
          <SlidersHorizontal className="h-4 w-4 text-[var(--text-secondary)]" />
          <span className="text-sm font-medium">Filters</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6 w-full lg:w-auto">
          <Select value={classValue} onValueChange={onClassValueChange} disabled={disabled}>
            <SelectTrigger className="sm:w-40 h-11 px-4 bg-white/10 border-white/10 backdrop-blur-xl rounded-2xl text-white">
              <SelectValue placeholder="All classes" />
            </SelectTrigger>
            <SelectContent className="bg-white/10 border-white/10 backdrop-blur-xl text-white rounded-2xl">
              {classOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="focus:bg-white/10">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-secondary)]" />
            <Input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={searchPlaceholder}
              disabled={disabled}
              className="h-11 w-full rounded-2xl bg-white/10 border-white/10 backdrop-blur-xl pl-11 pr-4 text-white placeholder:text-white/60"
            />
          </div>
        </div>
      </div>
    </div>
  );
}




