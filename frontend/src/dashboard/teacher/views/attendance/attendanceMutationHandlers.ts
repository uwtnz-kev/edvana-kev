// Provides attendance mutation helpers used by the workspace state hook.
import {
  createAttendance,
  deleteAttendance,
  updateAttendanceStatus,
  type AttendanceRecord,
} from "@/dashboard/teacher/components/attendance";

export function saveAttendanceStatus(rows: AttendanceRecord[], rosterRows: AttendanceRecord[], id: string, status: AttendanceRecord["status"]) {
  const inStore = rows.some((row) => row.id === id);
  const rowForCreate = rosterRows.find((row) => row.id === id);
  if (inStore) {
    updateAttendanceStatus(id, status);
    return true;
  }
  if (!rowForCreate) return false;
  createAttendance({ date: rowForCreate.date, studentId: rowForCreate.studentId, studentName: rowForCreate.studentName, className: rowForCreate.className, subjectName: rowForCreate.subjectName, status, markedBy: "teacher" });
  return true;
}

export function removeAttendanceRecord(id: string | null) {
  if (!id) return false;
  return deleteAttendance(id);
}
