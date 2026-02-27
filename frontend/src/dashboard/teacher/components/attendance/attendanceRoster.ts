import type { AttendanceRecord } from "./attendanceTypes";

type StudentLike = {
  id: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  className?: string;
  class?: string;
};

function fullName(s: StudentLike) {
  if (s.name) return s.name;
  return `${s.firstName ?? ""} ${s.lastName ?? ""}`.trim() || "Unknown";
}

function classLabel(s: StudentLike) {
  return s.className ?? s.class ?? "Unknown";
}

export function buildAttendanceRoster(date: string, students: StudentLike[], saved: AttendanceRecord[]) {
  const byId = new Map(saved.map(r => [r.studentId, r] as const));

  return students.map(s => {
    const prev = byId.get(s.id);
    if (prev) return prev;

    return {
      id: `${date}:${s.id}`,
      date,
      studentId: s.id,
      studentName: fullName(s),
      className: classLabel(s),
      status: "Present",
      note: undefined,
      markedBy: undefined,
      markedAt: undefined,
    } satisfies AttendanceRecord;
  });
}