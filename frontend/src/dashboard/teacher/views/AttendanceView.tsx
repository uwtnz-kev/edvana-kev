// src/dashboard/teacher/views/AttendanceView.tsx
import React, { useEffect, useMemo, useState } from "react";

import {
  AttendanceHeader,
  AttendanceFiltersBar,
  AttendanceStatsCards,
  AttendanceTable,
  AttendanceMarkModal,
  type AttendanceFilters,
  type AttendanceRecord,
  listAttendanceByDate,
  applyAttendanceFilters,
  computeAttendanceStats,
  upsertAttendance,
} from "@/dashboard/teacher/components/attendance";

import { useStudents, type Student } from "@/dashboard/teacher/components/students";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function studentName(s: Student) {
  const first = (s as any).firstName ?? "";
  const last = (s as any).lastName ?? "";
  const full = `${first} ${last}`.trim();
  return full || (s as any).name || "Unknown";
}

function studentClass(s: Student) {
  return (
    (s as any).className ||
    (s as any).class ||
    (s as any).classNameLabel ||
    (s as any).gradeLabel ||
    "Unknown"
  );
}

function subjectForClass(className: string) {
  const map: Record<string, string> = {
    S1A: "Mathematics",
    S1B: "English",
    S2A: "Biology",
    S2B: "Chemistry",
    S3A: "Mathematics",
  };
  return map[className] ?? "Mathematics";
}

export default function AttendanceView() {
  const { students } = useStudents();

  const [filters, setFilters] = useState<AttendanceFilters>({
    query: "",
    classValue: "all",
    subjectValue: "all",
    statusValue: "all",
    date: todayISO(),
  });

  const [rows, setRows] = useState<AttendanceRecord[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<AttendanceRecord | null>(null);

  const classOptions = useMemo(() => {
    const set = new Set<string>();
    students.forEach((s) => set.add(studentClass(s)));
    return ["all", ...Array.from(set).sort()];
  }, [students]);

  const subjectOptions = useMemo(() => {
    return ["all", "Mathematics", "English", "Biology", "Chemistry"];
  }, []);

  const buildRoster = () => {
    const saved = listAttendanceByDate(filters.date);
    const byStudentId = new Map(saved.map((r) => [r.studentId, r] as const));

    const roster: AttendanceRecord[] = students.map((s) => {
      const id = (s as any).id as string;
      const existing = byStudentId.get(id);
      if (existing) return existing;

      const cls = studentClass(s);

      return {
        id: `${filters.date}:${id}`,
        date: filters.date,
        studentId: id,
        studentName: studentName(s),
        className: cls,
        subjectName: subjectForClass(cls),
        status: "Present",
      };
    });

    setRows(roster);
  };

  useEffect(() => {
    buildRoster();
  }, [filters.date, students]);

  const filtered = useMemo(() => applyAttendanceFilters(rows, filters), [rows, filters]);
  const stats = useMemo(() => computeAttendanceStats(filtered), [filtered]);
    const refresh = () => {
    const saved = listAttendanceByDate(filters.date);
    const byStudentId = new Map(saved.map((r) => [r.studentId, r] as const));
    setRows((prev) => prev.map((r) => byStudentId.get(r.studentId) ?? r));
  };

  const onSave = (next: { status: any; note?: string }) => {
    if (!selected) return;

    upsertAttendance(
      {
        date: selected.date,
        studentId: selected.studentId,
        status: next.status,
        note: next.note,
      },
      "teacher",
      {
        studentName: selected.studentName,
        className: selected.className,
        subjectName: selected.subjectName,
      }
    );

    refresh();
    setOpen(false);
  };  

  return (
    <div className="px-4 sm:px-6 md:px-8 py-6">
      <div className="space-y-6">
        <AttendanceHeader onExport={() => console.log("export")} onMark={() => console.log("mark")} />

        <AttendanceStatsCards stats={stats} />

        <AttendanceFiltersBar
        value={filters}
        onChange={setFilters}
        classOptions={classOptions}
        subjectOptions={subjectOptions}
      />

      <AttendanceTable rows={filtered} />

      <AttendanceMarkModal
        open={open}
        onOpenChange={setOpen}
        row={selected}
        onSave={onSave}
      />
      </div>
    </div>
  );
}