// src/dashboard/teacher/components/attendance/attendanceStore.ts
import type {
  AttendanceBulkMarkPayload,
  AttendanceFilters,
  AttendanceMarkPayload,
  AttendanceRecord,
  AttendanceStats,
  AttendanceStatus,
} from "./attendanceTypes";

const STORAGE_KEY = "teacher.attendance.v1";

function readAll(): AttendanceRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as AttendanceRecord[]) : [];
  } catch {
    return [];
  }
}

function writeAll(rows: AttendanceRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
}

function nowISO() {
  return new Date().toISOString();
}

function makeId(date: string, studentId: string) {
  return `${date}:${studentId}`;
}

export function listAttendanceByDate(date: string) {
  return readAll().filter((r) => r.date === date);
}

export function upsertAttendance(
  payload: AttendanceMarkPayload,
  markedBy = "teacher",
  meta?: { studentName: string; className: string; subjectName: string }
) {
  const rows = readAll();
  const id = makeId(payload.date, payload.studentId);
  const idx = rows.findIndex((r) => r.id === id);
  const prev = idx >= 0 ? rows[idx] : undefined;

  const next: AttendanceRecord = {
    id,
    date: payload.date,
    studentId: payload.studentId,
    studentName: prev?.studentName ?? meta?.studentName ?? "Unknown",
    className: prev?.className ?? meta?.className ?? "Unknown",
    subjectName: prev?.subjectName ?? meta?.subjectName ?? "Mathematics",
    status: payload.status,
    note: payload.note?.trim() || undefined,
    markedBy,
    markedAt: nowISO(),
  };

  if (idx >= 0) rows[idx] = next;
  else rows.push(next);

  writeAll(rows);
  return next;
}

export function bulkMarkAttendance(
  payload: AttendanceBulkMarkPayload,
  markedBy = "teacher",
  meta?: Record<string, { studentName: string; className: string; subjectName: string }>
) {
  const rows = readAll();
  const byId = new Map(rows.map((r) => [r.id, r] as const));

  for (const studentId of payload.studentIds) {
    const id = makeId(payload.date, studentId);
    const prev = byId.get(id);
    const m = meta?.[studentId];

    const next: AttendanceRecord = {
      id,
      date: payload.date,
      studentId,
      studentName: prev?.studentName ?? m?.studentName ?? "Unknown",
      className: prev?.className ?? m?.className ?? "Unknown",
      subjectName: prev?.subjectName ?? m?.subjectName ?? "Mathematics",
      status: payload.status,
      note: payload.note?.trim() || undefined,
      markedBy,
      markedAt: nowISO(),
    };

    byId.set(id, next);
  }

  const nextRows = Array.from(byId.values());
  writeAll(nextRows);
  return nextRows.filter((r) => r.date === payload.date);
}

export function computeAttendanceStats(rows: AttendanceRecord[]): AttendanceStats {
  let present = 0;
  let absent = 0;
  let late = 0;
  let excused = 0;

  for (const r of rows) {
    if (r.status === "Present") present += 1;
    else if (r.status === "Absent") absent += 1;
    else if (r.status === "Late") late += 1;
    else excused += 1;
  }

  return { total: rows.length, present, absent, late, excused };
}

export function applyAttendanceFilters(rows: AttendanceRecord[], f: AttendanceFilters) {
  const q = f.query.trim().toLowerCase();

  return rows.filter((r) => {
    const hit =
      !q ||
      r.studentName.toLowerCase().includes(q) ||
      r.className.toLowerCase().includes(q) ||
      r.subjectName.toLowerCase().includes(q);

    const cls = f.classValue === "all" || r.className === f.classValue;
    const subj = f.subjectValue === "all" || r.subjectName === f.subjectValue;
    const st = f.statusValue === "all" || r.status === (f.statusValue as AttendanceStatus);

    return hit && cls && subj && st;
  });
}

export function clearAttendanceNote(id: string) {
  const rows = readAll();
  const idx = rows.findIndex((r) => r.id === id);
  if (idx < 0) return null;

  rows[idx] = { ...rows[idx], note: undefined, markedAt: nowISO() };
  writeAll(rows);
  return rows[idx];
}

export function removeAttendanceRecord(id: string) {
  const rows = readAll();
  const next = rows.filter((r) => r.id !== id);
  if (next.length === rows.length) return false;

  writeAll(next);
  return true;
}