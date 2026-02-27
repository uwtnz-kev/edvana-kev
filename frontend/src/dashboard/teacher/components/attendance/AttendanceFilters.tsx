import React from "react";
import { CalendarDays, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

import {
  GlassSelect,
  GlassSelectContent,
  GlassSelectItem,
  GlassSelectTrigger,
  GlassSelectValue,
} from "@/dashboard/schooladmin/components/ui/GlassSelect";

import type { AttendanceFilters, AttendanceStatus } from "./attendanceTypes";

type Props = {
  value: AttendanceFilters;
  onChange: (next: AttendanceFilters) => void;
  classOptions: string[];
  subjectOptions: string[];
};

const statusOptions: Array<"all" | AttendanceStatus> = [
  "all",
  "Present",
  "Absent",
  "Late",
  "Excused",
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        group
        bg-white/35
        border border-white/45
        rounded-2xl
        shadow-[0_14px_35px_rgba(59,36,15,0.12)]
        transition-all duration-300
        hover:-translate-y-1
        hover:bg-white/45
        hover:shadow-[0_20px_45px_rgba(59,36,15,0.22)]
      "
    >
      {children}
    </div>
  );
}

export default function AttendanceFiltersBar({
  value,
  onChange,
  classOptions,
  subjectOptions,
}: Props) {
  return (
    <div className="rounded-2xl border border-white/25 bg-white/15 backdrop-blur-xl shadow-xl p-5">
      <div className="grid gap-4 md:grid-cols-5">
        <Pill>
          <div className="relative">
            <Search className="h-5 w-5 text-[#6B4F3A] absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 group-hover:text-[#3B240F]" />
            <Input
              value={value.query}
              onChange={(e) => onChange({ ...value, query: e.target.value })}
              placeholder="Search student.."
              className="
                h-12
                bg-transparent
                border-0
                pl-12
                text-[#3B240F]
                placeholder:text-[#6B4F3A]/70
                focus-visible:ring-0
              "
            />
          </div>
        </Pill>

        <Pill>
          <GlassSelect
            value={value.classValue}
            onValueChange={(v) => onChange({ ...value, classValue: v })}
          >
            <GlassSelectTrigger className="h-12 w-full bg-transparent border-0 focus:ring-0">
              <GlassSelectValue placeholder="All classes" />
            </GlassSelectTrigger>
            <GlassSelectContent>
              {classOptions.map((v) => (
                <GlassSelectItem key={v} value={v}>
                  {v === "all" ? "All classes" : v}
                </GlassSelectItem>
              ))}
            </GlassSelectContent>
          </GlassSelect>
        </Pill>

        <Pill>
          <GlassSelect
            value={value.subjectValue}
            onValueChange={(v) => onChange({ ...value, subjectValue: v })}
          >
            <GlassSelectTrigger className="h-12 w-full bg-transparent border-0 focus:ring-0">
              <GlassSelectValue placeholder="All subjects" />
            </GlassSelectTrigger>
            <GlassSelectContent>
              {subjectOptions.map((v) => (
                <GlassSelectItem key={v} value={v}>
                  {v === "all" ? "All subjects" : v}
                </GlassSelectItem>
              ))}
            </GlassSelectContent>
          </GlassSelect>
        </Pill>

        <Pill>
          <GlassSelect
            value={value.statusValue}
            onValueChange={(v) => onChange({ ...value, statusValue: v as any })}
          >
            <GlassSelectTrigger className="h-12 w-full bg-transparent border-0 focus:ring-0">
              <GlassSelectValue placeholder="All status" />
            </GlassSelectTrigger>
            <GlassSelectContent>
              {statusOptions.map((v) => (
                <GlassSelectItem key={v} value={v}>
                  {v === "all" ? "All status" : v}
                </GlassSelectItem>
              ))}
            </GlassSelectContent>
          </GlassSelect>
        </Pill>

        <Pill>
          <div className="flex items-center gap-3 px-4 h-12">
            <CalendarDays className="h-5 w-5 text-[#6B4F3A] transition-colors duration-300 group-hover:text-[#3B240F]" />
            <input
              type="date"
              value={value.date}
              onChange={(e) => onChange({ ...value, date: e.target.value })}
              className="w-full bg-transparent text-[#3B240F] outline-none"
            />
          </div>
        </Pill>
      </div>
    </div>
  );
}