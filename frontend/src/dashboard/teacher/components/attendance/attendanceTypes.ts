// src/dashboard/teacher/components/attendance/attendanceTypes.ts
export type AttendanceStatus = "present" | "absent" | "late";

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

export type AttendanceSessionSummary = {
  id: string;
  title: string;
  date: string;
  className: string;
  subjectName: string;
  totalStudents: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
};

export type AttendanceFilters = {
  query: string;
  classValue: string; // "all" or class name
  subjectValue: string; // "all" or subject name
  date: string; // YYYY-MM-DD
};

export type AttendanceStats = {
  total: number;
  present: number;
  absent: number;
  late: number;
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
