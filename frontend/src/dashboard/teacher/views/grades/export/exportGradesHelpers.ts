// Helpers and local types for the export grades workspace.
export type ExportGradeList = { id: string; title: string };

export const seedExportGradeLists: ExportGradeList[] = [
  { id: "list-1", title: "Term 1 Grades" },
  { id: "list-2", title: "Midterm Grades" },
];

export function buildNewGradeList(title: string): ExportGradeList {
  return { id: `list-${Date.now()}`, title };
}
