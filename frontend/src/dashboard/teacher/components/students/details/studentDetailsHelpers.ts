// Provides formatting and badge helpers for the student details modal.
import type { TeacherStudentDetails } from "./TeacherStudentDetailsModal";

export function getStudentStatusClass(status: TeacherStudentDetails["status"]) {
  const statusClassMap: Record<TeacherStudentDetails["status"], string> = {
    Active: "bg-[#D1FAE5] text-[#047857] border border-[#A7F3D0]",
    Inactive: "bg-yellow-500/20 text-yellow-700 border-yellow-500/30",
    Transferred: "bg-blue-500/20 text-blue-700 border-blue-500/30",
    Suspended: "bg-red-500/20 text-red-700 border-red-500/30",
    Graduated: "bg-purple-500/20 text-purple-700 border-purple-500/30",
  };
  return statusClassMap[status];
}

export function formatStudentDetailsDate(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function formatStudentDetailsPercent(value: number | null | undefined) {
  if (value == null || Number.isNaN(value)) return "Not available";
  return `${Math.max(0, Math.min(100, Math.round(value)))}%`;
}

export function formatStudentDetailsGrade(value: number | null | undefined) {
  if (value == null || Number.isNaN(value)) return "Not available";
  return `${Math.round(value)}%`;
}
