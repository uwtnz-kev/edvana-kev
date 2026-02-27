// src/dashboard/teacher/components/attendance/attendanceTypes.ts
export type AttendanceStatus = "Present" | "Absent" | "Late" | "Excused";

export type AttendanceRecord = {
  id: string; // date:studentId
  date: string; // YYYY-MM-DD
  studentId: string;
  studentName: string;
  className: string;

  subjectName: string;

  status: AttendanceStatus;

  note?: string;
  markedBy?: string;
  markedAt?: string; // ISO
};

export type AttendanceFilters = {
  query: string;
  classValue: string; // "all" or class name
  subjectValue: string; // "all" or subject name
  statusValue: "all" | AttendanceStatus;
  date: string; // YYYY-MM-DD
};

export type AttendanceStats = {
  total: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
};

export type AttendanceMarkPayload = {
  date: string;
  studentId: string;
  status: AttendanceStatus;
  note?: string;
};

export type AttendanceBulkMarkPayload = {
  date: string;
  studentIds: string[];
  status: AttendanceStatus;
  note?: string;
};