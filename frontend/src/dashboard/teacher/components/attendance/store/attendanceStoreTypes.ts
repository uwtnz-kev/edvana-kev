// Shares internal store constants and small utility helpers.
export const STORAGE_KEY = "teacher.attendance.v2";

export function nowISO() {
  return new Date().toISOString();
}

export function makeAttendanceId(date: string, subjectName: string, studentId: string) {
  return `${date}:${subjectName}:${studentId}`;
}
