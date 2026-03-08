/**
 * AttendanceFilters
 * -----------------
 * Renders controls for the teacher dashboard a tt en da nc e feature.
 */
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TeacherDatePicker } from "@/dashboard/teacher/components/shared";
import type { AttendanceFilters, AttendanceStatus } from "./attendanceTypes";

type Props = {
  value: AttendanceFilters;
  onChange: (next: AttendanceFilters) => void;
  selectedDate: string | null;
  onDateChange: (next: string | null) => void;
  disabled?: boolean;
};

const statusOptions: Array<{ value: "all" | AttendanceStatus; label: string }> = [
  { value: "all", label: "All status" },
  { value: "present", label: "Present" },
  { value: "absent", label: "Absent" },
];

export default function AttendanceFiltersBar({
  value,
  onChange,
  selectedDate,
  onDateChange,
  disabled = false,
}: Props) {
  const selectedDateObj = selectedDate ? new Date(`${selectedDate}T00:00:00`) : null;

  return (
    <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-4 transition-colors duration-200 hover:bg-white/20">
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="flex items-center gap-2 text-white/80">
          <SlidersHorizontal className="h-4 w-4 text-teal-600" />
          <span className="text-sm font-medium">Filters</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative sm:w-72 w-full">
            <Search className="h-4 w-4 text-white/60 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              value={value.query}
              onChange={(event) => onChange({ ...value, query: event.target.value })}
              placeholder="Search student"
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
              <X className="h-4 w-4" />
            </Button>
          </div>

          <Select
            value={value.statusValue}
            onValueChange={(next) => onChange({ ...value, statusValue: next as AttendanceFilters["statusValue"] })}
            disabled={disabled}
          >
            <SelectTrigger className="sm:w-40 bg-white/10 border-white/10 backdrop-blur-xl rounded-2xl text-white">
              <SelectValue placeholder="All status" />
            </SelectTrigger>
            <SelectContent className="bg-white/10 border-white/10 backdrop-blur-xl text-white rounded-2xl">
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="focus:bg-white/10">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

        </div>
      </div>
    </div>
  );
}



