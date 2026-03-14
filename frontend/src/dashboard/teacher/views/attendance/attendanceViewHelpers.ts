// Provides roster, session, date, and filtering helpers for the attendance workspace.
import type { AttendanceFilters, AttendanceRecord, AttendanceSessionSummary } from "@/dashboard/teacher/components/attendance";
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
    return (!selectedDate || rowDay === selectedDate) && (!query || row.studentName.toLowerCase().includes(query) || row.className.toLowerCase().includes(query));
  });
}

export function buildAttendanceSessionId(date: string, subjectName: string, className: string) {
  return encodeURIComponent(`${date}|${subjectName}|${className}`);
}

export function parseAttendanceSessionId(sessionId: string) {
  const decoded = decodeURIComponent(sessionId);
  const [date = "", subjectName = "", className = ""] = decoded.split("|");
  if (!date || !subjectName || !className) return null;
  return { date, subjectName, className };
}

export function summarizeAttendanceSessions(rows: AttendanceRecord[], filters: AttendanceFilters, selectedSubjectName: string | null, selectedDate: string | null) {
  const grouped = new Map<string, AttendanceSessionSummary>();
  for (const row of rows) {
    if (selectedSubjectName && row.subjectName !== selectedSubjectName) continue;
    if (selectedDate && dayKey(row.date) !== selectedDate) continue;
    if (filters.classValue !== "all" && row.className !== filters.classValue) continue;

    const id = buildAttendanceSessionId(row.date, row.subjectName, row.className);
    const existing = grouped.get(id);
    if (existing) {
      existing.totalStudents += 1;
      if (row.status === "present") existing.presentCount += 1;
      if (row.status === "absent") existing.absentCount += 1;
      if (row.status === "late") existing.lateCount += 1;
      continue;
    }

    grouped.set(id, {
      id,
      title: `${row.className} Attendance List`,
      date: row.date,
      className: row.className,
      subjectName: row.subjectName,
      totalStudents: 1,
      presentCount: row.status === "present" ? 1 : 0,
      absentCount: row.status === "absent" ? 1 : 0,
      lateCount: row.status === "late" ? 1 : 0,
    });
  }

  const query = filters.query.trim().toLowerCase();

  return [...grouped.values()]
    .filter((session) => {
      const queryMatch = !query || `${session.title} ${session.className} ${session.subjectName}`.toLowerCase().includes(query);
      return queryMatch;
    })
    .sort((first, second) => {
      const byDate = second.date.localeCompare(first.date);
      return byDate !== 0 ? byDate : first.className.localeCompare(second.className);
    });
}

export function listSessionRows(rows: AttendanceRecord[], sessionId: string) {
  const parsed = parseAttendanceSessionId(sessionId);
  if (!parsed) return [];
  return rows
    .filter((row) => row.date === parsed.date && row.subjectName === parsed.subjectName && row.className === parsed.className)
    .sort((first, second) => first.studentName.localeCompare(second.studentName));
}
