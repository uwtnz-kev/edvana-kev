// Provides route parsing and student mapping helpers for attendance creation.
import type { Student } from "@/dashboard/teacher/components/students";

export type Status = "Present" | "Absent" | "Late";

export type AttendanceCreateState = {
  subjectId: string;
  subjectName: string;
};

export const idOf = (student: Student) =>
  String((student as { id?: string | number; studentId?: string }).id ?? (student as { studentId?: string }).studentId ?? "").trim();

export function nameOf(student: Student) {
  const candidate = student as { firstName?: string; lastName?: string; name?: string };
  return `${candidate.firstName ?? ""} ${candidate.lastName ?? ""}`.trim() || candidate.name || "Unknown";
}

export const classOf = (student: Student) =>
  String((student as { class?: string; className?: string; classNameLabel?: string }).class ??
    (student as { className?: string }).className ??
    (student as { classNameLabel?: string }).classNameLabel ??
    "").trim();

// Ensures route state contains the required subject context.
export function getCreateState(state: unknown): AttendanceCreateState | null {
  if (!state || typeof state !== "object") return null;
  const candidate = state as Partial<AttendanceCreateState>;
  if (typeof candidate.subjectId !== "string" || typeof candidate.subjectName !== "string") return null;
  return { subjectId: candidate.subjectId, subjectName: candidate.subjectName };
}
