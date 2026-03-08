// Provides route and subject-resolution helpers for attendance editing.
import { seedSubjects2 } from "@/dashboard/teacher/components/assignments";

type AttendanceEditState = {
  restoreSubjectId?: string;
};

// Falls back to matching the subject name when route state does not provide context.
export function resolveRestoreSubjectId(state: unknown, subjectName: string) {
  if (state && typeof state === "object") {
    const candidate = state as AttendanceEditState;
    if (typeof candidate.restoreSubjectId === "string") return candidate.restoreSubjectId;
  }
  const matched = seedSubjects2.find((subject) => subject.name === subjectName);
  return matched?.id ?? null;
}
