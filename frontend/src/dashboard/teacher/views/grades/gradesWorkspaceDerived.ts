// Calculates derived workspace data used by the grades page without owning UI state.
import { getItemSubmissions, type TeacherPublishedItem } from "@/dashboard/teacher/components/grades";

export function buildClassOptions(items: TeacherPublishedItem[], subjectClasses: string[]) {
  const values = Array.from(new Set([...items.map((item) => item.className), ...subjectClasses]));
  return [{ value: "all", label: "All classes" }, ...values.map((value) => ({ value, label: value }))];
}

// Builds the grades summary cards from the currently filtered published items.
export function buildWorkspaceStats(items: TeacherPublishedItem[]) {
  const submissions = items.flatMap((item) => getItemSubmissions(item.id, "all", "", "all"));
  const gradedRows = submissions.filter((row) => typeof row.score === "number");
  const average = gradedRows.length
    ? gradedRows.reduce((sum, row) => sum + (((row.score ?? 0) / row.maxScore) * 100), 0) / gradedRows.length
    : 0;
  return { total: submissions.length, graded: gradedRows.length, missing: submissions.length - gradedRows.length, average };
}
