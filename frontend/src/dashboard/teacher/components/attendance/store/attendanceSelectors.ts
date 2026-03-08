// Provides read helpers for attendance records and scoped queries.
import type { AttendanceRecord } from "../attendanceTypes";
import { loadAttendance } from "./attendancePersistence";

export function listAttendanceByDate(date: string) {
  return loadAttendance().filter((row) => row.date === date);
}

export function listAttendanceByDateAndSubject(date: string, subjectName: string) {
  return loadAttendance().filter((row) => row.date === date && row.subjectName === subjectName);
}

export function getAttendanceById(id: string): AttendanceRecord | null {
  return loadAttendance().find((row) => row.id === id) ?? null;
}
