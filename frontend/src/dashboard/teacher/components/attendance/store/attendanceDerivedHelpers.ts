// Holds derived attendance calculations such as stats and filter application.
import type { AttendanceFilters, AttendanceRecord, AttendanceStats, AttendanceStatus } from "../attendanceTypes";

export function computeAttendanceStats(rows: AttendanceRecord[]): AttendanceStats {
  let present = 0;
  let absent = 0;
  for (const row of rows) {
    if (row.status === "present") present += 1;
    else if (row.status === "absent") absent += 1;
  }
  return { total: rows.length, present, absent };
}

// Applies workspace filters across the searchable attendance fields.
export function applyAttendanceFilters(rows: AttendanceRecord[], filters: AttendanceFilters) {
  const query = filters.query.trim().toLowerCase();
  return rows.filter((row) => {
    const queryMatch = !query || row.studentName.toLowerCase().includes(query) || row.className.toLowerCase().includes(query) || row.subjectName.toLowerCase().includes(query);
    const classMatch = filters.classValue === "all" || row.className === filters.classValue;
    const subjectMatch = filters.subjectValue === "all" || row.subjectName === filters.subjectValue;
    const statusMatch = filters.statusValue === "all" || row.status === (filters.statusValue as AttendanceStatus);
    return queryMatch && classMatch && subjectMatch && statusMatch;
  });
}
