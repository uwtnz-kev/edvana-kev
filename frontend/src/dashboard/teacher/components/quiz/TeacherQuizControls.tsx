/**
 * TeacherQuizControls
 * -------------------
 * Renders controls for the teacher dashboard q ui z feature.
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

export type QuizStatusFilter = "all" | "draft" | "published" | "closed";

type Props = {
  search: string;
  statusFilter: QuizStatusFilter;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: QuizStatusFilter) => void;
  disabled?: boolean;
};

const statusOptions: Array<{ value: QuizStatusFilter; label: string }> = [
  { value: "all", label: "All status" },
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "closed", label: "Closed" },
];

export function TeacherQuizControls({
  search,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
  disabled = false,
}: Props) {
  return (
    <div className="teacher-panel-surface rounded-2xl p-4 teacher-panel-hover hover:shadow-md">
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="flex items-center gap-2 text-white/80">
          <SlidersHorizontal className="h-4 w-4 text-teal-600" />
          <span className="text-sm font-medium">Filters</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative sm:w-72 w-full">
            <Search className="h-4 w-4 text-white/60 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search title"
              disabled={disabled}
              className="pl-9 bg-white/10 border-white/10 backdrop-blur-xl rounded-2xl text-white placeholder:text-white/60"
            />
          </div>

          <Select
            value={statusFilter}
            onValueChange={(value) => onStatusFilterChange(value as QuizStatusFilter)}
            disabled={disabled}
          >
            <SelectTrigger className="sm:w-44 bg-white/10 border-white/10 backdrop-blur-xl rounded-2xl text-white">
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





