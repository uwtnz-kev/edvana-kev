import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export type AssignmentStatusFilter = "all" | "draft" | "active" | "grading";

export type TeacherAssignmentsFilters = {
  query: string;
  status: AssignmentStatusFilter;
  className: string;
};

type Props = {
  filters: TeacherAssignmentsFilters;
  onFiltersChange: (next: TeacherAssignmentsFilters) => void;
};

const statusOptions: Array<{ value: AssignmentStatusFilter; label: string }> = [
  { value: "all", label: "All status" },
  { value: "draft", label: "Draft" },
  { value: "active", label: "Active" },
  { value: "grading", label: "Grading" },
];

export default function TeacherAssignmentsControls({ filters, onFiltersChange }: Props) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4">
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="flex items-center gap-2 text-[#3B2A1A]">
          <Filter className="h-4 w-4 text-[#1EA896]" />
          <span className="font-semibold">Filters</span>
        </div>

        <div className="flex-1" />

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative sm:w-72 w-full">
            <Search className="h-4 w-4 text-[#6B5A4A] absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              value={filters.query}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  query: e.target.value,
                })
              }
              placeholder="Search title or class"
              className="pl-9 bg-white/5 border-white/20 text-[#3B2A1A] placeholder:text-[#6B5A4A] rounded-xl"
            />
          </div>

          <Select
            value={filters.className}
            onValueChange={(v) => onFiltersChange({ ...filters, className: v })}
          >
            <SelectTrigger className="bg-white/5 border-white/20 text-[#3B2A1A] rounded-xl sm:w-44">
              <SelectValue placeholder="All classes" />
            </SelectTrigger>
            <SelectContent className="bg-white/5 backdrop-blur-xl border border-white/10 text-[#3B2A1A] rounded-xl">
              <SelectItem value="all" className="hover:bg-white/10 focus:bg-white/10">
                All classes
              </SelectItem>
              <SelectItem value="S3A" className="hover:bg-white/10 focus:bg-white/10">
                S3A
              </SelectItem>
              <SelectItem value="S3B" className="hover:bg-white/10 focus:bg-white/10">
                S3B
              </SelectItem>
              <SelectItem value="S4A" className="hover:bg-white/10 focus:bg-white/10">
                S4A
              </SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.status}
            onValueChange={(v) => onFiltersChange({ ...filters, status: v as AssignmentStatusFilter })}
          >
            <SelectTrigger className="bg-white/5 border-white/20 text-[#3B2A1A] rounded-xl sm:w-44">
              <SelectValue placeholder="All status" />
            </SelectTrigger>
            <SelectContent className="bg-white/5 backdrop-blur-xl border border-white/10 text-[#3B2A1A] rounded-xl">
              {statusOptions.map((o) => (
                <SelectItem
                  key={o.value}
                  value={o.value}
                  className="hover:bg-white/10 focus:bg-white/10"
                >
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}