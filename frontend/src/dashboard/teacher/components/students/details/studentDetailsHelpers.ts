// Provides formatting and badge helpers for the student details modal.
import type { TeacherStudentDetails } from "./TeacherStudentDetailsModal";

const studentBadgeBaseClass = "rounded-full px-3 py-1 text-xs font-medium border backdrop-blur-sm";

export function getStudentStatusClass(status: TeacherStudentDetails["status"]) {
  const statusClassMap: Record<TeacherStudentDetails["status"], string> = {
    Active: `${studentBadgeBaseClass} bg-emerald-500/10 text-emerald-300 border-emerald-500/20`,
    Inactive: `${studentBadgeBaseClass} bg-yellow-500/10 text-yellow-300 border-yellow-500/20`,
    Transferred: `${studentBadgeBaseClass} bg-sky-500/10 text-sky-300 border-sky-500/20`,
    Suspended: `${studentBadgeBaseClass} bg-rose-500/10 text-rose-300 border-rose-500/20`,
    Graduated: `${studentBadgeBaseClass} bg-violet-500/10 text-violet-300 border-violet-500/20`,
  };
  return statusClassMap[status];
}

export function getStudentClassBadgeClass(className: string) {
  const upper = className.trim().toUpperCase();
  if (upper.startsWith("S1")) return `${studentBadgeBaseClass} bg-cyan-500/10 text-cyan-300 border-cyan-500/20`;
  if (upper.startsWith("S2")) return `${studentBadgeBaseClass} bg-blue-500/10 text-blue-300 border-blue-500/20`;
  if (upper.startsWith("S3")) return `${studentBadgeBaseClass} bg-violet-500/10 text-violet-300 border-violet-500/20`;
  return `${studentBadgeBaseClass} bg-white/10 text-white/80 border-white/10`;
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
