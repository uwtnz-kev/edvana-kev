// Implements attendance create, update, delete, and bulk-mark operations.
import type { AttendanceBulkMarkPayload, AttendanceMarkPayload, AttendanceRecord, AttendanceStatus } from "../attendanceTypes";
import { loadAttendance, saveAttendance } from "./attendancePersistence";
import { getAttendanceById } from "./attendanceSelectors";
import { makeAttendanceId, nowISO } from "./attendanceStoreTypes";

export function updateAttendance(id: string, patch: Partial<AttendanceRecord>): AttendanceRecord | null {
  const rows = loadAttendance();
  const index = rows.findIndex((row) => row.id === id);
  if (index < 0) return null;
  const next = { ...rows[index], ...patch, id, markedAt: nowISO() };
  rows[index] = next;
  saveAttendance(rows);
  return next;
}

export function createAttendance(input: Omit<AttendanceRecord, "id" | "markedAt"> & { id?: string }): AttendanceRecord {
  const rows = loadAttendance();
  const id = input.id ?? makeAttendanceId(input.date, input.subjectName, input.studentId);
  const record: AttendanceRecord = { ...input, id, markedAt: nowISO() };
  if (rows.some((row) => row.id === id)) return updateAttendance(id, record) ?? record;
  rows.push(record);
  saveAttendance(rows);
  return record;
}

export function updateAttendanceStatus(id: string, status: AttendanceStatus) {
  const rows = loadAttendance();
  const index = rows.findIndex((row) => row.id === id);
  if (index < 0) return;
  rows[index] = { ...rows[index], status, markedAt: nowISO() };
  saveAttendance(rows);
}

export function deleteAttendance(id: string) {
  const rows = loadAttendance();
  const next = rows.filter((row) => row.id !== id);
  if (next.length === rows.length) return false;
  saveAttendance(next);
  return true;
}

export function upsertAttendance(payload: AttendanceMarkPayload & { subjectName?: string }, markedBy = "teacher", meta?: { className: string; studentName: string; subjectName: string }) {
  const subjectName = payload.subjectName ?? meta?.subjectName ?? "Mathematics";
  const id = makeAttendanceId(payload.date, subjectName, payload.studentId);
  const existing = getAttendanceById(id);
  if (!existing) return createAttendance({ id, date: payload.date, studentId: payload.studentId, studentName: meta?.studentName ?? "Unknown", className: meta?.className ?? "Unknown", subjectName, status: payload.status, note: payload.note?.trim() || undefined, markedBy });
  return updateAttendance(id, { status: payload.status, note: payload.note?.trim() || undefined, markedBy });
}

export function bulkMarkAttendance(payload: AttendanceBulkMarkPayload & { subjectName?: string }, markedBy = "teacher", meta?: Record<string, { className: string; studentName: string; subjectName: string }>) {
  const touched: AttendanceRecord[] = [];
  for (const studentId of payload.studentIds) {
    const details = meta?.[studentId];
    const saved = upsertAttendance({ date: payload.date, studentId, status: payload.status, note: payload.note, subjectName: payload.subjectName ?? details?.subjectName }, markedBy, details);
    if (saved) touched.push(saved);
  }
  return touched;
}
