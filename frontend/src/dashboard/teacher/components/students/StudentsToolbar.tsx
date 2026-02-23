import React, { useEffect, useState } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  GlassSelect,
  GlassSelectContent,
  GlassSelectItem,
  GlassSelectTrigger,
  GlassSelectValue,
} from "../../../schooladmin/components/ui/GlassSelect";
import type { StudentsFilters, StudentStatus } from "./types";

interface Props {
  filters: StudentsFilters;
  onFiltersChange: (next: StudentsFilters) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (n: number) => void;
  totalStudents: number;
}

const statusOptions: Array<{ value: "all" | StudentStatus; label: string }> = [
  { value: "all", label: "All status" },
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
  { value: "Transferred", label: "Transferred" },
  { value: "Suspended", label: "Suspended" },
  { value: "Graduated", label: "Graduated" },
];

const classOptions: Array<{ value: string; label: string }> = [
  { value: "all", label: "All classes" },
  { value: "S1A", label: "S1A" },
  { value: "S1B", label: "S1B" },
  { value: "S2A", label: "S2A" },
  { value: "S2B", label: "S2B" },
  { value: "S3A", label: "S3A" },
  { value: "S3B", label: "S3B" },
];

function clampInt(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min;
  const v = Math.trunc(value);
  return Math.max(min, Math.min(max, v));
}

export default function StudentsToolbar({
  filters,
  onFiltersChange,
  itemsPerPage,
  onItemsPerPageChange,
  totalStudents,
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

  const handleItemsPerPage = (raw: number) => {
    const max = Math.max(1, totalStudents || 1);
    const next = clampInt(raw, 1, max);
    onItemsPerPageChange(next);
  };

  return (
    <div className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="relative w-full lg:flex-1 lg:max-w-[620px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-900 w-4 h-4" />
          <Input
            placeholder="Search name, email, phone"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-10 bg-white/20 backdrop-blur-sm border-white/30 rounded-xl text-blue-900 placeholder:text-blue-900/60 focus:border-white/50 focus:bg-white/30 h-11"
            aria-label="Search students"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 w-full lg:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                className="
                  h-11
                  w-full sm:w-[150px]
                  bg-white/20 backdrop-blur-sm
                  border border-white/30
                  text-blue-900
                  hover:bg-white/30
                  rounded-xl
                  px-4
                  justify-between
                  shadow-sm
                "
              >
                <span className="inline-flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </span>
                <ChevronDown className="w-4 h-4 opacity-70" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-3 w-[320px]"
            >
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-white mb-1 block">
                    Class
                  </label>
                  <GlassSelect
                    value={filters.class.trim() === "" ? "all" : filters.class}
                    onValueChange={(v) =>
                      onFiltersChange({
                        ...filters,
                        class: v === "all" ? "" : v,
                      })
                    }
                  >
                    <GlassSelectTrigger className="h-10 text-sm">
                      <GlassSelectValue placeholder="Select class" />
                    </GlassSelectTrigger>
                    <GlassSelectContent>
                      {classOptions.map((opt) => (
                        <GlassSelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </GlassSelectItem>
                      ))}
                    </GlassSelectContent>
                  </GlassSelect>
                </div>

                <div>
                  <label className="text-xs font-medium text-white mb-1 block">
                    Status
                  </label>
                  <GlassSelect
                    value={filters.status}
                    onValueChange={(v) =>
                      onFiltersChange({
                        ...filters,
                        status: v as "all" | StudentStatus,
                      })
                    }
                  >
                    <GlassSelectTrigger className="h-10 text-sm">
                      <GlassSelectValue placeholder="Select status" />
                    </GlassSelectTrigger>
                    <GlassSelectContent>
                      {statusOptions.map((opt) => (
                        <GlassSelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </GlassSelectItem>
                      ))}
                    </GlassSelectContent>
                  </GlassSelect>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-sm text-[#3B240F] whitespace-nowrap">
              Show:
            </span>

            <input
              type="number"
              min={1}
              max={Math.max(1, totalStudents || 1)}
              value={itemsPerPage}
              onChange={(e) => {
                const raw = Number(e.target.value);
                if (!Number.isNaN(raw)) handleItemsPerPage(raw);
              }}
              onBlur={(e) => {
                const raw = Number(e.target.value);
                if (!Number.isNaN(raw)) handleItemsPerPage(raw);
              }}
              className="
                h-11 w-[110px]
                bg-white/20 backdrop-blur-sm
                border border-white/30
                rounded-xl
                text-[#3B240F]
                text-sm
                px-3
                focus:outline-none
                focus:border-white/50
                focus:bg-white/30
              "
              aria-label="Items per page"
            />

            <span className="text-sm text-[#3B240F] whitespace-nowrap">
              of {totalStudents} students
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}