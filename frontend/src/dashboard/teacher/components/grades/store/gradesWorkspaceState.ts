// Persists and derives the teacher grades workspace state.
import type { TeacherGradeRow, TeacherGradeSelectionType, TeacherGradesWorkspace } from "../gradesTypes";
import { buildDefaultWorkspace, defaultGradesFilters } from "./gradesSeedData";

const WORKSPACE_STORAGE_KEY = "teacher.grades.workspace.v1";

export { defaultGradesFilters };

export function loadGradesWorkspace(): TeacherGradesWorkspace {
  if (typeof window === "undefined") return buildDefaultWorkspace();
  const raw = localStorage.getItem(WORKSPACE_STORAGE_KEY);
  if (!raw) return buildDefaultWorkspace();
  try {
    const parsed = JSON.parse(raw) as Partial<TeacherGradesWorkspace>;
    const selectedGradeType = parsed.selectedGradeType === "quiz" || parsed.selectedGradeType === "assignment" || parsed.selectedGradeType === "exam" ? parsed.selectedGradeType : null;
    return { selectedSubjectId: parsed.selectedSubjectId ?? null, selectedGradeType, filters: { ...defaultGradesFilters, ...(parsed.filters ?? {}) } };
  } catch {
    return buildDefaultWorkspace();
  }
}

export function saveGradesWorkspace(workspace: TeacherGradesWorkspace) {
  if (typeof window === "undefined") return;
  localStorage.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify(workspace));
}

export function resetGradesWorkspace() { saveGradesWorkspace(buildDefaultWorkspace()); }
export function resetGradesFlow() { saveGradesWorkspace(buildDefaultWorkspace()); }

export function setSelectedGradeType(selectedGradeType: TeacherGradeSelectionType | null) {
  const workspace = loadGradesWorkspace();
  saveGradesWorkspace({ ...workspace, selectedGradeType, filters: { ...workspace.filters, assessmentType: selectedGradeType ?? "all", assessmentItemId: "all" } });
}

export function getScopedRows(rows: TeacherGradeRow[], workspace: TeacherGradesWorkspace = loadGradesWorkspace()) {
  if (!workspace.selectedGradeType) return [];
  const query = workspace.filters.search.trim().toLowerCase();
  return rows.filter((row) => row.assessmentType === workspace.selectedGradeType && (!workspace.selectedSubjectId || row.subjectId === workspace.selectedSubjectId) && (workspace.filters.classValue === "all" || row.classLabel === workspace.filters.classValue) && (workspace.filters.assessmentItemId === "all" || row.gradeItemId === workspace.filters.assessmentItemId) && (!query || `${row.studentName} ${row.assessmentTitle}`.toLowerCase().includes(query)));
}
