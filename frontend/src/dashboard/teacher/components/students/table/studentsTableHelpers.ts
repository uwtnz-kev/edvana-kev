// Provides display helpers for student rows and status badges.
import type { Student } from "../types";

export function getStudentStatusClass(status: Student["status"]) {
  const statusClassMap: Record<Student["status"], string> = {
    Active: "bg-green-500/20 text-green-700 border-green-500/30",
    Inactive: "bg-yellow-500/20 text-yellow-700 border-yellow-500/30",
    Transferred: "bg-blue-500/20 text-blue-700 border-blue-500/30",
    Suspended: "bg-red-500/20 text-red-700 border-red-500/30",
    Graduated: "bg-purple-500/20 text-purple-700 border-purple-500/30",
  };
  return statusClassMap[status];
}

export function formatStudentDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
