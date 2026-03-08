// Handles attendance storage reads, writes, and payload sanitization.
import type { AttendanceRecord } from "../attendanceTypes";
import { attendanceSeedData } from "./attendanceSeedData";
import { STORAGE_KEY } from "./attendanceStoreTypes";

function sanitizeRows(value: unknown): AttendanceRecord[] {
  return Array.isArray(value) ? (value as AttendanceRecord[]) : [];
}

export function loadAttendance(): AttendanceRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return attendanceSeedData;
    return sanitizeRows(JSON.parse(raw));
  } catch {
    return attendanceSeedData;
  }
}

export function saveAttendance(rows: AttendanceRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
}
