// Provides roster, date, and filtering helpers for the attendance workspace.
import type { AttendanceFilters, AttendanceRecord } from "@/dashboard/teacher/components/attendance";
import type { Student } from "@/dashboard/teacher/components/students";

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function dayKey(value?: string | null) {
  if (!value) return "";
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? "" : parsed.toISOString().slice(0, 10);
}

function studentName(student: Student) {
  const first = (student as { firstName?: string }).firstName ?? "";
  const last = (student as { lastName?: string }).lastName ?? "";
  const full = `${first} ${last}`.trim();
  return full || (student as { name?: string }).name || "Unknown";
}

function studentClass(student: Student) {
  const s = student as { className?: string; class?: string; classNameLabel?: string; gradeLabel?: string };
  return s.className || s.class || s.classNameLabel || s.gradeLabel || "Unknown";
}

function subjectForClass(className: string) {
  return ({ S1A: "Mathematics", S1B: "English", S2A: "Biology", S2B: "Chemistry", S3A: "Mathematics", S3B: "Physics" } as Record<string, string>)[className] ?? "Mathematics";
}

export function mergeRosterWithSaved(students: Student[], subjectName: string, date: string, savedRows: AttendanceRecord[]) {
  const byStudent = new Map(savedRows.map((row) => [row.studentId, row] as const));
  return students.filter((student) => subjectForClass(studentClass(student)) === subjectName).map((student) => {
    const studentId = String((student as { id?: string | number }).id ?? "");
    return byStudent.get(studentId) ?? { id: `${date}:${subjectName}:${studentId}`, date, studentId, studentName: studentName(student), className: studentClass(student), subjectName, status: "present" as const };
  });
}

export function filterAttendanceRows(rows: AttendanceRecord[], filters: AttendanceFilters, selectedDate: string | null) {
  const query = filters.query.trim().toLowerCase();
  return rows.filter((row) => {
    const dynamicRow = row as AttendanceRecord & { createdAt?: string; sessionDate?: string };
    const rowDay = dayKey(dynamicRow.date) || dayKey(dynamicRow.sessionDate) || dayKey(dynamicRow.markedAt) || dayKey(dynamicRow.createdAt);
    return (!selectedDate || rowDay === selectedDate) && (!query || row.studentName.toLowerCase().includes(query) || row.className.toLowerCase().includes(query)) && (filters.statusValue === "all" || row.status === filters.statusValue);
  });
}
