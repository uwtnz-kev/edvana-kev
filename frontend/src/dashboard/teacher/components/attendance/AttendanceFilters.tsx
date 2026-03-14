/**
 * AttendanceFilters
 * -----------------
 * Renders controls for the teacher dashboard a tt en da nc e feature.
 */
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TeacherDatePicker } from "@/dashboard/teacher/components/shared";
import type { AttendanceFilters } from "./attendanceTypes";

type Props = {
  value: AttendanceFilters;
  onChange: (next: AttendanceFilters) => void;
  selectedDate: string | null;
  onDateChange: (next: string | null) => void;
  disabled?: boolean;
};

export default function AttendanceFiltersBar({
  value,
  onChange,
  selectedDate,
  onDateChange,
  disabled = false,
}: Props) {
  const selectedDateObj = selectedDate ? new Date(`${selectedDate}T00:00:00`) : null;

  return (
    <div className="teacher-panel-surface rounded-2xl p-4 teacher-panel-hover">
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="flex items-center gap-2 text-white/80">
          <SlidersHorizontal className="h-4 w-4 text-[var(--text-secondary)]" />
          <span className="text-sm font-medium">Filters</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative sm:w-72 w-full">
            <Search className="h-4 w-4 text-[var(--text-secondary)] absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              value={value.query}
              onChange={(event) => onChange({ ...value, query: event.target.value })}
              placeholder="Search class or session"
              disabled={disabled}
              className="pl-9 bg-white/10 border-white/10 backdrop-blur-xl rounded-2xl text-white placeholder:text-white/60"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="sm:w-48">
              <TeacherDatePicker
                value={selectedDateObj}
                onChange={(next) => onDateChange(next ? next.toISOString().slice(0, 10) : null)}
                placeholder="All dates"
                disabled={disabled}
              />
            </div>
            <Button
              type="button"
              variant="outline"
              disabled={disabled || !selectedDateObj}
              onClick={() => onDateChange(null)}
              className="h-10 px-3 bg-white/10 border-white/10 backdrop-blur-xl rounded-2xl text-white hover:bg-white/20"
            >
              <X className="h-4 w-4 text-[var(--text-secondary)]" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}




