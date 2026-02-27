// src/dashboard/teacher/views/CreateAttendanceListView.tsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ClipboardPlus, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import {
  GlassSelect,
  GlassSelectContent,
  GlassSelectItem,
  GlassSelectTrigger,
  GlassSelectValue,
} from "@/dashboard/schooladmin/components/ui/GlassSelect";

import { useStudents, type Student } from "@/dashboard/teacher/components/students";
import AttendanceCreateTable from "@/dashboard/teacher/components/attendance/AttendanceCreateTable";

type Status = "Present" | "Absent" | "Late";

const calendarClassNames = {
  months: "w-full",
  month: "w-full",
  caption: "flex justify-between items-center px-2 pb-2 text-[#3B2A1A] font-semibold",
  nav: "flex items-center gap-2",
  nav_button: "h-8 w-8 rounded-md hover:bg-[#CBB89D] text-[#3B2A1A]",
  table: "w-full border-collapse",
  head_row: "grid grid-cols-7",
  head_cell: "h-9 w-9 flex items-center justify-center text-[#6B5A4A] font-medium",
  row: "grid grid-cols-7",
  cell: "h-9 w-9 flex items-center justify-center",
  day: "h-9 w-9 rounded-md flex items-center justify-center text-[#3B2A1A] hover:bg-[#CBB89D] transition-colors aria-selected:!bg-[#1EA896] aria-selected:!text-[#1B1B1B] aria-selected:hover:!bg-[#1EA896]",
  day_today: "border border-[#8B5E3C] text-[#3B2A1A]",
  day_outside: "text-[#9C8C7A]",
  day_disabled: "text-[#9C8C7A] opacity-40",
};

const idOf = (s: Student) =>
  String((s as any).id ?? (s as any).studentId ?? (s as any).userId ?? "").trim();

const nameOf = (s: Student) => {
  const first = (s as any).firstName ?? "";
  const last = (s as any).lastName ?? "";
  return `${first} ${last}`.trim() || (s as any).name || "Unknown";
};

const classOf = (s: Student) =>
  String((s as any).class ?? (s as any).className ?? (s as any).classNameLabel ?? "").trim();

export default function CreateAttendanceListView() {
  const navigate = useNavigate();
  const { students } = useStudents();

  const [classValue, setClassValue] = useState("");
  const [subjectValue, setSubjectValue] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [statusById, setStatusById] = useState<Record<string, Status>>({});

  const classOptions = useMemo(() => {
    const set = new Set<string>();
    students.forEach((s) => {
      const c = classOf(s);
      if (c) set.add(c);
    });
    return Array.from(set).sort();
  }, [students]);

  const subjectOptions = useMemo(() => {
    return ["Mathematics", "English", "Biology", "Chemistry"];
  }, []);

  const rows = useMemo(() => {
    if (!classValue) return [];
    return students
      .filter((s) => classOf(s) === classValue)
      .map((s) => {
        const id = idOf(s);
        return {
          id,
          name: nameOf(s),
          className: classValue,
          status: statusById[id] ?? "Present",
        };
      })
      .filter((r) => r.id);
  }, [students, classValue, statusById]);

  const canGenerate = Boolean(classValue && subjectValue && date && rows.length > 0);

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#1EA896] rounded-2xl flex items-center justify-center">
              <ClipboardPlus className="h-7 w-7 text-[#1B1B1B]" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-[#3B2A1A]">
                Create Attendance List
              </h1>
              <p className="text-[#6B5A4A] text-lg">
                Pick class, subject, and date, then set status per student
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/dashboard/teacher/attendance")}
            className="bg-[#D6CBB6] border border-[#8B5E3C]/40 text-[#3B2A1A] hover:bg-[#CBB89D]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Class
              </label>
              <GlassSelect value={classValue} onValueChange={setClassValue}>
                <GlassSelectTrigger className="w-full bg-[#D6CBB6] border border-[#8B5E3C]/40">
                  <GlassSelectValue placeholder="Choose a class" />
                </GlassSelectTrigger>
                <GlassSelectContent>
                  {classOptions.map((c) => (
                    <GlassSelectItem key={c} value={c}>
                      {c}
                    </GlassSelectItem>
                  ))}
                </GlassSelectContent>
              </GlassSelect>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Subject
              </label>
              <GlassSelect value={subjectValue} onValueChange={setSubjectValue}>
                <GlassSelectTrigger className="w-full bg-[#D6CBB6] border border-[#8B5E3C]/40">
                  <GlassSelectValue placeholder="Choose a subject" />
                </GlassSelectTrigger>
                <GlassSelectContent>
                  {subjectOptions.map((s) => (
                    <GlassSelectItem key={s} value={s}>
                      {s}
                    </GlassSelectItem>
                  ))}
                </GlassSelectContent>
              </GlassSelect>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Date
              </label>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start bg-[#D6CBB6] border border-[#8B5E3C]/40 text-[#3B2A1A]"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>

                <PopoverContent
                  className="bg-[#d8cbb3] border border-[#8B5E3C]/40 rounded-2xl shadow-xl text-[#3B2A1A]"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => {
                      setDate(d);
                      if (d) setCalendarOpen(false);
                    }}
                    weekStartsOn={1}
                    className="bg-[#D6CBB6] text-[#3B2A1A]"
                    classNames={calendarClassNames}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {classValue && (
            <div className="space-y-3">
              <div className="text-[#6B5A4A] text-sm">Students in {classValue}</div>
              <AttendanceCreateTable
                rows={rows}
                onStatusChange={(studentId, status) =>
                  setStatusById((prev) => ({ ...prev, [studentId]: status }))
                }
              />
            </div>
          )}

          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setClassValue("");
                setSubjectValue("");
                setDate(undefined);
                setStatusById({});
              }}
              className="bg-[#D6CBB6] border border-[#8B5E3C]/40 text-[#3B2A1A] hover:bg-[#CBB89D]"
            >
              Cancel
            </Button>

            <Button
              type="button"
              disabled={!canGenerate}
              onClick={() => console.log("generate", { classValue, subjectValue, date, rows })}
              className="bg-white/25 border border-white/35 text-[#3B240F] hover:bg-white/35 rounded-xl px-6"
            >
              Generate Attendance List
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
